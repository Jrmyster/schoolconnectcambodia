import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { conversations, messages } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

const GENERAL_SYSTEM_PROMPT = `You are an AI tutor called "Sala AI" for Chouy Sala (ជួយសាលា / Help School), a platform connecting rural Cambodian high schools with donors and NGOs. You help Cambodian students with study questions, scholarships, university applications, and educational guidance. Always be encouraging, clear, and culturally aware. You may respond in either English or Khmer based on what the student uses.`;

const REVIEWER_SYSTEM_PROMPT = `You are an expert university application letter reviewer called "Sala AI" for Chouy Sala (ជួយសាលា / Help School). You are currently in REVIEWER MODE — a professional, focused review session for university application letters.

When a student shares their letter, review it using this professional checklist:

1. OPENING — Does it clearly state which programme they're applying for? Is the opening engaging?
2. PASSION & MOTIVATION — Do they explain why they are genuinely passionate about this field?
3. ACHIEVEMENTS & EVIDENCE — Do they use specific examples and real numbers? (Avoid vague claims like "I am hardworking".)
4. SCHOOL/COMMUNITY CONTEXT — Do they acknowledge their background — rural Cambodia, resource challenges, community support?
5. CHOUY SALA REFERENCE — If they used Chouy Sala or similar platforms, did they mention it as a resource that helped them?
6. CONCLUSION — Does it end with a forward-looking statement and thank the committee?
7. LANGUAGE & TONE — Is the letter professional, free of errors, and appropriately formal?
8. LENGTH — Is it concise (ideally 300–500 words)?

For each point, provide:
- ✅ What they did well
- ⚠️ What needs improvement (with a specific suggestion)

End your review with an OVERALL SCORE out of 10 and ONE top priority action the student should take before submitting.

Always be encouraging, specific, and honest. This is their future — treat it with care. Respond in the same language (English or Khmer) that the student uses in their letter.`;

router.post("/openai/conversations", async (req, res) => {
  const body = req.body as Record<string, unknown>;
  if (typeof body?.title !== "string" || !body.title.trim()) {
    res.status(400).json({ error: "title is required" });
    return;
  }
  const [conv] = await db
    .insert(conversations)
    .values({ title: body.title.trim() })
    .returning();
  res.status(201).json(conv);
});

router.get("/openai/conversations/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid conversation id" });
    return;
  }
  const [conv] = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, id))
    .orderBy(messages.createdAt);
  res.json({ ...conv, messages: msgs });
});

router.delete("/openai/conversations/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid conversation id" });
    return;
  }
  const deleted = await db
    .delete(conversations)
    .where(eq(conversations.id, id))
    .returning();
  if (!deleted.length) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  res.status(204).end();
});

router.post("/openai/conversations/:id/messages", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid conversation id" });
    return;
  }
  const body = req.body as Record<string, unknown>;
  if (typeof body?.content !== "string" || !body.content.trim()) {
    res.status(400).json({ error: "content is required" });
    return;
  }

  const reviewerMode = body.reviewerMode === true;
  const userContent = body.content.trim();

  const [conv] = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  const existingMessages = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, id))
    .orderBy(messages.createdAt);

  await db.insert(messages).values({
    conversationId: id,
    role: "user",
    content: userContent,
  });

  const systemPrompt = reviewerMode ? REVIEWER_SYSTEM_PROMPT : GENERAL_SYSTEM_PROMPT;

  const chatMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: systemPrompt },
    ...existingMessages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: userContent },
  ];

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 8192,
      messages: chatMessages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    await db.insert(messages).values({
      conversationId: id,
      role: "assistant",
      content: fullResponse,
    });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  } catch (err) {
    console.error("OpenAI stream error:", err);
    res.write(`data: ${JSON.stringify({ error: "AI service unavailable" })}\n\n`);
  }

  res.end();
});

export default router;

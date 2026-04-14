import { Router } from "express";
import { db } from "@workspace/db";
import { storiesTable, conversations } from "@workspace/db/schema";
import { count, gte, eq } from "drizzle-orm";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

function weekAgo(): Date {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d;
}

router.get("/admin/weekly-metrics", async (_req, res) => {
  try {
    const since = weekAgo();

    const [
      [pendingStoriesRow],
      [newStoriesRow],
      [aiSessionsRow],
    ] = await Promise.all([
      db.select({ c: count() }).from(storiesTable).where(eq(storiesTable.status, "pending")),
      db.select({ c: count() }).from(storiesTable).where(gte(storiesTable.createdAt, since)),
      db.select({ c: count() }).from(conversations).where(gte(conversations.createdAt, since)),
    ]);

    res.json({
      pendingStories:       pendingStoriesRow?.c ?? 0,
      newStoriesThisWeek:   newStoriesRow?.c    ?? 0,
      aiChatSessionsThisWeek: aiSessionsRow?.c  ?? 0,
      weekStart: since.toISOString(),
    });
  } catch (err) {
    console.error("weekly-metrics error:", err);
    res.status(500).json({ error: "Failed to load metrics" });
  }
});

router.post("/admin/weekly-summary", async (req, res) => {
  const { metrics } = req.body as {
    metrics: {
      pendingStories: number;
      newStoriesThisWeek: number;
      aiChatSessionsThisWeek: number;
    };
  };

  if (!metrics) {
    res.status(400).json({ error: "metrics required" });
    return;
  }

  const systemPrompt = `You are the School Connect Cambodia platform assistant helping the admin with their weekly review. 
Respond in clear, warm, professional English. Be concise (max 200 words). 
Format the response with these sections:
📊 **This Week at a Glance**
🔔 **Action Items** (bulleted — things needing immediate attention)
💡 **Insight** (one short observation or encouragement)
Keep a supportive, mission-driven tone focused on helping Cambodian students.`;

  const userMsg = `It's Sunday evening — time for the weekly School Connect Cambodia check-in.

Here are this week's platform metrics:
- Pending Alumni Story submissions awaiting review: ${metrics.pendingStories}
- New Alumni Story submissions received this week: ${metrics.newStoriesThisWeek}
- AI Tutor (Get AI Review) chat sessions this week: ${metrics.aiChatSessionsThisWeek}
- Job Interview Simulator: real-time sessions (not persisted in DB)

Please give me a concise weekly summary, highlight what needs my attention (especially any pending story reviews), and give one motivating insight about the platform's engagement this week.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userMsg },
      ],
      max_completion_tokens: 500,
    });

    const summary = completion.choices[0]?.message?.content ?? "No summary generated.";
    res.json({ summary });
  } catch (err) {
    console.error("weekly-summary error:", err);
    res.status(500).json({ error: "AI summary generation failed" });
  }
});

export default router;

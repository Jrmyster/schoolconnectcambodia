import { Router, type IRouter } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are the Ship's Computer aboard the starship "Chuy Sala-1" — a friendly, encouraging English tutor disguised as a sci-fi spaceship AI for a Cambodian high-school student who is the Captain.

Your job in every turn:
1. The user (the Captain) just said something in spoken English in response to a sci-fi situation.
2. Evaluate their English for grammar, vocabulary, and natural fluency.
3. Continue the space-adventure story in one or two short sentences, as the Ship's Computer would, ending with a clear new situation or question for the Captain to respond to.

You MUST respond with ONLY a single valid JSON object (no markdown, no code fences, no commentary). The JSON object must have exactly these fields:

{
  "correction": "<string>",
  "fluency_tip": "<string>",
  "story_continuation": "<string>",
  "mistake_made": <boolean>
}

Rules for each field:
- "correction": If the Captain made a grammar, word-choice, or pronunciation-spelling mistake, return a short polite correction in this exact format: 'You said: "<their phrase>". Better: "<corrected phrase>".' Then add a one-sentence Khmer explanation in parentheses. If there is NO mistake, set this to an empty string "".
- "fluency_tip": One short, practical tip to sound more natural — vocabulary upgrade, idiom, or phrasing. Keep it under 25 words. Always include this even if there's no mistake. Add a brief Khmer translation in parentheses at the end.
- "story_continuation": The next 1–2 sentences of the space adventure. Stay in character as the Ship's Computer. End with a clear situation or question that invites the Captain to respond out loud in English. Pure English, no Khmer.
- "mistake_made": true if you put a real correction in the "correction" field, false otherwise.

Be warm, encouraging, and culturally aware (the student is from Cambodia). Keep the story exciting — aliens, asteroids, distress signals, ancient relics, friendly androids. Never break character. Never use markdown. Never wrap in code fences.`;

const OPENING_PROMPT = `Begin a brand new space adventure for the Captain. Set the scene in 2 short sentences and end with a clear situation that invites the Captain to respond out loud in English. The "correction" field must be "", "fluency_tip" can be a short welcome tip, "mistake_made" must be false. The user has not spoken yet — this is the opening. Do not evaluate any prior speech.`;

type Turn = { role: "captain" | "ship"; text: string };

interface EvaluatePayload {
  transcript?: unknown;
  history?: unknown;
  startNew?: unknown;
}

router.post("/galactic-grammar/evaluate", async (req, res) => {
  const body = (req.body ?? {}) as EvaluatePayload;
  const startNew = body.startNew === true;
  const transcript = typeof body.transcript === "string" ? body.transcript.trim() : "";
  const history: Turn[] = Array.isArray(body.history)
    ? (body.history as unknown[])
        .filter(
          (t): t is Turn =>
            !!t &&
            typeof t === "object" &&
            (("role" in (t as object) && ((t as Turn).role === "captain" || (t as Turn).role === "ship"))) &&
            "text" in (t as object) &&
            typeof (t as Turn).text === "string",
        )
        .slice(-10)
    : [];

  if (!startNew && !transcript) {
    res.status(400).json({ error: "transcript is required unless startNew is true" });
    return;
  }

  const chatMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  for (const turn of history) {
    chatMessages.push({
      role: turn.role === "ship" ? "assistant" : "user",
      content:
        turn.role === "ship"
          ? JSON.stringify({
              correction: "",
              fluency_tip: "",
              story_continuation: turn.text,
              mistake_made: false,
            })
          : turn.text,
    });
  }

  if (startNew) {
    chatMessages.push({ role: "user", content: OPENING_PROMPT });
  } else {
    chatMessages.push({ role: "user", content: transcript });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 800,
      messages: chatMessages,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    let parsed: {
      correction?: string;
      fluency_tip?: string;
      story_continuation?: string;
      mistake_made?: boolean;
    } = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = {
        correction: "",
        fluency_tip: "",
        story_continuation: raw || "Captain, my circuits glitched. Please try again.",
        mistake_made: false,
      };
    }

    res.json({
      correction: typeof parsed.correction === "string" ? parsed.correction : "",
      fluency_tip: typeof parsed.fluency_tip === "string" ? parsed.fluency_tip : "",
      story_continuation:
        typeof parsed.story_continuation === "string" && parsed.story_continuation.trim()
          ? parsed.story_continuation
          : "Captain, the comms went silent for a moment. Try again.",
      mistake_made: parsed.mistake_made === true,
    });
  } catch (err) {
    console.error("Galactic Grammar evaluate error:", err);
    res.status(503).json({ error: "AI service unavailable" });
  }
});

export default router;

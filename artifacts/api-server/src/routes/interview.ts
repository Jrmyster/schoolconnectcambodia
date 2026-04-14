import { Router, type IRouter } from "express";
import { ai } from "@workspace/integrations-gemini-ai";

const router: IRouter = Router();

type InterviewType = "university_entrance" | "local_job" | "scholarship";
type Language = "en" | "kh";

function buildSystemPrompt(type: InterviewType, language: Language): string {
  const langNote =
    language === "kh"
      ? "Conduct the entire interview in Khmer (ភាសាខ្មែរ). All questions, feedback, and summaries must be in Khmer."
      : "Conduct the entire interview in English. The student may be a Cambodian learner, so use clear, professional but accessible English.";

  const roleDescriptions: Record<InterviewType, { en: string; kh: string }> = {
    university_entrance: {
      en: "You are interviewing a Cambodian student for a university entrance interview. Ask about their academic background, goals, chosen subject, and why they deserve a place.",
      kh: "អ្នកកំពុងសម្ភាសន៍និស្សិតខ្មែរម្នាក់សម្រាប់ការចូលសាកលវិទ្យាល័យ។ សួរអំពីប្រវត្តិសិក្សា គោលដៅ មុខវិជ្ជា និងហេតុផលដែលពួកគេគួរទទួលបានកន្លែង។",
    },
    local_job: {
      en: "You are a hiring manager at a local Cambodian business interviewing a candidate for a job. Ask practical questions about their skills, experience, reliability, and why they want the job.",
      kh: "អ្នកជានាយកជ្រើសរើស​បុគ្គលិកនៃអាជីវកម្មមូលដ្ឋានខ្មែរ។ សួរសំណួរជាក់ស្ដែងអំពីជំនាញ បទពិសោធ ការទំនុកចិត្ត និងហេតុផលដែលពួកគេចង់ធ្វើការ។",
    },
    scholarship: {
      en: "You are a scholarship panel interviewer for a prestigious Cambodian scholarship programme. Ask about the student's academic excellence, community involvement, leadership, and future plans.",
      kh: "អ្នកជាអ្នកសម្ភាសន៍នៃគណៈកម្មការអាហារូបករណ៍ខ្មែរ។ សួរអំពីការសិក្សាពូកែ ការចូលរួមសហគមន៍ ភាពជាអ្នកដឹកនាំ និងផែនការអនាគត។",
    },
  };

  const role =
    language === "kh"
      ? roleDescriptions[type].kh
      : roleDescriptions[type].en;

  const bodyLanguageNote =
    language === "kh"
      ? "បន្ទាប់ពីចម្លើយរបស់ និស្សិត ផ្ដល់មតិយ៉ាងខ្លីអំពី: ១) ភាសាកាយ (ក្លែងធ្វើ — ដូចជា ការទំនាក់ទំនងភ្នែក ឥរិយាបថ) ២) សម្លេង (ទំនុកចិត្ត ភាពច្បាស់) ៣) ខ្លឹមសារ (ភាពពាក់ព័ន្ធ ភាពជាក់លាក់)។ បន្ទាប់មកសួរសំណួរបន្ទាប់មួយ។"
      : "After each student answer, give brief structured feedback on: 1) Body Language (simulated — e.g., eye contact, posture) 2) Tone (confidence, clarity) 3) Content (relevance, specificity). Then ask the next question.";

  return `You are a professional Cambodian interviewer running a mock interview practice session for the Chouy Sala (ជួយសាលា / Help School) educational platform.

${role}

${langNote}

INTERVIEW RULES:
- Ask ONE question at a time. Never ask multiple questions at once.
- After the student answers, provide structured feedback with exactly these three sections:
  📋 Body Language: [simulated feedback — imagine they are sitting in front of you]
  🎤 Tone: [feedback on confidence, pace, clarity]
  💡 Content: [feedback on what they said — relevance, specificity, improvement tips]
  Then add a short encouraging sentence, and ask the NEXT question.
- Keep each question and feedback concise and professional.
- Start the interview with a warm welcome and your FIRST question immediately.
- After 5-7 questions, if asked to end, generate a full performance summary.

${bodyLanguageNote}

PERFORMANCE SUMMARY FORMAT (when requested):
Write a professional interview performance report with:
- Overall Score: X/10
- Strengths (3 bullet points)
- Areas for Improvement (3 bullet points)  
- Top 1 Priority Action Before a Real Interview
- Closing encouraging message`;
}

router.post("/gemini/interview", async (req, res) => {
  const body = req.body as Record<string, unknown>;

  const interviewType = body.interviewType as InterviewType;
  const language = (body.language as Language) || "en";
  const generateSummary = body.generateSummary === true;
  const rawMessages = body.messages as
    | { role: string; content: string }[]
    | undefined;

  if (
    !["university_entrance", "local_job", "scholarship"].includes(interviewType)
  ) {
    res.status(400).json({ error: "Invalid interviewType" });
    return;
  }

  if (!Array.isArray(rawMessages)) {
    res.status(400).json({ error: "messages must be an array" });
    return;
  }

  const systemPrompt = buildSystemPrompt(interviewType, language);

  const summaryRequest =
    language === "kh"
      ? "សូមបង្កើតសេចក្ដីសង្ខេបការអនុវត្តន៍ពេញលេញរបស់ខ្ញុំ។"
      : "Please generate my full performance summary now.";

  const starterPrompt =
    language === "kh"
      ? "សូមចាប់ផ្ដើមការសម្ភាសន៍។ សូមស្វាគមន៍ខ្ញុំដោយកក់ក្ដៅ ហើយសួរសំណួរទីមួយ។"
      : "Please begin the interview. Greet me warmly and ask your first question.";

  const mappedMessages = rawMessages.map((m) => ({
    role: m.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: [{ text: m.content }],
  }));

  const contents =
    mappedMessages.length === 0
      ? [{ role: "user" as const, parts: [{ text: starterPrompt }] }]
      : [
          ...mappedMessages,
          ...(generateSummary
            ? [{ role: "user" as const, parts: [{ text: summaryRequest }] }]
            : []),
        ];

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 8192,
      },
    });

    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  } catch (err) {
    console.error("Gemini interview error:", err);
    res.write(
      `data: ${JSON.stringify({ error: "AI service unavailable. Please try again." })}\n\n`
    );
  }

  res.end();
});

export default router;

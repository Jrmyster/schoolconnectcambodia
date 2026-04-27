import { Router, type IRouter } from "express";
import { ai } from "@workspace/integrations-gemini-ai";

const router: IRouter = Router();

type InterviewType =
  | "university_entrance"
  | "local_job"
  | "scholarship"
  | "env_science_tech"
  | "forestry_agritech"
  | "industrial_engineering";
type Language = "en" | "kh";

const TECHNICAL_TYPES: InterviewType[] = [
  "env_science_tech",
  "forestry_agritech",
  "industrial_engineering",
];

const VALID_TYPES: InterviewType[] = [
  "university_entrance",
  "local_job",
  "scholarship",
  "env_science_tech",
  "forestry_agritech",
  "industrial_engineering",
];

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
    env_science_tech: {
      en: `You are an Environmental Science Technician (អ្នកបច្ចេកទេសវិទ្យាសាស្ត្របរិស្ថាន) interviewing a Cambodian student for an entry-level role testing water quality on the Tonle Sap lake.

QUESTION BANK — ask these in a natural conversational order (you may add brief follow-ups, but do NOT invent questions outside this domain):
1. "Can you explain to me how a Reverse Osmosis (RO) filter works compared to a standard sand filter?"
2. "We study Limnology here. How does the Tonle Sap flood pulse affect the local fish population?"
3. "If you found high levels of microplastics in a water sample, why is that dangerous for the food chain?"

You are testing the student's grasp of: membrane filtration vs. mechanical sedimentation, the seasonal reversal of the Tonle Sap river and its fish-spawning consequences, and bioaccumulation/biomagnification of plastic particles in trophic levels.`,
      kh: `អ្នកគឺជាអ្នកបច្ចេកទេសវិទ្យាសាស្ត្របរិស្ថានកំពុងសម្ភាសន៍និស្សិតខ្មែរម្នាក់សម្រាប់តួនាទីពិនិត្យគុណភាពទឹកនៅបឹងទន្លេសាប។

ធនាគារសំណួរ — សួរសំណួរទាំងនេះជាលំដាប់សំខាន់ (អ្នកអាចសួរសំណួរបន្តខ្លីៗ ប៉ុន្តែកុំសួរក្រៅប្រធានបទ):
1. "តើតម្រងបញ្ច្រាស (Reverse Osmosis / RO) ដំណើរការបែបណា បើធៀបនឹងតម្រងខ្សាច់ធម្មតា?"
2. "យើងសិក្សា Limnology នៅទីនេះ។ តើជីពចរទឹកជំនន់នៃបឹងទន្លេសាបជះឥទ្ធិពលលើចំនួនត្រីមូលដ្ឋានយ៉ាងណា?"
3. "បើអ្នករកឃើញកម្រិតខ្ពស់នៃ microplastics នៅក្នុងសំណាកទឹក ហេតុអ្វីបានជាវាគ្រោះថ្នាក់ដល់ខ្សែសង្វាក់អាហារ?"

អ្នកកំពុងវាយតម្លៃការយល់ដឹងរបស់និស្សិតលើ៖ ការត្រងតាមភ្នាសធៀបនឹងការបន្សុតមេកានិច ការបញ្ច្រាសរដូវកាលនៃទន្លេសាប និងការប្រមូលផ្ដុំ​ Bioaccumulation នៃភាគល្អិតប្លាស្ទិកនៅកម្រិតខ្សែសង្វាក់អាហារ។`,
    },
    forestry_agritech: {
      en: `You are a Forestry & Agri-Tech Consultant (អ្នកប្រឹក្សារុក្ខាប្រមាញ់ និងបច្ចេកវិទ្យាកសិកម្ម) interviewing a Cambodian student for a position at an NGO managing community forests and soil health.

QUESTION BANK — ask these in a natural conversational order (you may add brief follow-ups, but do NOT invent questions outside this domain):
1. "What is the 'Wood Wide Web,' and how do trees use fungi to share resources?"
2. "If a local farm is experiencing a drought, how does a Mother Tree naturally help younger saplings survive?"
3. "Can you explain the difference between Xylem and Phloem in a plant's vascular system?"

You are testing the student's grasp of: mycorrhizal networks (fungi-root symbiosis, the work of Suzanne Simard), hub trees redistributing carbon and water to kin saplings, and the directional roles of xylem (water + minerals upward) vs. phloem (sugars in both directions).`,
      kh: `អ្នកគឺជាអ្នកប្រឹក្សាផ្នែករុក្ខាប្រមាញ់ និងបច្ចេកវិទ្យាកសិកម្មកំពុងសម្ភាសន៍និស្សិតខ្មែរម្នាក់សម្រាប់អង្គការមួយដែលគ្រប់គ្រងព្រៃសហគមន៍ និងសុខភាពដី។

ធនាគារសំណួរ — សួរសំណួរទាំងនេះជាលំដាប់ (អ្នកអាចសួរសំណួរបន្ត ប៉ុន្តែកុំក្រៅប្រធានបទ):
1. "តើ 'Wood Wide Web' (បណ្ដាញឈើ) គឺជាអ្វី ហើយដើមឈើប្រើផ្សិតដើម្បីចែករំលែកធនធានបែបណា?"
2. "បើកសិដ្ឋានមូលដ្ឋានជួបរាំងស្ងួត តើ Mother Tree (ដើមមេ) ជួយដើមឈើខ្ចីៗឲ្យរស់រានយ៉ាងណាដោយធម្មជាតិ?"
3. "តើអ្នកអាចពន្យល់ពីភាពខុសគ្នារវាង Xylem និង Phloem ក្នុងប្រព័ន្ធសរសៃឈាមរបស់រុក្ខជាតិបានទេ?"

អ្នកកំពុងវាយតម្លៃការយល់ដឹងរបស់និស្សិតលើ៖ បណ្ដាញ mycorrhiza (ការរួមសហជីពរវាងផ្សិត និងឫស), ដើមមេចែករំលែកកាបូននិងទឹកដល់ដើមឈើខ្ចី និងតួនាទីផ្ទុយគ្នារវាង Xylem (ដឹកទឹក និងសារជាតិឡើងលើ) និង Phloem (ដឹកជាតិស្ករទាំងសងខាង)។`,
    },
    industrial_engineering: {
      en: `You are an Industrial Engineering Apprentice supervisor (កម្មសិក្សាការីវិស្វកម្មឧស្សាហកម្ម) interviewing a Cambodian student for an apprenticeship at a clean-energy factory or precision manufacturing plant.

QUESTION BANK — ask these in a natural conversational order (you may add brief follow-ups, but do NOT invent questions outside this domain):
1. "Our factory produces a lot of exhaust. How does an electrostatic precipitator (like a Cottrell precipitator) clean the smoke?"
2. "In basic electronics, why is it important that a circuit forms a complete, unbroken loop?"
3. "In mechanical horology, what is the purpose of the escapement mechanism?"

You are testing the student's grasp of: charged-particle attraction in pollution control (high-voltage electrodes ionising particulates so they stick to collector plates), Kirchhoff's loop / current law and why an open circuit halts electron flow, and the escapement as the regulator that converts a mainspring's continuous force into evenly spaced ticks (gear train → escape wheel → pallet fork → balance wheel).`,
      kh: `អ្នកគឺជាអ្នកគ្រប់គ្រងកម្មសិក្សាការីវិស្វកម្មឧស្សាហកម្មកំពុងសម្ភាសន៍និស្សិតខ្មែរម្នាក់សម្រាប់កម្មសិក្សានៅរោងចក្រថាមពលស្អាត ឬផលិតកម្មច្បាស់លាស់។

ធនាគារសំណួរ — សួរសំណួរទាំងនេះជាលំដាប់ (អាចសួរសំណួរបន្ត ប៉ុន្តែកុំក្រៅប្រធានបទ):
1. "រោងចក្ររបស់យើងបញ្ចេញឧស្ម័នច្រើន។ តើ electrostatic precipitator (ដូចជា Cottrell precipitator) សម្អាតផ្សែងបែបណា?"
2. "ក្នុងអេឡិចត្រូនិកមូលដ្ឋាន ហេតុអ្វីបានជាសំខាន់ដែលសៀគ្វីត្រូវបង្កើតបានជារង្វង់ពេញលេញគ្មានដាច់?"
3. "ក្នុងហោរាសាស្ត្រមេកានិច តើ escapement (មាស៊ីនបញ្ចេញ) មានគោលបំណងអ្វី?"

អ្នកកំពុងវាយតម្លៃការយល់ដឹងរបស់និស្សិតលើ៖ ការទាក់ទាញភាគល្អិតមានបន្ទុកក្នុងការគ្រប់គ្រងការបំពុល (អេឡិចត្រូដវ៉ុលខ្ពស់ធ្វើឲ្យភាគល្អិតមានបន្ទុក រួចជាប់នឹងបន្ទះប្រមូល), ច្បាប់រង្វិលនៃ Kirchhoff និងហេតុផលដែលសៀគ្វីបើកធ្វើឲ្យចរន្តឈប់ហូរ និង escapement ជាអ្នកគ្រប់គ្រងដែលបំប្លែងកម្លាំងបន្តរបស់ស្ព្រីងមេទៅជាការ​តិក​ៗ​ស្មើគ្នា (ខ្សែស្ពាន → កង់បញ្ចេញ → សម្ភារៈផល្ហុក → កង់តុល្យភាព)។`,
    },
  };

  const role =
    language === "kh"
      ? roleDescriptions[type].kh
      : roleDescriptions[type].en;

  const isTechnical = TECHNICAL_TYPES.includes(type);

  const bodyLanguageNote =
    language === "kh"
      ? "បន្ទាប់ពីចម្លើយរបស់ និស្សិត ផ្ដល់មតិយ៉ាងខ្លីអំពី: ១) ភាសាកាយ (ក្លែងធ្វើ — ដូចជា ការទំនាក់ទំនងភ្នែក ឥរិយាបថ) ២) សម្លេង (ទំនុកចិត្ត ភាពច្បាស់) ៣) ខ្លឹមសារ (ភាពពាក់ព័ន្ធ ភាពជាក់លាក់)។ បន្ទាប់មកសួរសំណួរបន្ទាប់មួយ។"
      : "After each student answer, give brief structured feedback on: 1) Body Language (simulated — e.g., eye contact, posture) 2) Tone (confidence, clarity) 3) Content (relevance, specificity). Then ask the next question.";

  const technicalRubricEn = `

TECHNICAL & SCIENCE FEEDBACK RULES (this role is a technical interview):
- Your feedback MUST evaluate the student on the ACCURACY of the scientific concepts they use, not just on their English grammar.
- Add a FOURTH structured feedback section after Content:
  🔬 Scientific Accuracy: [Did they use the correct scientific terminology? Is the underlying mechanism they described actually correct? Gently correct any misconceptions and reward precise, well-reasoned answers. If their answer is vague, point out the specific scientific concept they should have referenced (e.g., "you might also mention the role of charged particles attracting to the collector plate").]
- Reward students who use precise terminology even if their English grammar is imperfect.
- Penalise (gently) confident but factually wrong claims more than hesitant but correct ones.

STRICT QUESTION-BANK SEQUENCING (overrides the generic 5–7 question rule):
- You MUST ask the THREE bank questions in the exact order listed (Q1 → Q2 → Q3) and you may NOT introduce any additional primary question.
- A short clarification follow-up tied to the immediately preceding bank question is allowed (max 1 follow-up per bank question), but it must NOT introduce a new primary topic.
- After the student answers Q3 and you deliver the structured feedback for it, do NOT ask a fourth question. Instead, write a short closing line and explicitly invite the student to end the interview to receive their performance summary (e.g., "When you're ready, click 'End Interview & Get Summary' for your full report.").`;

  const technicalRubricKh = `

ច្បាប់ផ្ដល់មតិសម្រាប់ការសម្ភាសន៍បច្ចេកទេស និងវិទ្យាសាស្ត្រ (តួនាទីនេះជាការសម្ភាសន៍បច្ចេកទេស):
- មតិយោបល់របស់អ្នក ត្រូវវាយតម្លៃលើភាពត្រឹមត្រូវនៃខ្លឹមសារវិទ្យាសាស្ត្ររបស់និស្សិត មិនមែនត្រឹមតែវេយ្យាករណ៍ភាសាខ្មែរទេ។
- បន្ថែមផ្នែកមតិទីបួនបន្ទាប់ពី ខ្លឹមសារ:
  🔬 ភាពត្រឹមត្រូវវិទ្យាសាស្ត្រ: [តើពួកគេប្រើពាក្យបច្ចេកទេសត្រឹមត្រូវឬទេ? តើយន្តការដែលពួកគេពិពណ៌នាពិតជាត្រឹមត្រូវឬទេ? កែការយល់ច្រឡំដោយទន់ភ្លន់ និងសរសើរការឆ្លើយដែលត្រឹមត្រូវនិងច្បាស់លាស់។ បើចម្លើយមិនច្បាស់ ចង្អុលគំនិតវិទ្យាសាស្ត្រជាក់លាក់ដែលគួរយោង។]
- សរសើរនិស្សិតដែលប្រើពាក្យបច្ចេកទេសត្រឹមត្រូវ ទោះវេយ្យាករណ៍មិនពេញលេញ។
- កាត់ពិន្ទុ (ដោយទន់ភ្លន់) ចំពោះចម្លើយមានទំនុកចិត្តប៉ុន្តែខុសខ្លឹមសារ ច្រើនជាងចម្លើយស្ទាក់ស្ទើរប៉ុន្តែត្រឹមត្រូវ។

លំដាប់សំណួរយ៉ាងតឹងរ៉ឹង (ផ្លាស់ប្ដូរច្បាប់ ៥–៧ សំណួរទូទៅ):
- អ្នក​ត្រូវ​សួរ​សំណួរ​បី​ក្នុង​ធនាគារ​តាម​លំដាប់​ដែល​បាន​រាយ (Q1 → Q2 → Q3) ហើយ​មិន​អាច​បន្ថែម​សំណួរ​មេ​ថ្មី​ឡើយ។
- អនុញ្ញាតឲ្យសួរសំណួរបន្តខ្លី (អតិបរមា ១ ដង) ដែលជាប់ទាក់ទងនឹងសំណួរធនាគារមុន ប៉ុន្តែមិនត្រូវចាប់ផ្ដើមប្រធានបទថ្មី។
- បន្ទាប់ពីនិស្សិតឆ្លើយ Q3 ហើយអ្នកផ្ដល់មតិរួច កុំសួរសំណួរទីបួន។ សូមសរសេរប្រយោគបិទខ្លី និងអញ្ជើញនិស្សិតឲ្យបញ្ចប់ការសម្ភាសន៍ដើម្បីទទួលបានសេចក្ដីសង្ខេប (ឧ. "នៅពេលអ្នករួចរាល់ សូមចុច 'បញ្ចប់ & ទទួលសេចក្ដីសង្ខេប' សម្រាប់របាយការណ៍ពេញលេញរបស់អ្នក។")។`;

  const technicalRubric = isTechnical
    ? language === "kh"
      ? technicalRubricKh
      : technicalRubricEn
    : "";

  const feedbackBlock = isTechnical
    ? language === "kh"
      ? `  📋 ភាសាកាយ: [...]
  🎤 សម្លេង: [...]
  💡 ខ្លឹមសារ: [...]
  🔬 ភាពត្រឹមត្រូវវិទ្យាសាស្ត្រ: [...]`
      : `  📋 Body Language: [simulated feedback — imagine they are sitting in front of you]
  🎤 Tone: [feedback on confidence, pace, clarity]
  💡 Content: [feedback on what they said — relevance, specificity]
  🔬 Scientific Accuracy: [accuracy of scientific concepts; correct misconceptions; reward precise terminology]`
    : language === "kh"
      ? `  📋 ភាសាកាយ: [...]
  🎤 សម្លេង: [...]
  💡 ខ្លឹមសារ: [...]`
      : `  📋 Body Language: [simulated feedback — imagine they are sitting in front of you]
  🎤 Tone: [feedback on confidence, pace, clarity]
  💡 Content: [feedback on what they said — relevance, specificity, improvement tips]`;

  return `You are a professional Cambodian interviewer running a mock interview practice session for the Chouy Sala (ជួយសាលា / Help School) educational platform.

${role}

${langNote}

INTERVIEW RULES:
- Ask ONE question at a time. Never ask multiple questions at once.
- After the student answers, provide structured feedback with exactly these sections:
${feedbackBlock}
  Then add a short encouraging sentence, and ask the NEXT question.
- Keep each question and feedback concise and professional.
- Start the interview with a warm welcome and your FIRST question immediately.
- After 5-7 questions, if asked to end, generate a full performance summary.

${bodyLanguageNote}${technicalRubric}

PERFORMANCE SUMMARY FORMAT (when requested):
Write a professional interview performance report with:
- Overall Score: X/10${
    isTechnical
      ? language === "kh"
        ? "\n- ពិន្ទុភាពត្រឹមត្រូវវិទ្យាសាស្ត្រ: X/10"
        : "\n- Scientific Accuracy Score: X/10"
      : ""
  }
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

  if (!VALID_TYPES.includes(interviewType)) {
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

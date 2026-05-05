import { Link } from "wouter";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useTranslation } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Mission Statement: School Connect Cambodia
//  Fully bilingual — every string passes through t(en, kh).
//  Helper components accept pre-translated strings only.
// ════════════════════════════════════════════════════════════════════════════

const CREAM     = "#faf9f7";
const CREAM_2   = "#f2efe9";
const INK       = "#1c1917";
const INK_SOFT  = "#3c3834";
const MUTED     = "#78716c";
const RULE      = "#d6d3d1";
const NAVY      = "#1e3a5f";
const NAVY_BG   = "#dbeafe";
const GOLD      = "#92400e";
const GOLD_SOFT = "#fef3c7";
const GOLD_MID  = "#b45309";

// ── Helpers — all receive already-translated strings ──────────────────────

function H2({ text }: { text: string }) {
  return (
    <div style={{ marginTop: 56, marginBottom: 14, paddingBottom: 12, borderBottom: `2px solid ${NAVY}` }}>
      <h2 style={{ fontWeight: 800, fontSize: "clamp(1.2rem,3vw,1.55rem)", color: NAVY, margin: 0, lineHeight: 1.3 }}>
        {text}
      </h2>
    </div>
  );
}

function H3({ text }: { text: string }) {
  return (
    <div style={{ marginTop: 36, marginBottom: 10 }}>
      <h3 style={{ fontWeight: 700, fontSize: "clamp(1rem,2.5vw,1.15rem)", color: INK, margin: 0, lineHeight: 1.4 }}>
        {text}
      </h3>
    </div>
  );
}

function Para({ text }: { text: string }) {
  return (
    <p style={{ color: INK_SOFT, lineHeight: 1.9, fontSize: 16.5, marginBottom: 22, marginTop: 0 }}>
      {text}
    </p>
  );
}

function Rule() {
  return <hr style={{ border: "none", borderTop: `1px solid ${RULE}`, margin: "48px 0" }} />;
}

function BulletItem({ title, body }: { title: string; body: string }) {
  return (
    <li style={{
      borderLeft: `3px solid ${GOLD_MID}`,
      backgroundColor: GOLD_SOFT,
      borderRadius: "0 8px 8px 0",
      padding: "14px 20px",
      marginBottom: 10,
      listStyle: "none",
    }}>
      <strong style={{ color: GOLD, fontWeight: 700, display: "block", marginBottom: 5, fontSize: 15 }}>
        {title}
      </strong>
      <span style={{ color: INK_SOFT, lineHeight: 1.75, fontSize: 15 }}>{body}</span>
    </li>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function MissionStatementPage() {
  const t = useTranslation();

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh" }}>

      {/* ── Top bar ── */}
      <div style={{ backgroundColor: CREAM_2, borderBottom: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "12px 24px" }}>
          <Link href="/" style={{
            color: NAVY, textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 14, fontWeight: 500,
          }}>
            <ArrowLeft size={15} />
            {t("Back to Home", "ត្រឡប់ទំព័រដើម")}
          </Link>
        </div>
      </div>

      {/* ── Article column ── */}
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 100px" }}>

        {/* Badge */}
        <div style={{ marginBottom: 24 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            backgroundColor: NAVY_BG, color: NAVY,
            borderRadius: 999, padding: "5px 16px",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            <BookOpen size={12} />
            {t("Platform Philosophy", "ទស្សនវិជ្ជារបស់វេទិកា")}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontWeight: 900, fontSize: "clamp(1.8rem,5vw,2.6rem)",
          color: INK, lineHeight: 1.15, margin: "0 0 8px",
        }}>
          {t(
            "Mission Statement: School Connect Cambodia",
            "សេចក្តីថ្លែងការណ៍បេសកកម្ម: School Connect Cambodia",
          )}
        </h1>
        <p style={{ fontSize: 17, color: GOLD_MID, fontWeight: 600, margin: "0 0 48px" }}>
          School Connect Cambodia
        </p>

        {/* ── Preamble ─────────────────────────────────────────── */}
        <H3 text={t("Preamble: The Promise of Tomorrow", "អារម្ភកថា: ការសន្យានៃថ្ងៃស្អែក")} />

        <Para text={t(
          "At the heart of every advancing society lies a fundamental commitment to the cultivation of human potential. School Connect Cambodia was founded upon a singular, unwavering conviction: that the brilliant, untapped potential of Cambodian students requires only the architecture of opportunity to ignite a new era of innovation, prosperity, and profound social progress.",
          "នៅជាបេះដូងនៃរាល់សង្គមដែលកំពុងរីកចម្រើន គឺជាការប្តេជ្ញាចិត្តជាមូលដ្ឋានចំពោះការបណ្តុះសក្តានុពលរបស់មនុស្ស។ School Connect Cambodia ត្រូវបានបង្កើតឡើងដោយផ្អែកលើការជឿជាក់ ថាសក្តានុពលដ៏ភ្លឺស្វាងរបស់សិស្សខ្មែរ ទាមទារតែស្ថាបត្យកម្មនៃឱកាសប៉ុណ្ណោះ។",
        )} />

        <Para text={t(
          "We recognize that intelligence is distributed equally across the globe, but access to resources, structures, and high-quality instruction is profoundly unequal. School Connect Cambodia exists to dismantle these barriers — not merely building a website, but forging a dynamic digital ecosystem designed to empower students, educators, and communities.",
          "យើងទទួលស្គាល់ថាប្រាជ្ញាត្រូវបានចែកចាយស្មើគ្នានៅទូទាំងពិភពលោក ប៉ុន្តែការចូលប្រើធនធាន និងការណែនាំដ៏មានគុណភាព គឺមិនស្មើភាពគ្នា។ School Connect Cambodia មានវត្តមានដើម្បីលុបបំបាត់របាំងទាំងនេះ ដោយបង្កើតប្រព័ន្ធអេកូឡូស៊ីឌីជីថលដែលផ្ដល់អំណាចដល់សិស្ស គ្រូ និងសហគមន៍។",
        )} />

        <Rule />

        {/* ── Part I ──────────────────────────────────────────── */}
        <H2 text={t(
          "Part I: The Architecture of Opportunity — A Dual-Purpose Ecosystem",
          "ផ្នែកទី ១: ស្ថាបត្យកម្មនៃឱកាស — ប្រព័ន្ធអេកូឡូស៊ីគោលបំណងទ្វេដង",
        )} />

        <Para text={t(
          "To achieve systemic change, a platform must be both practically useful in the immediate present and structurally robust for the future. School Connect Cambodia operates as a dual-purpose engine, integrating a functional digital resource map with a comprehensive, centralized education hub.",
          "ដើម្បីសម្រេចបាននូវការផ្លាស់ប្តូរជាប្រព័ន្ធ វេទិកាមួយត្រូវតែមានប្រយោជន៍ជាក់ស្តែង និងរឹងមាំសម្រាប់អនាគត។ School Connect Cambodia ដំណើរការជាម៉ាស៊ីនគោលបំណងទ្វេដង ដោយរួមបញ្ចូលផែនទីធនធានឌីជីថល ជាមួយមជ្ឈមណ្ឌលអប់រំដ៏ទូលំទូលាយ។",
        )} />

        <H3 text={t(
          "1. The Digital Resource Map: Connecting the Fragmented",
          "១. ផែនទីធនធានឌីជីថល: ការភ្ជាប់ទំនាក់ទំនងផ្នែកដែលបែកបាក់",
        )} />

        <Para text={t(
          "In many developing educational landscapes, the primary obstacle is not an absolute lack of resources, but rather their fragmentation. A school in one province may possess discarded materials perfect for upcycling, while a classroom fifty kilometers away desperately needs those exact materials for an engineering project. Local NGOs, passionate educators, and community leaders often operate in silos, unaware of the collaborative potential lying just out of reach.",
          "ក្នុងប្រព័ន្ធអប់រំដែលកំពុងអភិវឌ្ឍ របាំងចម្បងជារឿយៗមិនមែនជាការខ្វះធនធានទាំងស្រុងទេ គឺជាភាពបែកបាក់នៃធនធានទាំងនោះ។ NGO មូលដ្ឋាន គ្រូបង្រៀន និងអ្នកដឹកនាំសហគមន៍ ជារឿយៗប្រតិបត្តិការដោយឡែកពីគ្នា ដោយមិនដឹងពីសក្តានុពលនៃការសហការ។",
        )} />

        <ul style={{ padding: 0, margin: "0 0 28px" }}>
          <BulletItem
            title={t("Visibility and Logistics", "ភាពមើលឃើញ និងភស្តុភារ")}
            body={t(
              "It visualizes the distribution of physical resources, technological assets, and human capital across regions.",
              "វារំលេចការចែកចាយធនធានរូបវន្ត ទ្រព្យសកម្មបច្ចេកវិទ្យា និងធនធានមនុស្សនៅទូទាំងតំបន់។",
            )}
          />
          <BulletItem
            title={t("Frugal Engineering and Utility", "វិស្វកម្មសន្សំសំចៃ និងអត្ថប្រយោជន៍")}
            body={t(
              "It acts as a tracking and coordination tool for sustainable, frugal engineering projects. When students design hand-washing stations, solar stills, or evaporative cooling systems from local materials, the map allows these blueprints and material needs to be shared and replicated.",
              "វាដើរតួជាឧបករណ៍តាមដាន និងសម្របសម្រួលសម្រាប់គម្រោងវិស្វកម្មចីរភាព។ ផែនទីនេះអនុញ្ញាតឱ្យគំនូសសាងសង់ និងតម្រូវការសម្ភារៈ ត្រូវបានចែករំលែក និងចម្លង។",
            )}
          />
          <BulletItem
            title={t("Collaborative Network", "បណ្តាញសហការ")}
            body={t(
              "It fosters connections between schools, NGOs, government bodies, and private donors, transforming isolated goodwill into coordinated, measurable impact.",
              "វាជំរុញទំនាក់ទំនងរវាងសាលារៀន NGO អង្គការរដ្ឋ និងអ្នកបរិច្ចាគ ដើម្បីបំប្លែងទឹកចិត្តល្អទៅជាផលប៉ះពាល់ដែលអាចវាស់វែងបាន។",
            )}
          />
        </ul>

        <H3 text={t(
          "2. The Education Hub: Localizing the Universe of Knowledge",
          "២. មជ្ឈមណ្ឌលអប់រំ: ធ្វើឱ្យសកលភាពនៃចំណេះដឹងក្លាយជាមូលដ្ឋាន",
        )} />

        <Para text={t(
          "The second pillar of School Connect Cambodia is a comprehensive, free, and bilingual education hub. This is not a simple repository of links. It is a carefully curated, locally contextualized library of knowledge, designed to serve the specific needs, languages, cultural contexts, and learning styles of Cambodian students and teachers.",
          "សសរស្តម្ភទីពីររបស់ School Connect Cambodia គឺជាមជ្ឈមណ្ឌលអប់រំដ៏ទូលំទូលាយ ឥតគិតថ្លៃ និងជាភាសាពីរ។ នេះមិនមែនជាឃ្លាំងតំណភ្ជាប់ធម្មតាទេ គឺជាបណ្ណាល័យចំណេះដឹងដែលត្រូវបានរក្សាទុកយ៉ាងយកចិត្តទុកដាក់ ដែលត្រូវបានរចនាឡើងដើម្បីបម្រើតម្រូវការ ភាសា និងបរិបទវប្បធម៌ជាក់លាក់របស់សិស្ស និងគ្រូខ្មែរ។",
        )} />

        <Rule />

        {/* ── Part II ─────────────────────────────────────────── */}
        <H2 text={t(
          "Part II: Our Core Values",
          "ផ្នែកទី ២: តម្លៃស្នូលរបស់យើង",
        )} />

        <ul style={{ padding: 0, margin: "0 0 28px" }}>
          <BulletItem
            title={t("Equity and Access", "សមធម៌ និងការចូលប្រើ")}
            body={t(
              "Every resource on this platform is free. We believe that financial barriers must never determine the ceiling of a student's intellectual growth.",
              "រាល់ធនធាននៅលើវេទិកានេះគឺឥតគិតថ្លៃ។ យើងជឿថារបាំងហិរញ្ញវត្ថុមិនគួរកំណត់ដំណើរវឌ្ឍនភាពបញ្ញារបស់សិស្សឡើយ។",
            )}
          />
          <BulletItem
            title={t("Bilingual Commitment", "ការប្តេជ្ញាចិត្តជាភាសាពីរ")}
            body={t(
              "All core content is available in both English and Khmer. Mastery of English is a powerful tool; but deep understanding begins in one's mother tongue.",
              "មាតិកាស្នូលទាំងអស់មានជាភាសាអង់គ្លេស និងខ្មែរ។ ភាសាអង់គ្លេសជាឧបករណ៍ដ៏ខ្លាំង ប៉ុន្តែការយល់ដឹងជ្រៅជ្រះចាប់ផ្តើមពីភាសាមាតុភូមិ។",
            )}
          />
          <BulletItem
            title={t("Community Ownership", "ភាពជាម្ចាស់សហគមន៍")}
            body={t(
              "This platform is built for Cambodia, by people who believe in Cambodia. We actively seek input from teachers, students, and parents to ensure relevance and impact.",
              "វេទិកានេះត្រូវបានកសាងឡើងសម្រាប់កម្ពុជា ដោយអ្នកដែលជឿជាក់លើកម្ពុជា។ យើងស្វែងរកការចូលរួមពីគ្រូ សិស្ស និងឪពុកម្តាយ ដើម្បីធានានូវភាពពាក់ព័ន្ធ និងផលប៉ះពាល់។",
            )}
          />
        </ul>

        <Rule />

        {/* ── Closing ─────────────────────────────────────────── */}
        <H2 text={t("A Call to Action", "ការអំពាវនាវដល់សកម្មភាព")} />

        <Para text={t(
          "School Connect Cambodia is more than a platform. It is a declaration of belief in the transformative power of education, and in the limitless potential of every Cambodian student. We invite every educator, student, parent, NGO, and donor to join us.",
          "School Connect Cambodia គឺជាច្រើនជាងវេទិកាមួយ។ វាជាការថ្លែងនៃការជឿជាក់ក្នុងថាមពលផ្លាស់ប្តូររបស់ការអប់រំ និងសក្តានុពលគ្មានដែនកំណត់របស់សិស្សខ្មែរគ្រប់រូប។ យើងអញ្ជើញគ្រូ សិស្ស ឪពុកម្តាយ NGO និងអ្នកបរិច្ចាគគ្រប់រូបឱ្យចូលរួមជាមួយយើង។",
        )} />

        <Para text={t(
          "Together, we will build the architecture of opportunity — one lesson, one connection, one community at a time.",
          "រួមគ្នា យើងនឹងកសាងស្ថាបត្យកម្មនៃឱកាស — មួយមេរៀន មួយទំនាក់ទំនង មួយសហគមន៍ក្នុងមួយពេល។",
        )} />

        {/* Footer note */}
        <div style={{
          marginTop: 64,
          padding: "20px 24px",
          backgroundColor: NAVY_BG,
          borderRadius: 10,
          borderLeft: `4px solid ${NAVY}`,
        }}>
          <p style={{ margin: 0, color: NAVY, fontSize: 14, lineHeight: 1.7, fontWeight: 500 }}>
            {t(
              "School Connect Cambodia — Building bridges between knowledge and opportunity for every Cambodian student.",
              "School Connect Cambodia — កសាងស្ពានរវាងចំណេះដឹង និងឱកាសសម្រាប់សិស្សខ្មែរគ្រប់រូប។",
            )}
          </p>
        </div>

      </article>
    </div>
  );
}

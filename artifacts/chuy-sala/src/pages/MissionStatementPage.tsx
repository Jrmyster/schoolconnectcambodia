import { Link } from "wouter";
import { type ReactNode } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useTranslation } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Mission Statement: School Connect Cambodia
//  សេចក្ដីថ្លែងការណ៍បេសកកម្ម
//
//  Article-style long-form page, prose-optimized column.
//  Palette: warm cream · deep navy · amber-gold accent
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

// ── Shared mini-components ──────────────────────────────────────────────────

function H2({ en, kh }: { en: string; kh: string }) {
  return (
    <div style={{ marginTop: 56, marginBottom: 14, paddingBottom: 12, borderBottom: `2px solid ${NAVY}` }}>
      <h2 style={{ fontWeight: 800, fontSize: "clamp(1.2rem,3vw,1.55rem)", color: NAVY, margin: 0, lineHeight: 1.25 }}>
        {en}
      </h2>
      <p style={{ color: MUTED, fontSize: 13, margin: "5px 0 0", fontWeight: 500 }}>{kh}</p>
    </div>
  );
}

function H3({ en, kh }: { en: string; kh: string }) {
  return (
    <div style={{ marginTop: 36, marginBottom: 10 }}>
      <h3 style={{ fontWeight: 700, fontSize: "clamp(1rem,2.5vw,1.15rem)", color: INK, margin: 0 }}>{en}</h3>
      <p style={{ color: "#9ca3af", fontSize: 12, margin: "3px 0 0" }}>{kh}</p>
    </div>
  );
}

function Para({ children }: { children: ReactNode }) {
  return (
    <p style={{ color: INK_SOFT, lineHeight: 1.9, fontSize: 16.5, marginBottom: 22, marginTop: 0 }}>
      {children}
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

// ── Page ───────────────────────────────────────────────────────────────────

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
            {t("Platform Philosophy", "ទស្សនវិជ្ជា")}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontWeight: 900, fontSize: "clamp(1.8rem,5vw,2.6rem)",
          color: INK, lineHeight: 1.15, margin: "0 0 8px",
        }}>
          {t("Mission Statement", "សេចក្ដីថ្លែងការណ៍បេសកកម្ម")}
        </h1>
        <p style={{ fontSize: 17, color: GOLD_MID, fontWeight: 600, margin: "0 0 48px" }}>
          School Connect Cambodia
        </p>

        {/* ── Preamble ─────────────────────────────────────────── */}
        <H3
          en="Preamble: The Promise of Tomorrow"
          kh="អារម្ភ: សន្យានៃថ្ងៃស្អែក"
        />

        <Para>
          At the heart of every advancing society lies a fundamental commitment to the cultivation of
          human potential. School Connect Cambodia was founded upon a singular, unwavering conviction:
          that the brilliant, untapped potential of Cambodian students requires only the architecture of
          opportunity to ignite a new era of innovation, prosperity, and profound social progress. We
          recognize that intelligence is distributed equally across the globe, but access to resources,
          structures, and high-quality instruction is profoundly unequal.
        </Para>

        <Para>
          School Connect Cambodia exists to dismantle these barriers. We are not merely building a
          website; we are forging a dynamic, digital ecosystem designed to empower students, educators,
          and communities. By bridging the gap between isolated classrooms and a universe of localized,
          high-quality information, we are laying the foundational infrastructure for a future built by,
          and for, an empowered Cambodian populace.
        </Para>

        <Rule />

        {/* ── Part I ──────────────────────────────────────────── */}
        <H2
          en="Part I: The Architecture of Opportunity — A Dual-Purpose Ecosystem"
          kh="ផ្នែកទី១: ស្ថាបត្យកម្មនៃឱកាស"
        />

        <Para>
          To achieve systemic change, a platform must be both practically useful in the immediate present
          and structurally robust for the future. School Connect Cambodia operates as a dual-purpose
          engine, integrating a functional digital resource map with a comprehensive, centralized
          education hub.
        </Para>

        <H3
          en="1. The Digital Resource Map: Connecting the Fragmented"
          kh="ផែនទីធនធានឌីជីថល"
        />

        <Para>
          In many developing educational landscapes, the primary obstacle is not an absolute lack of
          resources, but rather their fragmentation. A school in one province may possess discarded
          materials perfect for upcycling, while a classroom fifty kilometers away desperately needs
          those exact materials for an engineering project. Local NGOs, passionate educators, and
          community leaders often operate in silos, unaware of the collaborative potential lying just
          out of reach.
        </Para>

        <ul style={{ padding: 0, margin: "0 0 28px" }}>
          <BulletItem
            title="Visibility and Logistics"
            body="It visualizes the distribution of physical resources, technological assets, and human capital across regions."
          />
          <BulletItem
            title="Frugal Engineering and Utility"
            body="It acts as a tracking and coordination tool for sustainable, frugal engineering projects. When students design hand-washing stations, solar stills, or evaporative cooling systems from discarded bottles and local materials, the map allows these blueprints and material needs to be shared and replicated."
          />
          <BulletItem
            title="Community Synchronization"
            body="It transforms isolated schools into a unified network, allowing for the rapid deployment of resources where they are needed most, ensuring that no classroom is left behind due to a lack of visibility."
          />
        </ul>

        <H3
          en="2. The Centralized Education Hub: Democratizing Knowledge"
          kh="មជ្ឈមណ្ឌលអប់រំ"
        />

        <Para>
          While the map organizes the physical world, the Education Hub organizes the intellectual one.
          We are building a comprehensive, bilingual repository of STEM (Science, Technology,
          Engineering, and Mathematics) education.
        </Para>

        <ul style={{ padding: 0, margin: "0 0 28px" }}>
          <BulletItem
            title="Bilingual Accessibility"
            body="Knowledge trapped behind a language barrier is knowledge denied. By providing high-quality, complex scientific concepts — from interactive 3D anatomical models to the rules of fluid dynamics and the mechanics of the universe — in both Khmer and English, we ensure that students can learn in their native tongue while building the English proficiency required for the global economy."
          />
          <BulletItem
            title="A Living Syllabus"
            body="The platform is a living, breathing curriculum. It moves beyond rote memorization, offering interactive modules spanning physics, chemistry, biology, geology, and computer science. It is designed to be a self-directed learning environment where a student with a smartphone or a school computer can journey from the basic building blocks of matter to the complexities of artificial intelligence and web development."
          />
        </ul>

        <Rule />

        {/* ── Part II ─────────────────────────────────────────── */}
        <H2
          en="Part II: The Imperative of Scientific Literacy"
          kh="ផ្នែកទី២: ភាពចាំបាច់នៃការចេះដឹងវិទ្យាសាស្ត្រ"
        />

        <Para>
          The modern world is overwhelmingly complex, driven by technological forces and scientific
          principles that dictate the flow of global economies, the health of our environments, and
          the structure of our daily lives. In this context, scientific literacy is no longer a luxury
          reserved for the academic elite; it is a fundamental survival skill and the ultimate equalizer.
        </Para>

        <H3
          en="Navigating Reality Through Science"
          kh="ការពិនិត្យពិភពលោកតាមរបៀបវិទ្យាសាស្ត្រ"
        />

        <Para>
          Scientific literacy is not merely the accumulation of facts — it is the development of a
          specific, rigorous method of evaluating reality. It is the ability to look at the world, ask
          critical questions, test hypotheses, and adjust one's understanding based on empirical evidence.
        </Para>

        <ul style={{ padding: 0, margin: "0 0 28px" }}>
          <BulletItem
            title="Escaping Cognitive Traps"
            body="A scientifically literate mind is equipped to navigate the ambiguities of language and the traps of misinformation. By understanding how to separate observable facts from subjective interpretations, students learn to evaluate their environment with clarity and precision."
          />
          <BulletItem
            title="From Passive Consumers to Active Participants"
            body="Without a foundational understanding of the sciences, individuals are relegated to being passive consumers of technology and subject to the whims of environmental and economic shifts. With scientific literacy, they become active participants who can diagnose local problems — from agricultural challenges to water purification — and engineer localized solutions."
          />
        </ul>

        <H3
          en="The STEM Catalyst in Cambodia"
          kh="STEM នៅកម្ពុជា"
        />

        <Para>
          For Cambodia, a nation with a rich, historic legacy of architectural and societal engineering,
          the aggressive pursuit of STEM education is the key to unlocking a rapid, sustainable leap
          forward.
        </Para>

        <ul style={{ padding: 0, margin: "0 0 28px" }}>
          <BulletItem
            title="Addressing Local Challenges"
            body="A student who understands thermodynamics can design better cooling systems for their family's home. A student who understands chemistry and cellular biology can revolutionize local agricultural yields or public health outcomes."
          />
          <BulletItem
            title="Global Integration"
            body="STEM is the universal language of the modern global economy. Equipping Cambodian youth with advanced knowledge in physics, digital infrastructure, and mathematics ensures that they are not just prepared for the jobs of tomorrow, but that they are the ones creating them."
          />
        </ul>

        <Rule />

        {/* ── Part III ────────────────────────────────────────── */}
        <H2
          en="Part III: The Power of an Intelligent and Innovative Population"
          kh="ផ្នែកទី៣: ថាមពលនៃប្រជាជនឆ្លាតវៃ"
        />

        <Para>
          The ultimate goal of School Connect Cambodia extends far beyond the walls of any individual
          classroom. We are deeply invested in the macro-level transformation of society. The greatest
          natural resource a nation possesses is not pulled from the earth; it is the cultivated
          intellect of its people.
        </Para>

        <H3
          en="The Compounding Returns of Education"
          kh="ផលសន្សំនៃការអប់រំ"
        />

        <Para>
          When a society invests in the profound intellectual development of its youth, the returns are
          exponential. An intelligent population is inherently resilient. It adapts to global economic
          fluctuations, it innovates its way out of resource scarcity, and it builds robust, equitable
          social systems.
        </Para>

        <ul style={{ padding: 0, margin: "0 0 28px" }}>
          <BulletItem
            title="The Engine of Innovation"
            body="Innovation is born at the intersection of critical thinking, scientific knowledge, and the desire to solve localized problems. By providing the tools through School Connect Cambodia, we are fostering a generation of critical thinkers who view challenges not as insurmountable obstacles, but as engineering puzzles waiting to be solved."
          />
          <BulletItem
            title="Frugal Innovation as a Superpower"
            body="We champion the ethos of frugal engineering — the ability to create high-value, practical utility out of low-cost, readily available materials. An innovative population does not wait for expensive, imported solutions. They build them. They upcycle, they iterate, and they create sustainable technologies that are perfectly tailored to their specific environment."
          />
        </ul>

        <H3
          en="Building the Future, Today"
          kh="កសាងអនាគត ចាប់ពីថ្ងៃនេះ"
        />

        <Para>
          We stand on the precipice of remarkable technological leaps. Concepts like artificial
          intelligence, post-scarcity economic models, and advanced robotics are no longer the domain
          of science fiction; they are the impending reality. For a nation to thrive in this rapidly
          approaching future, it must possess a workforce and a citizenry that is highly adaptable,
          deeply educated, and relentlessly innovative. An educated population demands better
          infrastructure, creates sustainable economies, and fosters the civic participation necessary
          for a thriving democracy.
        </Para>

        <Rule />

        {/* ── Conclusion ──────────────────────────────────────── */}
        <H2
          en="Conclusion: Our Pledge to the Future"
          kh="សេចក្ដីសន្និដ្ឋាន: ការប្តេជ្ញាចិត្តរបស់យើង"
        />

        {/* Callout box */}
        <div style={{
          backgroundColor: NAVY,
          borderRadius: 12,
          padding: "32px 36px",
          marginTop: 20,
        }}>
          <p style={{
            color: "#e2e8f0",
            fontSize: 17,
            lineHeight: 1.9,
            margin: 0,
            fontStyle: "italic",
          }}>
            School Connect Cambodia is our commitment to this vision. We are building the digital roads,
            the virtual laboratories, and the collaborative networks required to unleash the boundless
            potential of the Cambodian student. We believe that when you give a student access to the
            knowledge of the universe, the tools to understand it, and the network to build upon it,
            you do not just change a life — you alter the trajectory of a nation. We are dedicated to
            the relentless pursuit of this vision, today and for generations to come.
          </p>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", color: MUTED, fontSize: 13, marginTop: 48 }}>
          {t(
            "School Connect Cambodia · Empowering the next generation",
            "School Connect Cambodia · ផ្ដល់អំណាចដល់មនុស្សជំនាន់ក្រោយ",
          )}
        </p>

      </article>
    </div>
  );
}

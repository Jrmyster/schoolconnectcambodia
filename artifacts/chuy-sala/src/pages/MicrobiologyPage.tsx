import { useState } from "react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Bug, Shield, CheckCircle2, XCircle, HelpCircle, Wind, Syringe, Heart, AlertCircle, Activity, Clock, RefreshCw } from "lucide-react";

export default function MicrobiologyPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className={`text-4xl font-bold text-slate-900 mb-6 ${kh ? 'font-khmer leading-relaxed' : 'font-display'}`}>
          {t("Virology and Bacteriology", "រោគវិទ្យា និង បាក់តេរីវិទ្យា")}
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Viruses */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 text-rose-600">
              <Bug className="w-8 h-8" />
              <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
                {t("Viruses", "វីរុស")}
              </h2>
            </div>
            <p className={`text-slate-600 leading-relaxed mb-4 ${kh ? 'font-khmer' : ''}`}>
              {t(
                "Viruses are tiny infectious agents that can only replicate inside the living cells of an organism. They consist of genetic material (DNA or RNA) enclosed in a protein coat. Because they lack the cellular machinery to reproduce on their own, they hijack the host's cells.",
                "វីរុសគឺជាភ្នាក់ងារចម្លងរោគតូចៗដែលអាចបង្កើតកូនចៅបានតែក្នុងកោសិការស់នៃភាវៈរស់ដទៃ។ ពួកវាមានផ្ទុកសម្ភារៈសេនេទិច (DNA ឬ RNA) គ្របដណ្តប់ដោយសំបកប្រូតេអ៊ីន។ ដោយសារវាគ្មានសមត្ថភាពបំបែកខ្លួនឯង វាតែងតែលួចប្រើប្រាស់កោសិការបស់អ្នកផ្ទុក។"
              )}
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <Wind className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className={`block text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                    {t("How they spread", "របៀបនៃការឆ្លង")}
                  </strong>
                  <span className={`text-sm text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("Through the air, physical contact, or contaminated surfaces.", "តាមរយៈខ្យល់ ការប៉ះពាល់ផ្ទាល់ ឬផ្ទៃដែលមានមេរោគ។")}
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <Syringe className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className={`block text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                    {t("Vaccines", "វ៉ាក់សាំង")}
                  </strong>
                  <span className={`text-sm text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("Train the immune system to recognize and fight the virus before it causes illness.", "បង្ហាត់ប្រព័ន្ធភាពស៊ាំឱ្យស្គាល់ និងប្រយុទ្ធប្រឆាំងវីរុសមុនពេលវាបង្កជំងឺ។")}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Bacteria */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 text-emerald-600">
              <Shield className="w-8 h-8" />
              <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
                {t("Bacteria", "បាក់តេរី")}
              </h2>
            </div>
            <p className={`text-slate-600 leading-relaxed mb-4 ${kh ? 'font-khmer' : ''}`}>
              {t(
                "Bacteria are single-celled microorganisms that exist almost everywhere on Earth. Unlike viruses, they are living organisms that can reproduce independently. While some cause disease, many are beneficial, such as those in our gut that help digest food.",
                "បាក់តេរីគឺជាមីក្រូសរីរាង្គមានកោសិកាតែមួយដែលមានស្ទើរតែគ្រប់ទីកន្លែងនៅលើផែនដី។ ខុសពីវីរុស បាក់តេរីគឺជាភាវៈរស់ដែលអាចបង្កើតកូនចៅដោយខ្លួនឯង។ ទោះបីជាបាក់តេរីខ្លះបង្កជំងឺក៏ដោយ ក៏បាក់តេរីជាច្រើនមានប្រយោជន៍ ដូចជាបាក់តេរីក្នុងពោះវៀនរបស់យើងដែលជួយរំលាយអាហារ។"
              )}
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <Heart className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className={`block text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                    {t("Good Gut Bacteria", "បាក់តេរីល្អក្នុងពោះវៀន")}
                  </strong>
                  <span className={`text-sm text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("Aid in digestion, produce vitamins, and protect against harmful microbes.", "ជួយក្នុងការរំលាយអាហារ បង្កើតវីតាមីន និងការពារប្រឆាំងនឹងមេរោគ។")}
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className={`block text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                    {t("Bad Pathogens", "មេរោគបង្កជំងឺ")}
                  </strong>
                  <span className={`text-sm text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("Can cause infections like strep throat or food poisoning, often treated with antibiotics.", "អាចបង្កការឆ្លងមេរោគដូចជាឈឺបំពង់ក ឬពុលអាហារ ដែលជាទូទៅព្យាបាលដោយថ្នាំអង់ទីប៊ីយោទិច។")}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Viral Anatomy & Multiplication Section */}
        <div className="mt-12 space-y-8">
          <div className="flex items-center gap-3 text-rose-600 mb-6">
            <Activity className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : 'font-display'}`}>
              {t("Viral Anatomy & Multiplication", "កាយវិភាគវិទ្យា និងការបំបែកខ្លួនរបស់វីរុស")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Anatomy */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100/50">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-rose-500" />
                <h3 className={`text-xl font-bold text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                  {t("Viral Anatomy (The Nucleocapsid)", "កាយវិភាគវិទ្យាវីរុស (Nucleocapsid)")}
                </h3>
              </div>
              <p className={`text-slate-600 mb-6 ${kh ? 'font-khmer leading-relaxed' : 'leading-relaxed'}`}>
                {t(
                  "All viruses have a Nucleic Acid Core (DNA or RNA, but never both) surrounded by a protein shell called a Capsid (made of repeating units called capsomeres).",
                  "វីរុសទាំងអស់មានស្នូលអាស៊ីតនុយក្លេអ៊ីក (DNA ឬ RNA ប៉ុន្តែមិនដែលមានទាំងពីរទេ) ហ៊ុំព័ទ្ធដោយសំបកប្រូតេអ៊ីនហៅថា Capsid (ផ្សំពីឯកតាដែលហៅថា capsomeres)។"
                )}
              </p>

              <h4 className={`font-bold text-slate-800 mb-3 ${kh ? 'font-khmer' : ''}`}>
                {t("Naked vs. Enveloped Viruses", "វីរុសអាក្រាត (Naked) និង វីរុសមានស្រោម (Enveloped)")}
              </h4>
              <p className={`text-slate-600 ${kh ? 'font-khmer leading-relaxed' : 'leading-relaxed'}`}>
                {t(
                  "Naked viruses only have a protein capsid (like the common cold). Enveloped viruses are surrounded by a lipid membrane stolen from the host cell (like Influenza or Ebola). They use 'spikes' to attach to host cells.",
                  "វីរុសអាក្រាតមានត្រឹមតែសំបកប្រូតេអ៊ីន (ដូចជាជំងឺផ្តាសាយ)។ វីរុសមានស្រោមត្រូវបានហ៊ុំព័ទ្ធដោយភ្នាសលីពីតដែលលួចពីកោសិកាអ្នកផ្ទុក (ដូចជាគ្រុនផ្តាសាយធំ ឬអេបូឡា)។ ពួកវាប្រើ 'បន្លា' (spikes) ដើម្បីភ្ជាប់ទៅនឹងកោសិកាអ្នកផ្ទុក។"
                )}
              </p>
            </div>

            {/* Infections */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100/50 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-rose-500" />
                <h3 className={`text-xl font-bold text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                  {t("Acute vs. Latent Infections", "ការឆ្លងមេរោគស្រួចស្រាវ និង ការបង្កប់")}
                </h3>
              </div>
              <div className="space-y-4 flex-1">
                <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                  <strong className={`block text-rose-800 mb-1 ${kh ? 'font-khmer' : ''}`}>
                    {t("Acute Infection", "ការឆ្លងមេរោគស្រួចស្រាវ (Acute)")}
                  </strong>
                  <span className={`text-sm text-slate-600 ${kh ? 'font-khmer leading-relaxed' : ''}`}>
                    {t("Resolves quickly as the immune system fights it off.", "អាចជាសះស្បើយយ៉ាងលឿននៅពេលដែលប្រព័ន្ធភាពស៊ាំប្រយុទ្ធជាមួយវា។")}
                  </span>
                </div>
                <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
                  <strong className={`block text-slate-800 mb-1 ${kh ? 'font-khmer' : ''}`}>
                    {t("Latent Infection", "ការឆ្លងមេរោគបង្កប់ (Latent)")}
                  </strong>
                  <span className={`text-sm text-slate-600 ${kh ? 'font-khmer leading-relaxed' : ''}`}>
                    {t(
                      "Occurs when the virus (like Herpes or Chickenpox/Shingles) hides dormant inside nerve cells for years and reactivates later.",
                      "កើតឡើងនៅពេលវីរុស (ដូចជាជំងឺអ៊ុតស្វាយ/រើម ឬ Herpes) លាក់ខ្លួនសម្ងំនៅក្នុងកោសិកាសរសៃប្រសាទរាប់ឆ្នាំ ហើយធ្វើសកម្មភាពឡើងវិញនៅពេលក្រោយ។"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Multiplication Steps */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100/50">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="w-6 h-6 text-rose-500" />
              <h3 className={`text-xl font-bold text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                {t("The 5 Steps of Animal Virus Multiplication", "ដំណាក់កាលទាំង ៥ នៃការបំបែកខ្លួនរបស់វីរុសសត្វ")}
              </h3>
            </div>
            
            <div className="grid sm:grid-cols-5 gap-4">
              {[
                {
                  step: 1,
                  titleEn: "Absorption",
                  titleKh: "ការស្រូបយក",
                  descEn: "Attachment to receptors",
                  descKh: "ការភ្ជាប់ទៅនឹង receptors",
                },
                {
                  step: 2,
                  titleEn: "Penetration/Uncoating",
                  titleKh: "ការជ្រៀតចូល/ដោះសំបក",
                  descEn: "Entering the cell and releasing DNA/RNA",
                  descKh: "ការចូលទៅក្នុងកោសិកា និងបញ្ចេញ DNA/RNA",
                },
                {
                  step: 3,
                  titleEn: "Synthesis",
                  titleKh: "ការសំយោគ",
                  descEn: "Hijacking the cell to make viral parts",
                  descKh: "ការលួចប្រើប្រាស់កោសិកាដើម្បីបង្កើតផ្នែករបស់វីរុស",
                },
                {
                  step: 4,
                  titleEn: "Assembly",
                  titleKh: "ការប្រមូលផ្តុំ",
                  descEn: "Putting the parts together",
                  descKh: "ការផ្គុំផ្នែកបញ្ចូលគ្នា",
                },
                {
                  step: 5,
                  titleEn: "Release",
                  titleKh: "ការបញ្ចេញ",
                  descEn: "Leaving via 'budding' or lysing the cell",
                  descKh: "ចេញតាម 'ការបែកពន្លក' ឬការបំបែកកោសិកា",
                },
              ].map((s) => (
                <div key={s.step} className="relative pt-4">
                  <div className="absolute top-8 left-8 w-[calc(100%-2rem)] h-[2px] bg-rose-100 hidden sm:block"></div>
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold relative z-10 mb-3 border-4 border-white shadow-sm mx-auto sm:mx-0">
                    {s.step}
                  </div>
                  <h4 className={`font-bold text-slate-800 mb-1 text-sm text-center sm:text-left ${kh ? 'font-khmer' : ''}`}>
                    {kh ? s.titleKh : s.titleEn}
                  </h4>
                  <p className={`text-xs text-slate-500 text-center sm:text-left ${kh ? 'font-khmer leading-relaxed' : 'leading-relaxed'}`}>
                    {kh ? s.descKh : s.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
            <h2 className={`text-xl font-bold text-slate-800 ${kh ? 'font-khmer' : 'font-display'}`}>
              {t("Key Differences", "ភាពខុសគ្នាសំខាន់ៗ")}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className={`p-4 border-b border-slate-100 font-semibold text-slate-700 ${kh ? 'font-khmer' : ''}`}>
                    {t("Feature", "លក្ខណៈពិសេស")}
                  </th>
                  <th className={`p-4 border-b border-slate-100 font-semibold text-rose-700 ${kh ? 'font-khmer' : ''}`}>
                    {t("Viruses", "វីរុស")}
                  </th>
                  <th className={`p-4 border-b border-slate-100 font-semibold text-emerald-700 ${kh ? 'font-khmer' : ''}`}>
                    {t("Bacteria", "បាក់តេរី")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className={`p-4 font-medium text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                    {t("Size", "ទំហំ")}
                  </td>
                  <td className={`p-4 text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("20 - 400 nanometers", "២០ - ៤០០ ណាណូម៉ែត្រ")}
                  </td>
                  <td className={`p-4 text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("1,000 - 5,000 nanometers", "១០០០ - ៥០០០ ណាណូម៉ែត្រ")}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className={`p-4 font-medium text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                    {t("Is it alive?", "តើវាមានជីវិតទេ?")}
                  </td>
                  <td className={`p-4 text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("No, requires a host", "ទេ ត្រូវការអ្នកផ្ទុក")}
                  </td>
                  <td className={`p-4 text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("Yes, independent organism", "បាទ/ចាស ភាវៈរស់ឯករាជ្យ")}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className={`p-4 font-medium text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                    {t("Treatable with Antibiotics?", "តើអាចព្យាបាលដោយថ្នាំអង់ទីប៊ីយោទិចទេ?")}
                  </td>
                  <td className={`p-4 text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("No", "ទេ")}
                  </td>
                  <td className={`p-4 text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("Yes", "បាទ/ចាស")}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className={`p-4 font-medium text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                    {t("Reproduction", "ការបង្កាត់ពូជ")}
                  </td>
                  <td className={`p-4 text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("Hijacks host cells to multiply", "លួចកោសិកាអ្នកផ្ទុកដើម្បីបង្កាត់ពូជ")}
                  </td>
                  <td className={`p-4 text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {t("Asexual reproduction (binary fission)", "ការបង្កាត់ពូជដោយគ្មានភេទ (ការពុះជាពីរ)")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <KnowledgeTest />

      </div>
    </div>
  );
}

function KnowledgeTest() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const questions = [
    {
      id: 1,
      qEn: "Viruses can reproduce independently without a host cell.",
      qKh: "វីរុសអាចបង្កើតកូនចៅដោយខ្លួនឯងដោយមិនត្រូវការកោសិកាអ្នកផ្ទុក។",
      ans: false,
      expEn: "False. Viruses lack the cellular machinery to reproduce on their own and must hijack a host cell.",
      expKh: "ខុស។ វីរុសគ្មានសមត្ថភាពបំបែកខ្លួនឯងទេ ហើយវាតែងតែលួចប្រើប្រាស់កោសិការបស់អ្នកផ្ទុក។",
    },
    {
      id: 2,
      qEn: "Bacteria are single-celled organisms that exist almost everywhere.",
      qKh: "បាក់តេរីគឺជាមីក្រូសរីរាង្គមានកោសិកាតែមួយដែលមានស្ទើរតែគ្រប់ទីកន្លែង។",
      ans: true,
      expEn: "True. They are independent living organisms that can reproduce on their own.",
      expKh: "ត្រូវ។ ពួកវាគឺជាភាវៈរស់ឯករាជ្យដែលអាចបង្កើតកូនចៅដោយខ្លួនឯង។",
    },
    {
      id: 3,
      qEn: "Antibiotics are effective for treating viral infections.",
      qKh: "ថ្នាំអង់ទីប៊ីយោទិចមានប្រសិទ្ធភាពក្នុងការព្យាបាលជំងឺបង្កដោយវីរុស។",
      ans: false,
      expEn: "False. Antibiotics only target bacteria, not viruses.",
      expKh: "ខុស។ ថ្នាំអង់ទីប៊ីយោទិចសម្លាប់តែបាក់តេរីប៉ុណ្ណោះ មិនមែនវីរុសទេ។",
    }
  ];

  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-indigo-600" />
        <h2 className={`text-xl font-bold text-slate-800 ${kh ? 'font-khmer' : 'font-display'}`}>
          {t("Test Your Knowledge", "សាកល្បងចំណេះដឹងរបស់អ្នក")}
        </h2>
      </div>
      <div className="p-6 space-y-6">
        {questions.map((q) => {
          const userAns = answers[q.id];
          const isAnswered = userAns !== undefined;
          const isCorrect = userAns === q.ans;

          return (
            <div key={q.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
              <p className={`font-medium text-slate-800 mb-4 ${kh ? 'font-khmer' : ''}`}>
                {kh ? q.qKh : q.qEn}
              </p>
              <div className="flex gap-3 mb-3">
                <button
                  disabled={isAnswered}
                  onClick={() => setAnswers(prev => ({ ...prev, [q.id]: true }))}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isAnswered
                      ? q.ans === true
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : userAns === true
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-slate-100 text-slate-400'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  } ${kh ? 'font-khmer' : ''}`}
                >
                  {t("True", "ត្រូវ")}
                </button>
                <button
                  disabled={isAnswered}
                  onClick={() => setAnswers(prev => ({ ...prev, [q.id]: false }))}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isAnswered
                      ? q.ans === false
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : userAns === false
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-slate-100 text-slate-400'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  } ${kh ? 'font-khmer' : ''}`}
                >
                  {t("False", "ខុស")}
                </button>
              </div>
              
              {isAnswered && (
                <div className={`mt-3 flex items-start gap-2 p-3 rounded-lg ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm leading-relaxed ${kh ? 'font-khmer' : ''}`}>
                    {kh ? q.expKh : q.expEn}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

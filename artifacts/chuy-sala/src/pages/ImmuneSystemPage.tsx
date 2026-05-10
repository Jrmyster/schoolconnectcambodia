import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Shield, Swords, Activity, Syringe, Target, Crosshair, Search, Beaker, Lightbulb, Biohazard, Thermometer, UserSquare, Baby } from "lucide-react";

export default function ImmuneSystemPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className={`text-4xl font-bold text-slate-900 mb-6 ${kh ? 'font-khmer leading-relaxed' : 'font-display'}`}>
          {t("The Immune System", "ប្រព័ន្ធភាពស៊ាំ")}
        </h1>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <Shield className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Introduction", "សេចក្តីផ្តើម")}
            </h2>
          </div>
          <p className={`text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
            {t(
              "The immune system is the body's ultimate defense network. It is a complex system of cells, tissues, and organs that work together to defend the body against foreign invaders like bacteria, viruses, parasites, and fungi.",
              "ប្រព័ន្ធភាពស៊ាំគឺជាបណ្តាញការពារដ៏សំខាន់បំផុតរបស់រាងកាយ។ វាគឺជាប្រព័ន្ធដ៏ស្មុគស្មាញនៃកោសិកា ជាលិកា និងសរីរាង្គដែលធ្វើការជាមួយគ្នាដើម្បីការពាររាងកាយប្រឆាំងនឹងមេរោគពីខាងក្រៅ ដូចជាបាក់តេរី វីរុស ប៉ារ៉ាស៊ីត និងផ្សិត។"
            )}
          </p>
        </div>

        {/* Innate vs. Adaptive Immunity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-rose-600">
            <Swords className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Innate vs. Adaptive Immunity", "ភាពស៊ាំពីកំណើត ទល់នឹង ភាពស៊ាំសម្របខ្លួន")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
              <strong className={`block text-lg text-rose-900 mb-2 ${kh ? 'font-khmer' : ''}`}>
                {t("Innate Immunity", "ភាពស៊ាំពីកំណើត")}
              </strong>
              <p className={`text-sm text-rose-800 ${kh ? 'font-khmer' : ''}`}>
                {t("The body's fast, general frontline defense. It includes physical barriers like the skin and mucus, as well as general white blood cells (like macrophages) that attack anything they don't recognize as 'self'. It responds immediately but has no memory.", "ការការពារខ្សែត្រៀមជួរមុខដ៏លឿន និងទូទៅរបស់រាងកាយ។ រួមមានរបាំងរូបវន្តដូចជាស្បែក និងទឹករំអិល ក៏ដូចជាកោសិកាឈាមសទូទៅ (ដូចជាម៉ាក្រូហ្វាស) ដែលវាយប្រហារអ្វីៗដែលវាមិនស្គាល់ថាជារបស់រាងកាយ។ វាឆ្លើយតបភ្លាមៗ ប៉ុន្តែគ្មានការចងចាំទេ។")}
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <strong className={`block text-lg text-blue-900 mb-2 ${kh ? 'font-khmer' : ''}`}>
                {t("Adaptive Immunity", "ភាពស៊ាំសម្របខ្លួន")}
              </strong>
              <p className={`text-sm text-blue-800 ${kh ? 'font-khmer' : ''}`}>
                {t("A slower, highly targeted defense system. It uses specialized T-cells and B-cells to analyze specific pathogens, create customized weapons against them, and remember them for the future, ensuring you rarely get the exact same illness twice.", "ប្រព័ន្ធការពារដែលយឺតជាង និងមានគោលដៅច្បាស់លាស់។ វាប្រើប្រាស់កោសិកា T-cell និង B-cell ពិសេសដើម្បីវិភាគមេរោគ បង្កើតអាវុធជាក់លាក់ប្រឆាំងនឹងពួកវា និងចងចាំពួកវាសម្រាប់ថ្ងៃអនាគត ដែលធ្វើឱ្យអ្នកកម្រនឹងកើតជំងឺដដែលពីរដង។")}
              </p>
            </div>
          </div>
        </div>

        {/* The Key Defenders */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-indigo-600" />
            <h2 className={`text-2xl font-bold text-slate-800 ${kh ? 'font-khmer' : 'font-display'}`}>
              {t("The Key Defenders", "អ្នកការពារសំខាន់ៗ")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                titleEn: "Macrophages",
                titleKh: "ម៉ាក្រូហ្វាស",
                icon: <Search className="w-6 h-6 text-orange-500" />,
                descEn: "Giant cells that 'eat' and digest invading microbes. They also leave behind parts of the microbes (antigens) for the rest of the immune system to recognize.",
                descKh: "កោសិកាយក្សដែល 'ស៊ី' និងរំលាយមេរោគដែលចូលមក។ ពួកវាក៏បន្សល់ទុកផ្នែកខ្លះនៃមេរោគ (អង់ទីហ្សែន) សម្រាប់ឱ្យប្រព័ន្ធភាពស៊ាំផ្សេងទៀតស្គាល់ផងដែរ។"
              },
              {
                titleEn: "T-Cells",
                titleKh: "កោសិកា T",
                icon: <Target className="w-6 h-6 text-cyan-500" />,
                descEn: "'Killer' T-cells directly attack and destroy infected cells, while 'Helper' T-cells act like generals, coordinating the entire immune response.",
                descKh: "កោសិកា T 'ឃាតករ' វាយប្រហារ និងបំផ្លាញកោសិកាដែលឆ្លងមេរោគដោយផ្ទាល់ ចំណែកឯកោសិកា T 'ជំនួយ' ដើរតួជាមេទ័ពដែលសម្របសម្រួលការឆ្លើយតបនៃប្រព័ន្ធភាពស៊ាំទាំងមូល។"
              },
              {
                titleEn: "B-Cells",
                titleKh: "កោសិកា B",
                icon: <Beaker className="w-6 h-6 text-violet-500" />,
                descEn: "The body's weapon factories. When triggered, they produce millions of customized proteins called antibodies to neutralize specific threats.",
                descKh: "រោងចក្រផលិតអាវុធរបស់រាងកាយ។ នៅពេលត្រូវបានដាស់ ពួកវាផលិតប្រូតេអ៊ីនពិសេសរាប់លានដែលហៅថា អង់ទីគ័រ ដើម្បីបន្សាបការគំរាមកំហែងជាក់លាក់។"
              },
              {
                titleEn: "Antibodies",
                titleKh: "អង់ទីគ័រ",
                icon: <Crosshair className="w-6 h-6 text-rose-500" />,
                descEn: "Y-shaped proteins that lock onto the unique markers (antigens) of invaders, disabling them or marking them for destruction by macrophages.",
                descKh: "ប្រូតេអ៊ីនរាងជាអក្សរ Y ដែលភ្ជាប់ទៅនឹងសញ្ញាសម្គាល់តែមួយគត់ (អង់ទីហ្សែន) របស់មេរោគ ដោយធ្វើឱ្យពួកវាលែងដំណើរការ ឬសម្គាល់ពួកវាសម្រាប់ការបំផ្លាញដោយម៉ាក្រូហ្វាស។"
              }
            ].map((defender, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex gap-4">
                <div className="shrink-0 mt-1">{defender.icon}</div>
                <div>
                  <strong className={`block text-lg text-slate-800 mb-1 ${kh ? 'font-khmer' : ''}`}>
                    {kh ? defender.titleKh : defender.titleEn}
                  </strong>
                  <p className={`text-sm text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
                    {kh ? defender.descKh : defender.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How Vaccines Work */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <Syringe className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("How Vaccines Work", "របៀបដែលវ៉ាក់សាំងដំណើរការ")}
            </h2>
          </div>
          <p className={`text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
            {t(
              "Vaccines leverage 'immunological memory'. They safely introduce a harmless piece of a pathogen (like a dead virus or an mRNA instruction) into the body. The adaptive immune system creates T-cells and B-cells to fight it off, generating memory cells. If the real, dangerous pathogen ever enters the body later, these memory cells recognize it instantly and destroy it before it can cause illness.",
              "វ៉ាក់សាំងប្រើប្រាស់ 'ការចងចាំនៃប្រព័ន្ធភាពស៊ាំ'។ ពួកវាបញ្ចូលផ្នែកដែលគ្មានគ្រោះថ្នាក់នៃមេរោគ (ដូចជាវីរុសងាប់ ឬការណែនាំ mRNA) ទៅក្នុងរាងកាយដោយសុវត្ថិភាព។ ប្រព័ន្ធភាពស៊ាំសម្របខ្លួនបង្កើតកោសិកា T និងកោសិកា B ដើម្បីប្រយុទ្ធប្រឆាំងនឹងវា ដោយបង្កើតកោសិកាចងចាំ។ ប្រសិនបើមេរោគពិតប្រាកដដ៏គ្រោះថ្នាក់ចូលក្នុងរាងកាយនៅពេលក្រោយ កោសិកាចងចាំទាំងនេះនឹងស្គាល់វាភ្លាមៗ ហើយបំផ្លាញវាមុនពេលវាអាចបង្កជំងឺ។"
            )}
          </p>
        </div>

        {/* Fascinating Facts */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6 text-amber-500">
            <Lightbulb className="w-8 h-8" />
            <h2 className={`text-2xl font-bold text-slate-800 ${kh ? 'font-khmer' : 'font-display'}`}>
              {t("Fascinating Facts & Behaviors", "ការពិតគួរឱ្យចាប់អារម្មណ៍ និងអាកប្បកិរិយា")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                titleEn: "Gut Health Focus",
                titleKh: "ការផ្តោតលើសុខភាពពោះវៀន",
                icon: <Activity className="w-5 h-5 text-amber-600" />,
                descEn: "A massive proportion (70%–80%) of the immune system is located in the gut.",
                descKh: "សមាមាត្រដ៏ធំ (៧០%–៨០%) នៃប្រព័ន្ធភាពស៊ាំមានទីតាំងនៅក្នុងពោះវៀន។"
              },
              {
                titleEn: "Self vs. Non-Self",
                titleKh: "របស់ខ្លួន ទល់នឹង មិនមែនរបស់ខ្លួន",
                icon: <UserSquare className="w-5 h-5 text-amber-600" />,
                descEn: "It identifies and attacks foreign invaders while protecting the body's own healthy cells.",
                descKh: "វាកំណត់អត្តសញ្ញាណ និងវាយប្រហារអ្នកឈ្លានពានពីខាងក្រៅ ខណៈពេលដែលការពារកោសិកាដែលមានសុខភាពល្អរបស់រាងកាយ។"
              },
              {
                titleEn: "Fever is Defense",
                titleKh: "គ្រុនក្តៅគឺជាការការពារ",
                icon: <Thermometer className="w-5 h-5 text-amber-600" />,
                descEn: "A fever is a sign your immune system is working to create an environment too hot for pathogens to survive.",
                descKh: "គ្រុនក្តៅគឺជាសញ្ញាថាប្រព័ន្ធភាពស៊ាំរបស់អ្នកកំពុងធ្វើការដើម្បីបង្កើតបរិយាកាសក្តៅពេកដែលធ្វើអោយមេរោគមិនអាចរស់បាន។"
              },
              {
                titleEn: "Unique Fingerprint",
                titleKh: "ស្នាមម្រាមដៃតែមួយគត់",
                icon: <Search className="w-5 h-5 text-amber-600" />,
                descEn: "Due to personal exposure history, every person's immune system is unique.",
                descKh: "ដោយសារប្រវត្តិប្រឈមផ្ទាល់ខ្លួន ប្រព័ន្ធភាពស៊ាំរបស់មនុស្សម្នាក់ៗគឺតែមួយគត់។"
              },
              {
                titleEn: "Active Defense vs Cancer",
                titleKh: "ការការពារសកម្មប្រឆាំងនឹងជំងឺមហារីក",
                icon: <Biohazard className="w-5 h-5 text-amber-600" />,
                descEn: "It doesn't just fight bugs; it also scans for and destroys abnormal cells, such as cancer cells.",
                descKh: "វាមិនត្រឹមតែប្រយុទ្ធប្រឆាំងនឹងមេរោគប៉ុណ្ណោះទេ វាក៏ស្កែនរក និងបំផ្លាញកោសិកាមិនប្រក្រតី ដូចជាកោសិកាមហារីកផងដែរ។"
              },
              {
                titleEn: "Passive Immunity",
                titleKh: "ភាពស៊ាំអសកម្ម",
                icon: <Baby className="w-5 h-5 text-amber-600" />,
                descEn: "Babies receive temporary immunity from their mothers through antibodies in breast milk.",
                descKh: "ទារកទទួលបានភាពស៊ាំបណ្តោះអាសន្នពីម្តាយរបស់ពួកគេតាមរយៈអង់ទីគ័រនៅក្នុងទឹកដោះម្តាយ។"
              }
            ].map((fact, i) => (
              <div key={i} className="flex gap-3 bg-amber-50/50 rounded-xl p-4 border border-amber-100">
                <div className="shrink-0 mt-0.5">{fact.icon}</div>
                <div>
                  <strong className={`block text-slate-800 text-sm mb-1 ${kh ? 'font-khmer' : ''}`}>
                    {kh ? fact.titleKh : fact.titleEn}
                  </strong>
                  <p className={`text-sm text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                    {kh ? fact.descKh : fact.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

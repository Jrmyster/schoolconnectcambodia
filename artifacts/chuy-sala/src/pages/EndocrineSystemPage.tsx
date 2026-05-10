import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Activity, Brain, RefreshCw, Layers, Droplets, Zap, Heart, ShieldAlert, Pill, Stethoscope } from "lucide-react";

export default function EndocrineSystemPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className={`text-4xl font-bold text-slate-900 mb-6 ${kh ? 'font-khmer leading-relaxed' : 'font-display'}`}>
          {t("The Endocrine System", "ប្រព័ន្ធអង់ដូគ្រីន")}
        </h1>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-violet-600">
            <Activity className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Introduction", "សេចក្តីផ្តើម")}
            </h2>
          </div>
          <p className={`text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
            {t(
              "The endocrine system is a complex network of glands and organs that produce and release hormones—chemical messengers—directly into the bloodstream to regulate essential bodily functions. Unlike the nervous system, which uses rapid electrical signals, the endocrine system uses these chemical signals for slower, longer-lasting effects throughout the entire body.",
              "ប្រព័ន្ធអង់ដូគ្រីនគឺជាបណ្តាញដ៏ស្មុគស្មាញនៃក្រពេញ និងសរីរាង្គដែលផលិត និងបញ្ចេញអរម៉ូន—សារធាតុគីមីនាំសារ—ដោយផ្ទាល់ទៅក្នុងចរន្តឈាមដើម្បីគ្រប់គ្រងមុខងារសំខាន់ៗរបស់រាងកាយ។ ខុសពីប្រព័ន្ធសរសៃប្រសាទ ដែលប្រើសញ្ញាអគ្គិសនីលឿន ប្រព័ន្ធអង់ដូគ្រីនប្រើសញ្ញាគីមីទាំងនេះសម្រាប់ឥទ្ធិពលយឺត និងយូរអង្វែងពាសពេញរាងកាយ។"
            )}
          </p>
        </div>

        {/* Key Functions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <Zap className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Key Functions", "មុខងារសំខាន់ៗ")}
            </h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4">
            <li className="flex gap-3 bg-emerald-50 rounded-xl p-4">
              <RefreshCw className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <strong className={`block text-emerald-900 ${kh ? 'font-khmer' : ''}`}>{t("Homeostasis", "ការរក្សាតុល្យភាព (Homeostasis)")}</strong>
                <span className={`text-sm text-emerald-800 ${kh ? 'font-khmer' : ''}`}>{t("Maintains internal balance, like blood sugar and temperature.", "រក្សាតុល្យភាពខាងក្នុង ដូចជាកម្រិតជាតិស្ករក្នុងឈាម និងសីតុណ្ហភាព។")}</span>
              </div>
            </li>
            <li className="flex gap-3 bg-emerald-50 rounded-xl p-4">
              <Activity className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <strong className={`block text-emerald-900 ${kh ? 'font-khmer' : ''}`}>{t("Metabolism", "ការរំលាយអាហារ")}</strong>
                <span className={`text-sm text-emerald-800 ${kh ? 'font-khmer' : ''}`}>{t("Controls how the body turns food into energy.", "គ្រប់គ្រងរបៀបដែលរាងកាយបំប្លែងអាហារទៅជាថាមពល។")}</span>
              </div>
            </li>
            <li className="flex gap-3 bg-emerald-50 rounded-xl p-4">
              <Layers className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <strong className={`block text-emerald-900 ${kh ? 'font-khmer' : ''}`}>{t("Growth & Development", "ការលូតលាស់ និងការអភិវឌ្ឍ")}</strong>
                <span className={`text-sm text-emerald-800 ${kh ? 'font-khmer' : ''}`}>{t("Directs the physical growth from childhood into adulthood.", "ដឹកនាំការលូតលាស់រាងកាយពីកុមារភាពរហូតដល់ពេញវ័យ។")}</span>
              </div>
            </li>
            <li className="flex gap-3 bg-emerald-50 rounded-xl p-4">
              <Heart className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <strong className={`block text-emerald-900 ${kh ? 'font-khmer' : ''}`}>{t("Reproduction", "ការបន្តពូជ")}</strong>
                <span className={`text-sm text-emerald-800 ${kh ? 'font-khmer' : ''}`}>{t("Regulates sexual function and reproductive processes.", "គ្រប់គ្រងមុខងារផ្លូវភេទ និងដំណើរការបន្តពូជ។")}</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Major Glands - Grid of Cards */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-indigo-600" />
            <h2 className={`text-2xl font-bold text-slate-800 ${kh ? 'font-khmer' : 'font-display'}`}>
              {t("Major Glands", "ក្រពេញសំខាន់ៗ")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                glandEn: "Hypothalamus",
                glandKh: "អ៊ីប៉ូតាឡាមូស",
                hormoneEn: "Releasing Hormones",
                hormoneKh: "អរម៉ូនបញ្ចេញ",
                descEn: "Links the nervous system to the endocrine system via the pituitary gland.",
                descKh: "ភ្ជាប់ប្រព័ន្ធសរសៃប្រសាទទៅនឹងប្រព័ន្ធអង់ដូគ្រីនតាមរយៈក្រពេញភីតូរីស។"
              },
              {
                glandEn: "Pituitary Gland",
                glandKh: "ក្រពេញភីតូរីស",
                hormoneEn: "Growth Hormone (GH)",
                hormoneKh: "អរម៉ូនលូតលាស់ (GH)",
                descEn: "Known as the 'master gland' because it directs other glands to release their hormones.",
                descKh: "ត្រូវបានគេស្គាល់ថាជា 'មេក្រពេញ' ព្រោះវាបញ្ជាក្រពេញដទៃទៀតឱ្យបញ្ចេញអរម៉ូនរបស់ពួកគេ។"
              },
              {
                glandEn: "Thyroid Gland",
                glandKh: "ក្រពេញទីរ៉ូអ៊ីត",
                hormoneEn: "Thyroxine (T4)",
                hormoneKh: "ទីរ៉ុកស៊ីន (T4)",
                descEn: "Regulates the body's metabolic rate, heart and digestive function.",
                descKh: "គ្រប់គ្រងអត្រារំលាយអាហារ មុខងារបេះដូង និងប្រព័ន្ធរំលាយអាហារ។"
              },
              {
                glandEn: "Adrenal Glands",
                glandKh: "ក្រពេញលើតម្រងនោម",
                hormoneEn: "Cortisol, Adrenaline",
                hormoneKh: "ករទីសូល, អាដ្រេណាលីន",
                descEn: "Produces stress hormones that trigger the 'fight or flight' response.",
                descKh: "ផលិតអរម៉ូនតានតឹងដែលបង្កឱ្យមានប្រតិកម្ម 'ប្រយុទ្ធ ឬរត់'។"
              },
              {
                glandEn: "Pancreas",
                glandKh: "លំពែង",
                hormoneEn: "Insulin, Glucagon",
                hormoneKh: "អាំងស៊ុយលីន, គ្លុយកាកុង",
                descEn: "Maintains healthy blood sugar levels, preventing diabetes.",
                descKh: "រក្សាកម្រិតជាតិស្ករក្នុងឈាមឱ្យមានសុខភាពល្អ ការពារជំងឺទឹកនោមផ្អែម។"
              },
              {
                glandEn: "Pineal Gland",
                glandKh: "ក្រពេញភីណេអាល",
                hormoneEn: "Melatonin",
                hormoneKh: "មេឡាតូនីន",
                descEn: "Regulates sleep-wake cycles (circadian rhythm) based on light exposure.",
                descKh: "គ្រប់គ្រងវដ្តនៃការគេង និងភ្ញាក់ (ចង្វាក់សៀកាឌៀន) ដោយផ្អែកលើការប៉ះពាល់នឹងពន្លឺ។"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
                <h3 className={`text-xl font-bold text-slate-800 mb-2 ${kh ? 'font-khmer' : ''}`}>
                  {kh ? item.glandKh : item.glandEn}
                </h3>
                <p className={`text-sm text-indigo-600 font-semibold mb-3 ${kh ? 'font-khmer' : ''}`}>
                  {kh ? item.hormoneKh : item.hormoneEn}
                </p>
                <p className={`text-slate-600 ${kh ? 'font-khmer' : ''}`}>
                  {kh ? item.descKh : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How Hormones Work */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <Droplets className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("How Hormones Work", "របៀបដែលអរម៉ូនដំណើរការ")}
            </h2>
          </div>
          <p className={`text-slate-600 leading-relaxed mb-6 ${kh ? 'font-khmer' : ''}`}>
            {t(
              "Hormones act like 'keys' that float through the bloodstream until they find target cells with the matching 'locks' (receptors). They generally operate in two main ways:",
              "អរម៉ូនដើរតួដូចជា 'កូនសោ' ដែលអណ្តែតតាមចរន្តឈាមរហូតដល់ពួកវារកឃើញកោសិកាគោលដៅដែលមាន 'សោ' (កន្លែងទទួល) ត្រូវគ្នា។ ជាទូទៅពួកវាដំណើរការតាមពីរវិធីចម្បង៖"
            )}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-400 pl-4">
              <strong className={`block text-lg text-slate-800 mb-2 ${kh ? 'font-khmer' : ''}`}>
                {t("1. Steroid Hormones", "១. អរម៉ូនស្តេរ៉ូអ៊ីត")}
              </strong>
              <p className={`text-slate-600 text-sm ${kh ? 'font-khmer' : ''}`}>
                {t("Being lipid-soluble (fat-soluble), they can easily pass directly through the cell membrane and bind to receptors inside the nucleus, directly altering the cell's DNA expression.", "ដោយសារពួកវាអាចរលាយក្នុងខ្លាញ់ ពួកវាអាចឆ្លងកាត់ភ្នាសកោសិកាដោយផ្ទាល់យ៉ាងងាយស្រួល ហើយភ្ជាប់ទៅនឹងកន្លែងទទួលនៅខាងក្នុងស្នូល ដោយផ្លាស់ប្តូរការបញ្ចេញ DNA របស់កោសិកាដោយផ្ទាល់។")}
              </p>
            </div>
            <div className="border-l-4 border-cyan-400 pl-4">
              <strong className={`block text-lg text-slate-800 mb-2 ${kh ? 'font-khmer' : ''}`}>
                {t("2. Non-Steroid Hormones", "២. អរម៉ូនមិនមែនស្តេរ៉ូអ៊ីត")}
              </strong>
              <p className={`text-slate-600 text-sm ${kh ? 'font-khmer' : ''}`}>
                {t("Being water-soluble, they cannot enter the cell. Instead, they bind to receptors on the outer cell surface, which triggers a chain reaction of 'second messengers' inside the cell.", "ដោយសារពួកវាអាចរលាយក្នុងទឹក ពួកវាមិនអាចចូលក្នុងកោសិកាបានទេ។ ផ្ទុយទៅវិញ ពួកវាភ្ជាប់ទៅនឹងកន្លែងទទួលនៅលើផ្ទៃកោសិកាខាងក្រៅ ដែលបង្កឱ្យមានប្រតិកម្មខ្សែសង្វាក់នៃ 'សារបន្ទាប់បន្សំ' នៅខាងក្នុងកោសិកា។")}
              </p>
            </div>
          </div>
        </div>

        {/* Common Endocrine Disorders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4 text-rose-600">
            <ShieldAlert className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Common Endocrine Disorders", "ជំងឺប្រព័ន្ធអង់ដូគ្រីនទូទៅ")}
            </h2>
          </div>
          <p className={`text-slate-600 leading-relaxed mb-6 ${kh ? 'font-khmer' : ''}`}>
            {t(
              "When a gland produces too much (hyper) or too little (hypo) of a hormone, it causes an imbalance that can lead to disease.",
              "នៅពេលដែលក្រពេញផលិតអរម៉ូនច្រើនពេក (hyper) ឬតិចពេក (hypo) វាបណ្តាលឱ្យមានអតុល្យភាពដែលអាចឈានដល់ជំងឺ។"
            )}
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <Stethoscope className="w-6 h-6 text-rose-500 shrink-0 mt-1" />
              <div>
                <strong className={`block text-slate-800 text-lg ${kh ? 'font-khmer' : ''}`}>
                  {t("Diabetes Mellitus", "ជំងឺទឹកនោមផ្អែម")}
                </strong>
                <p className={`text-slate-600 text-sm ${kh ? 'font-khmer' : ''}`}>
                  {t("Occurs when the pancreas doesn't produce enough insulin (Type 1) or the body becomes resistant to it (Type 2), leading to high blood sugar levels.", "កើតឡើងនៅពេលដែលលំពែងមិនផលិតអាំងស៊ុយលីនគ្រប់គ្រាន់ (ប្រភេទទី១) ឬរាងកាយក្លាយជាស៊ាំនឹងវា (ប្រភេទទី២) ដែលបណ្តាលឱ្យមានកម្រិតជាតិស្ករក្នុងឈាមខ្ពស់។")}
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <Pill className="w-6 h-6 text-rose-500 shrink-0 mt-1" />
              <div>
                <strong className={`block text-slate-800 text-lg ${kh ? 'font-khmer' : ''}`}>
                  {t("Hyperthyroidism & Hypothyroidism", "ជំងឺក្រពេញទីរ៉ូអ៊ីត (ឡើង និងចុះ)")}
                </strong>
                <p className={`text-slate-600 text-sm ${kh ? 'font-khmer' : ''}`}>
                  {t("Hyperthyroidism happens when the thyroid makes too much hormone, causing weight loss and rapid heartbeat. Hypothyroidism is the opposite, causing fatigue and weight gain.", "ជំងឺក្រពេញទីរ៉ូអ៊ីតឡើង (Hyperthyroidism) កើតឡើងនៅពេលក្រពេញទីរ៉ូអ៊ីតផលិតអរម៉ូនច្រើនពេក បណ្តាលឱ្យស្រកទម្ងន់ និងបេះដូងលោតញាប់។ ជំងឺក្រពេញទីរ៉ូអ៊ីតចុះ (Hypothyroidism) គឺផ្ទុយពីនេះ ដែលបណ្តាលឱ្យអស់កម្លាំង និងឡើងទម្ងន់។")}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

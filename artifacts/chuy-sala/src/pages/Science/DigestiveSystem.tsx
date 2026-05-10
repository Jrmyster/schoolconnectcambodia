import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Apple, Activity, Droplet, List, Maximize, ArrowRight, BookOpen } from "lucide-react";

export default function DigestiveSystem() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-orange-500/10 mb-6">
            <Apple className="w-12 h-12 text-orange-400" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${k ? "font-khmer leading-relaxed" : "font-display"}`}>
            {t("The Digestive System", "ប្រព័ន្ធរំលាយអាហារ")}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            {t(
              "The body's molecular disassembly plant. Its primary goal is to break down food into molecular fragments that cells can absorb and use for energy production.",
              "រោងចក្របំបែកម៉ូលេគុលរបស់រាងកាយ។ គោលដៅចម្បងរបស់វាគឺបំបែកអាហារទៅជាបំណែកម៉ូលេគុល ដែលកោសិកាអាចស្រូបយក និងប្រើប្រាស់សម្រាប់ផលិតថាមពល។"
            )}
          </p>
        </div>

        {/* The Two Main Divisions */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <List className="w-6 h-6 text-emerald-400" />
            <h2 className={`text-2xl font-semibold text-white ${k ? "font-khmer" : ""}`}>
              {t("The Two Main Divisions", "ផ្នែកធំៗទាំងពីរ")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className={`text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2 ${k ? "font-khmer" : ""}`}>
                <Maximize className="w-5 h-5" />
                {t("1. The GI Tract (Alimentary Canal)", "១. បំពង់រំលាយអាហារ (GI Tract)")}
              </h3>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                {t(
                  "The continuous tube starting at the mouth and ending at the anus.",
                  "បំពង់បន្តបន្ទាប់ដែលចាប់ផ្តើមពីមាត់ និងបញ្ចប់នៅរន្ធគូថ។"
                )}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span>Mouth</span> <ArrowRight className="w-3 h-3" />
                <span>Pharynx</span> <ArrowRight className="w-3 h-3" />
                <span>Esophagus</span> <ArrowRight className="w-3 h-3" />
                <span>Stomach</span> <ArrowRight className="w-3 h-3" />
                <span>Small Intestine</span> <ArrowRight className="w-3 h-3" />
                <span>Large Intestine</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className={`text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2 ${k ? "font-khmer" : ""}`}>
                <Droplet className="w-5 h-5" />
                {t("2. Accessory Organs", "២. សរីរាង្គជំនួយ")}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {t(
                  "Organs that help digestion but are not part of the main tube.",
                  "សរីរាង្គដែលជួយដល់ការរំលាយអាហារ ប៉ុន្តែមិនមែនជាផ្នែកនៃបំពង់ចម្បងទេ។"
                )}
              </p>
              <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{t("Teeth", "ធ្មេញ")}</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{t("Tongue", "អណ្តាត")}</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{t("Salivary Glands", "ក្រពេញទឹកមាត់")}</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{t("Liver", "ថ្លើម")}</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{t("Gallbladder", "ថង់ប្រមាត់")}</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{t("Pancreas", "លំពែង")}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The 6 Essential Steps */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-orange-400" />
            <h2 className={`text-2xl font-semibold text-white ${k ? "font-khmer" : ""}`}>
              {t("The 6 Essential Steps of Digestion", "ជំហានសំខាន់ៗទាំង ៦ នៃការរំលាយអាហារ")}
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                step: "1",
                titleEn: "Ingestion",
                titleKh: "ការទទួលទានអាហារ",
                descEn: "Taking food into the mouth to begin the journey.",
                descKh: "ការយកអាហារចូលក្នុងមាត់ដើម្បីចាប់ផ្តើមដំណើរការ។",
                icon: <Apple className="w-5 h-5" />
              },
              {
                step: "2",
                titleEn: "Propulsion",
                titleKh: "ការបញ្ចូនអាហារ",
                descEn: "Swallowing and peristalsis (involuntary muscle contractions that push food down).",
                descKh: "ការលេប និងចលនា peristalsis (ការកន្ត្រាក់សាច់ដុំដោយស្វ័យប្រវត្តិដែលរុញអាហារចុះក្រោម)។",
                icon: <ArrowRight className="w-5 h-5" />
              },
              {
                step: "3",
                titleEn: "Mechanical Breakdown",
                titleKh: "ការបំបែកដោយចលនា",
                descEn: "Chewing in the mouth and stomach churning to physically break down food.",
                descKh: "ការទំពារក្នុងមាត់ និងការកិនច្របាច់ក្នុងក្រពះដើម្បីបំបែកអាហារជារូបវន្ត។",
                icon: <Activity className="w-5 h-5" />
              },
              {
                step: "4",
                titleEn: "Chemical Digestion",
                titleKh: "ការរំលាយអាហារដោយគីមី",
                descEn: "Enzymes breaking down polymers (e.g., proteins into amino acids) in the highly acidic stomach (pH 1.5 - 3.5).",
                descKh: "អង់ស៊ីមបំបែកសារធាតុប៉ូលីមែរ (ឧ. ប្រូតេអ៊ីនទៅជាអាស៊ីតអាមីណូ) នៅក្នុងក្រពះដែលមានជាតិអាស៊ីតខ្ពស់ (pH ១.៥ - ៣.៥)។",
                icon: <Droplet className="w-5 h-5" />
              },
              {
                step: "5",
                titleEn: "Absorption",
                titleKh: "ការស្រូបយក",
                descEn: "Nutrients passing through the lining of the small intestine (amplified by tiny finger-like structures called villi and microvilli) into the bloodstream.",
                descKh: "សារធាតុចិញ្ចឹមឆ្លងកាត់ស្រទាប់ពោះវៀនតូច (បង្កើនផ្ទៃដោយរចនាសម្ព័ន្ធដូចម្រាមដៃតូចៗហៅថា វីលី និងមីក្រូវីលី) ចូលទៅក្នុងចរន្តឈាម។",
                icon: <Maximize className="w-5 h-5" />
              },
              {
                step: "6",
                titleEn: "Defecation",
                titleKh: "ការបញ្ចេញកាកសំណល់",
                descEn: "Expelling indigestible waste from the large intestine.",
                descKh: "ការបញ្ចេញកាកសំណល់ដែលមិនអាចរំលាយបានចេញពីពោះវៀនធំ។",
                icon: <List className="w-5 h-5" />
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-orange-500/50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-orange-400 font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className={`text-white font-bold mb-1 flex items-center gap-2 ${k ? "font-khmer" : ""}`}>
                    {k ? item.titleKh : item.titleEn}
                    <span className="text-orange-500 opacity-80 scale-75">{item.icon}</span>
                  </h3>
                  <p className={`text-slate-400 text-sm leading-relaxed ${k ? "font-khmer" : ""}`}>
                    {k ? item.descKh : item.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Organs Deep-Dive */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <h2 className={`text-2xl font-semibold text-white ${k ? "font-khmer" : ""}`}>
              {t("Key Organs Deep-Dive", "ការសិក្សាស៊ីជម្រៅអំពីសរីរាង្គសំខាន់ៗ")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-slate-900 border-t-4 border-t-red-500 rounded-xl p-6 shadow-lg shadow-black/50">
              <h3 className={`text-lg font-bold text-white mb-3 ${k ? "font-khmer" : ""}`}>
                {t("The Stomach", "ក្រពះ")}
              </h3>
              <p className={`text-slate-400 text-sm leading-relaxed ${k ? "font-khmer" : ""}`}>
                {t(
                  "Acts as a biochemical mixer. It uses powerful hydrochloric acid and the enzyme pepsin to break down proteins into smaller peptides.",
                  "ដើរតួជាម៉ាស៊ីនលាយជីវគីមី។ វាប្រើអាស៊ីតអ៊ីដ្រូក្លរីកដ៏ខ្លាំងក្លា និងអង់ស៊ីមប៉ិបស៊ីន ដើម្បីបំបែកប្រូតេអ៊ីនទៅជាប៉ិបទីតតូចៗ។"
                )}
              </p>
            </div>

            <div className="bg-slate-900 border-t-4 border-t-blue-500 rounded-xl p-6 shadow-lg shadow-black/50">
              <h3 className={`text-lg font-bold text-white mb-3 ${k ? "font-khmer" : ""}`}>
                {t("Small Intestine", "ពោះវៀនតូច")}
              </h3>
              <p className={`text-slate-400 text-sm leading-relaxed ${k ? "font-khmer" : ""}`}>
                {t(
                  "The body's master absorber. Despite its name, it's very long (up to 20 feet). This is where almost all nutrient absorption into the bloodstream occurs.",
                  "កន្លែងស្រូបយកដ៏សំខាន់របស់រាងកាយ។ ទោះបីជាមានឈ្មោះបែបនេះក៏ដោយ វាវែងណាស់ (រហូតដល់ ២០ ហ្វីត)។ នេះគឺជាកន្លែងដែលការស្រូបយកសារធាតុចិញ្ចឹមស្ទើរតែទាំងអស់ចូលទៅក្នុងចរន្តឈាមកើតឡើង។"
                )}
              </p>
            </div>

            <div className="bg-slate-900 border-t-4 border-t-green-500 rounded-xl p-6 shadow-lg shadow-black/50">
              <h3 className={`text-lg font-bold text-white mb-3 ${k ? "font-khmer" : ""}`}>
                {t("Liver & Gallbladder", "ថ្លើម និងថង់ប្រមាត់")}
              </h3>
              <p className={`text-slate-400 text-sm leading-relaxed ${k ? "font-khmer" : ""}`}>
                {t(
                  "The liver produces a green-yellow fluid called bile, which is stored in the gallbladder. Bile acts like biological soap to emulsify and break down fats.",
                  "ថ្លើមផលិតសារធាតុរាវពណ៌បៃតងលឿងហៅថា ទឹកប្រមាត់ ដែលត្រូវបានស្តុកទុកក្នុងថង់ប្រមាត់។ ទឹកប្រមាត់ដើរតួដូចជាសាប៊ូជីវសាស្ត្រដើម្បីបំបែក និងរំលាយជាតិខ្លាញ់។"
                )}
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

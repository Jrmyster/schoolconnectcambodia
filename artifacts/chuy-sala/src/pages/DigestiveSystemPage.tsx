import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Apple, Utensils, Droplet, Activity, ArrowDown } from "lucide-react";

export default function DigestiveSystemPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className={`text-4xl font-bold text-slate-900 mb-6 ${kh ? 'font-khmer leading-relaxed' : 'font-display'}`}>
          {t("The Digestive System", "ប្រព័ន្ធរំលាយអាហារ")}
        </h1>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <Utensils className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Introduction", "សេចក្តីផ្តើម")}
            </h2>
          </div>
          <p className={`text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
            {t(
              "The digestive system is the body's food processing center. It breaks down the meals we eat into absorbable nutrients and energy that the body can use for growth, repair, and daily activities.",
              "ប្រព័ន្ធរំលាយអាហារគឺជាមជ្ឈមណ្ឌលកែច្នៃអាហាររបស់រាងកាយ។ វាបំបែកអាហារដែលយើងញ៉ាំទៅជាសារធាតុចិញ្ចឹម និងថាមពលដែលអាចស្រូបយកបាន ដែលរាងកាយអាចប្រើប្រាស់សម្រាប់ការលូតលាស់ ការជួសជុល និងសកម្មភាពប្រចាំថ្ងៃ។"
            )}
          </p>
        </div>

        {/* The Journey of Food */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-indigo-600" />
            <h2 className={`text-2xl font-bold text-slate-800 ${kh ? 'font-khmer' : 'font-display'}`}>
              {t("The Journey of Food", "ដំណើរនៃអាហារ")}
            </h2>
          </div>
          
          <div className="relative border-l-4 border-indigo-100 ml-4 md:ml-6 space-y-6 pb-4">
            {[
              {
                titleEn: "1. Mouth",
                titleKh: "១. មាត់",
                descEn: "Chewing breaks food into smaller pieces, while enzymes in saliva begin the chemical breakdown of carbohydrates.",
                descKh: "ការទំពារបំបែកអាហារទៅជាបំណែកតូចៗ ខណៈពេលដែលអង់ស៊ីមក្នុងទឹកមាត់ចាប់ផ្តើមបំបែកកាបូអ៊ីដ្រាត។"
              },
              {
                titleEn: "2. Esophagus",
                titleKh: "២. បំពង់អាហារ",
                descEn: "A muscular tube that transports food from the mouth to the stomach using wave-like contractions called peristalsis.",
                descKh: "បំពង់សាច់ដុំដែលដឹកជញ្ជូនអាហារពីមាត់ទៅក្រពះដោយប្រើចលនាកន្ត្រាក់ដូចរលកហៅថា peristalsis។"
              },
              {
                titleEn: "3. Stomach",
                titleKh: "៣. ក្រពះ",
                descEn: "Uses powerful stomach acid and churning motions to further break down food and digest proteins.",
                descKh: "ប្រើប្រាស់អាស៊ីតក្រពះដ៏ខ្លាំងក្លា និងចលនាកិនច្របាច់ដើម្បីបន្តបំបែកអាហារ និងរំលាយប្រូតេអ៊ីន។"
              },
              {
                titleEn: "4. Small Intestine",
                titleKh: "៤. ពោះវៀនតូច",
                descEn: "The primary site for nutrient absorption. Here, food is completely broken down, and vitamins, minerals, and nutrients enter the bloodstream.",
                descKh: "ទីតាំងចម្បងសម្រាប់ការស្រូបយកសារធាតុចិញ្ចឹម។ នៅទីនេះ អាហារត្រូវបានបំបែកទាំងស្រុង ហើយវីតាមីន រ៉ែ និងសារធាតុចិញ្ចឹមចូលទៅក្នុងចរន្តឈាម។"
              },
              {
                titleEn: "5. Large Intestine / Colon",
                titleKh: "៥. ពោះវៀនធំ",
                descEn: "Absorbs water from the remaining indigestible food matter and compacts the waste before it leaves the body.",
                descKh: "ស្រូបយកទឹកពីកាកសំណល់អាហារដែលមិនអាចរំលាយបាន ហើយបង្រួមកាកសំណល់មុនពេលវាចេញពីរាងកាយ។"
              }
            ].map((step, i) => (
              <div key={i} className="relative pl-6 md:pl-8">
                {/* Timeline Dot */}
                <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[10px] top-1.5 shadow-sm border-2 border-white"></div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                  <strong className={`block text-lg text-indigo-900 mb-2 ${kh ? 'font-khmer' : ''}`}>
                    {kh ? step.titleKh : step.titleEn}
                  </strong>
                  <p className={`text-sm text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
                    {kh ? step.descKh : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accessory Organs */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-orange-500">
            <Droplet className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Accessory Organs", "សរីរាង្គជំនួយ")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
              <strong className={`block text-lg text-orange-900 mb-2 ${kh ? 'font-khmer' : ''}`}>
                {t("Liver", "ថ្លើម")}
              </strong>
              <p className={`text-sm text-orange-800 ${kh ? 'font-khmer' : ''}`}>
                {t("Produces bile to help digest fats and processes nutrients absorbed from the small intestine.", "ផលិតទឹកប្រមាត់ដើម្បីជួយរំលាយជាតិខ្លាញ់ និងកែច្នៃសារធាតុចិញ្ចឹមដែលស្រូបពីពោះវៀនតូច។")}
              </p>
            </div>
            <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
              <strong className={`block text-lg text-teal-900 mb-2 ${kh ? 'font-khmer' : ''}`}>
                {t("Gallbladder", "ថង់ប្រមាត់")}
              </strong>
              <p className={`text-sm text-teal-800 ${kh ? 'font-khmer' : ''}`}>
                {t("Stores and concentrates bile, releasing it into the small intestine when needed.", "ស្តុកទុក និងធ្វើឱ្យទឹកប្រមាត់ខាប់ ដោយបញ្ចេញវាទៅក្នុងពោះវៀនតូចនៅពេលចាំបាច់។")}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100">
              <strong className={`block text-lg text-yellow-900 mb-2 ${kh ? 'font-khmer' : ''}`}>
                {t("Pancreas", "លំពែង")}
              </strong>
              <p className={`text-sm text-yellow-800 ${kh ? 'font-khmer' : ''}`}>
                {t("Produces powerful digestive enzymes and hormones like insulin to regulate blood sugar.", "ផលិតអង់ស៊ីមរំលាយអាហារដ៏ខ្លាំងក្លា និងអរម៉ូនដូចជាអាំងស៊ុយលីនដើម្បីគ្រប់គ្រងជាតិស្ករក្នុងឈាម។")}
              </p>
            </div>
          </div>
        </div>

        {/* Local Health Context */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-sm border border-emerald-100">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <Apple className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Healthy Digestion", "ការរំលាយអាហារដែលមានសុខភាពល្អ")}
            </h2>
          </div>
          <p className={`text-slate-700 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
            {t(
              "Traditional Cambodian fermented foods like Prahok provide beneficial probiotics that support a healthy microbiome. Combined with a high-fiber diet rich in local vegetables and fruits, this helps maintain excellent gut health and smooth digestion.",
              "អាហារផ្អាប់ប្រពៃណីខ្មែរដូចជា ប្រហុក ផ្តល់នូវប្រូបាយអូទិកដែលមានប្រយោជន៍ ដែលជួយដល់អតិសុខុមប្រាណដែលមានសុខភាពល្អ។ ការរួមបញ្ចូលគ្នាជាមួយនឹងរបបអាហារមានជាតិសរសៃខ្ពស់ដែលសំបូរទៅដោយបន្លែ និងផ្លែឈើក្នុងស្រុក ជួយរក្សាសុខភាពពោះវៀនបានយ៉ាងល្អ និងការរំលាយអាហារបានយ៉ាងរលូន។"
            )}
          </p>
        </div>

      </div>
    </div>
  );
}

import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Wind, Activity, RefreshCw, ArrowDownUp, MoveRight, AlertTriangle, CloudRain, HeartPulse } from "lucide-react";

export default function RespiratorySystemPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className={`text-4xl font-bold text-slate-900 mb-6 ${kh ? 'font-khmer leading-relaxed' : 'font-display'}`}>
          {t("The Respiratory System", "ប្រព័ន្ធផ្លូវដង្ហើម")}
        </h1>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-cyan-600">
            <Wind className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Introduction", "សេចក្តីផ្តើម")}
            </h2>
          </div>
          <p className={`text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
            {t(
              "The respiratory system is the body's mechanism for breathing. Its primary function is to bring oxygen (O₂) into the body for cells to use in energy production, and to remove carbon dioxide (CO₂) as a waste product.",
              "ប្រព័ន្ធផ្លូវដង្ហើមគឺជាយន្តការរបស់រាងកាយសម្រាប់ការដកដង្ហើម។ មុខងារចម្បងរបស់វាគឺនាំយកអុកស៊ីហ្សែន (O₂) ចូលទៅក្នុងរាងកាយសម្រាប់កោសិកាប្រើប្រាស់ក្នុងការផលិតថាមពល និងបញ្ចេញឧស្ម័នកាបូនិក (CO₂) ជាកាកសំណល់។"
            )}
          </p>
        </div>

        {/* The Journey of a Breath */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-blue-600" />
            <h2 className={`text-2xl font-bold text-slate-800 ${kh ? 'font-khmer' : 'font-display'}`}>
              {t("The Journey of a Breath", "ដំណើរនៃខ្យល់ដង្ហើម")}
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6">
              <p className={`text-slate-600 leading-relaxed mb-6 ${kh ? 'font-khmer' : ''}`}>
                {t("When you inhale, air travels through a specific pathway to reach deep into your lungs:", "នៅពេលអ្នកដកដង្ហើមចូល ខ្យល់ធ្វើដំណើរតាមផ្លូវជាក់លាក់មួយដើម្បីទៅដល់ជ្រៅក្នុងសួតរបស់អ្នក៖")}
              </p>
              
              <div className="flex flex-col space-y-4">
                {[
                  {
                    step: "1",
                    en: "Nose/Mouth",
                    kh: "ច្រមុះ/មាត់",
                    descEn: "Air enters, gets warmed, moistened, and filtered.",
                    descKh: "ខ្យល់ចូល ត្រូវបានកម្តៅ ផ្តល់សំណើម និងចម្រោះ។"
                  },
                  {
                    step: "2",
                    en: "Pharynx (Throat)",
                    kh: "បំពង់ក (Pharynx)",
                    descEn: "The common pathway for both air and food.",
                    descKh: "ផ្លូវរួមសម្រាប់ទាំងខ្យល់ និងអាហារ។"
                  },
                  {
                    step: "3",
                    en: "Larynx (Voice Box)",
                    kh: "ប្រអប់សំឡេង (Larynx)",
                    descEn: "Contains vocal cords and routes air into the windpipe.",
                    descKh: "មានខ្សែសំឡេង និងនាំខ្យល់ចូលទៅក្នុងបំពង់ខ្យល់។"
                  },
                  {
                    step: "4",
                    en: "Trachea (Windpipe)",
                    kh: "បំពង់ខ្យល់ (Trachea)",
                    descEn: "The main tube leading down to the lungs.",
                    descKh: "បំពង់ធំដែលនាំចុះទៅកាន់សួត។"
                  },
                  {
                    step: "5",
                    en: "Bronchi & Bronchioles",
                    kh: "ទងសួត និងទងសួតតូចៗ",
                    descEn: "The trachea splits into two main bronchi, which branch into smaller bronchioles.",
                    descKh: "បំពង់ខ្យល់បំបែកជាទងសួតធំពីរ ដែលបែកខ្នែងទៅជាទងសួតតូចៗជាច្រើន។"
                  },
                  {
                    step: "6",
                    en: "Alveoli",
                    kh: "ថង់ខ្យល់ (Alveoli)",
                    descEn: "Millions of tiny air sacs where gas exchange occurs.",
                    descKh: "ថង់ខ្យល់តូចៗរាប់លានដែលការផ្លាស់ប្តូរឧស្ម័នកើតឡើង។"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <strong className={`block text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                        {kh ? item.kh : item.en}
                      </strong>
                      <p className={`text-sm text-slate-600 mt-1 ${kh ? 'font-khmer' : ''}`}>
                        {kh ? item.descKh : item.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gas Exchange & Diaphragm Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Gas Exchange */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 text-emerald-600">
              <RefreshCw className="w-8 h-8" />
              <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
                {t("Gas Exchange", "ការផ្លាស់ប្តូរឧស្ម័ន")}
              </h2>
            </div>
            <p className={`text-slate-600 leading-relaxed mb-4 ${kh ? 'font-khmer' : ''}`}>
              {t(
                "These are the 'end of the line' for air. They are tiny sacs where the actual magic happens. Because their walls are so thin, gases can simply pass through them into the surrounding blood vessels (capillaries) via diffusion. Oxygen from the air we breathe enters the blood, while carbon dioxide (waste) moves into the alveoli to be exhaled.",
                "ទាំងនេះគឺជា 'ទីបញ្ចប់នៃផ្លូវ' សម្រាប់ខ្យល់។ ពួកវាគឺជាថង់តូចៗដែលអព្ភូតហេតុកើតឡើងពិតប្រាកដ។ ដោយសារតែជញ្ជាំងរបស់វាស្តើងខ្លាំង ឧស្ម័នអាចជ្រាបកាត់វាចូលទៅក្នុងសរសៃឈាមជុំវិញយ៉ាងងាយស្រួលដោយការសាយភាយ។ អុកស៊ីហ្សែនពីខ្យល់ដែលយើងដកដង្ហើមចូលទៅក្នុងឈាម ខណៈពេលដែលឧស្ម័នកាបូនិក (កាកសំណល់) ផ្លាស់ទីចូលទៅក្នុងថង់ខ្យល់ដើម្បីដកដង្ហើមចេញ។"
              )}
            </p>
            <div className="flex items-center justify-center gap-4 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <div className="text-center">
                <span className="block font-bold text-emerald-700">O₂</span>
                <span className={`text-xs text-emerald-600 ${kh ? 'font-khmer' : ''}`}>{t("In", "ចូល")}</span>
              </div>
              <MoveRight className="w-5 h-5 text-emerald-400" />
              <div className="text-center font-medium text-slate-700 text-sm">
                {t("Blood", "ឈាម")}
              </div>
              <MoveRight className="w-5 h-5 text-emerald-400" />
              <div className="text-center">
                <span className="block font-bold text-slate-600">CO₂</span>
                <span className={`text-xs text-slate-500 ${kh ? 'font-khmer' : ''}`}>{t("Out", "ចេញ")}</span>
              </div>
            </div>
          </div>

          {/* The Diaphragm */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 text-violet-600">
              <ArrowDownUp className="w-8 h-8" />
              <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
                {t("The Diaphragm", "សន្ទះទ្រូង (Diaphragm)")}
              </h2>
            </div>
            <p className={`text-slate-600 leading-relaxed mb-4 ${kh ? 'font-khmer' : ''}`}>
              {t(
                "Most students think the lungs 'suck' in air on their own. In reality, the diaphragm (a dome-shaped muscle) pulls down, creating a vacuum that forces air into the lungs. When it relaxes and moves up, air is pushed back out.",
                "សិស្សភាគច្រើនគិតថាសួត 'បឺត' ខ្យល់ចូលដោយខ្លួនឯង។ តាមការពិត សន្ទះទ្រូង (សាច់ដុំរាងដូចដំបូល) ទាញចុះក្រោម បង្កើតជាកន្លែងទំនេរដែលបង្ខំឱ្យខ្យល់ចូលក្នុងសួត។ នៅពេលវាបន្ធូរ និងផ្លាស់ទីឡើងលើ ខ្យល់ត្រូវបានរុញចេញមកវិញ។"
              )}
            </p>
            <ul className={`space-y-3 text-sm text-slate-600 ${kh ? 'font-khmer' : ''}`}>
              <li className="flex gap-2">
                <strong className="text-slate-800 shrink-0">{t("Inhaling:", "ពេលដកដង្ហើមចូល៖")}</strong>
                <span>{t("It contracts and moves down, creating more space in the chest and pulling air in like a vacuum.", "វាកន្ត្រាក់និងផ្លាស់ទីចុះក្រោម បង្កើតចន្លោះបន្ថែមក្នុងទ្រូង និងទាញខ្យល់ចូលដូចម៉ាស៊ីនបូមធូលី។")}</span>
              </li>
              <li className="flex gap-2">
                <strong className="text-slate-800 shrink-0">{t("Exhaling:", "ពេលដកដង្ហើមចេញ៖")}</strong>
                <span>{t("It relaxes and moves up, pushing the air out of the lungs.", "វាបន្ធូរនិងផ្លាស់ទីឡើងលើ ដោយរុញខ្យល់ចេញពីសួត។")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Respiratory Health & The Environment */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className={`text-2xl font-bold text-slate-800 mb-6 ${kh ? 'font-khmer' : 'font-display'}`}>
            {t("Respiratory Health & The Environment", "សុខភាពផ្លូវដង្ហើម និងបរិស្ថាន")}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* AQI */}
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <div className="flex items-center gap-2 mb-3 text-amber-600">
                <AlertTriangle className="w-6 h-6" />
                <strong className={`text-lg ${kh ? 'font-khmer' : ''}`}>
                  {t("Air Quality (AQI)", "គុណភាពខ្យល់ (AQI)")}
                </strong>
              </div>
              <p className={`text-sm text-slate-700 ${kh ? 'font-khmer' : ''}`}>
                {t("Small particles (PM2.5) from dust or smoke can enter deep into the lungs and cause irritation or long-term damage.", "ភាគល្អិតតូចៗ (PM2.5) ពីធូលី ឬផ្សែងអាចចូលជ្រៅទៅក្នុងសួត និងបង្កការរលាក ឬការខូចខាតរយៈពេលវែង។")}
              </p>
            </div>

            {/* Seasonal Impacts */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-center gap-2 mb-3 text-blue-600">
                <CloudRain className="w-6 h-6" />
                <strong className={`text-lg ${kh ? 'font-khmer' : ''}`}>
                  {t("Seasonal Impacts", "ផលប៉ះពាល់តាមរដូវ")}
                </strong>
              </div>
              <p className={`text-sm text-slate-700 ${kh ? 'font-khmer' : ''}`}>
                {t("The dry season brings dust and smoke, while the rainy season increases humidity and mold. Both can severely affect people with asthma or allergies.", "រដូវប្រាំងនាំមកនូវធូលី និងផ្សែង ខណៈពេលដែលរដូវវស្សាបង្កើនសំណើម និងផ្សិត។ ទាំងពីរនេះអាចប៉ះពាល់យ៉ាងធ្ងន់ធ្ងរដល់អ្នកដែលមានជំងឺហឺត ឬអាឡែស៊ី។")}
              </p>
            </div>

            {/* Healthy Habits */}
            <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
              <div className="flex items-center gap-2 mb-3 text-rose-600">
                <HeartPulse className="w-6 h-6" />
                <strong className={`text-lg ${kh ? 'font-khmer' : ''}`}>
                  {t("Healthy Habits", "ទម្លាប់សុខភាពល្អ")}
                </strong>
              </div>
              <div className={`text-sm text-slate-700 ${kh ? 'font-khmer' : ''}`}>
                <span className="block font-bold text-rose-700 mb-1">{t("Pro-Tip:", "គន្លឹះសំខាន់៖")}</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>{t("Stay hydrated to keep mucus thin.", "ផឹកទឹកឱ្យបានគ្រប់គ្រាន់ដើម្បីរក្សាទឹករំអិលឱ្យរាវ។")}</li>
                  <li>{t("Avoid smoke and strong chemicals.", "ចៀសវាងផ្សែង និងសារធាតុគីមីខ្លាំង។")}</li>
                  <li>{t("Wear masks on high-dust days.", "ពាក់ម៉ាសនៅថ្ងៃដែលមានធូលីច្រើន។")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

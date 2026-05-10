import { useTranslation, useLanguageStore } from "@/store/use-language";
import {
  Filter, Activity, ThermometerSun,
  Droplet, Scale, HeartPulse, Microscope, Repeat, AlertCircle
} from "lucide-react";

export default function ExcretorySystem() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className={`text-4xl font-bold text-slate-900 mb-6 ${kh ? 'font-khmer leading-relaxed' : 'font-display'}`}>
          {t("The Excretory System", "ប្រព័ន្ធបញ្ចេញចោល")}
        </h1>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-cyan-600">
            <Filter className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Introduction", "សេចក្តីផ្តើម")}
            </h2>
          </div>
          <p className={`text-slate-700 leading-relaxed text-lg ${kh ? 'font-khmer' : ''}`}>
            {t(
              "Kidneys are vital bean-shaped organs that filter roughly 200 quarts of blood daily to remove waste and excess water, producing about 2 quarts of urine, which is stored in the bladder. Part of the excretory system, they maintain fluid balance, regulate blood pressure, and produce hormones. They are located just below the rib cage on either side of the spine.",
              "តម្រងនោមគឺជាសរីរាង្គដ៏សំខាន់រាងដូចសណ្តែកដែលចម្រោះឈាមប្រហែល ២០០ ភាគបួន(quarts) ជារៀងរាល់ថ្ងៃ ដើម្បីយកកាកសំណល់ និងទឹកដែលលើសចេញ ដោយផលិតទឹកនោមប្រហែល ២ ភាគបួន ដែលត្រូវបានស្តុកទុកក្នុងប្លោកនោម។ ក្នុងនាមជាផ្នែកមួយនៃប្រព័ន្ធបញ្ចេញចោល ពួកវារក្សាតុល្យភាពជាតិទឹក គ្រប់គ្រងសម្ពាធឈាម និងផលិតអ័រម៉ូន។ ពួកវាមានទីតាំងនៅខាងក្រោមទ្រុងជំនីរនៅសងខាងនៃឆ្អឹងខ្នង។"
            )}
          </p>
        </div>

        {/* Key Facts Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6 text-indigo-600">
            <Activity className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Key Facts About Kidneys & The Excretory System", "ការពិតសំខាន់ៗអំពីតម្រងនោម និងប្រព័ន្ធបញ្ចេញចោល")}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FactCard 
              icon={<Activity className="w-6 h-6 text-indigo-500" />}
              title={t("Massive Filtration System", "ប្រព័ន្ធចម្រោះដ៏ធំធេង")}
              desc={t("Despite being only fist-sized, your kidneys filter all the blood in your body roughly every 30 minutes, removing waste and excess fluids.", "ទោះបីជាមានទំហំប៉ុនកណ្តាប់ដៃក៏ដោយ តម្រងនោមរបស់អ្នកចម្រោះឈាមទាំងអស់នៅក្នុងរាងកាយរបស់អ្នកប្រហែលរៀងរាល់ ៣០ នាទីម្តង ដោយយកកាកសំណល់ និងសារធាតុរាវដែលលើសចេញ។")}
              kh={kh}
            />
            <FactCard 
              icon={<Microscope className="w-6 h-6 text-indigo-500" />}
              title={t("The Power of Nephrons", "ថាមពលនៃនេហ្វ្រុង")}
              desc={t("Each kidney contains about 1 million tiny filtering units called nephrons.", "តម្រងនោមនីមួយៗមានឯកតាចម្រោះតូចៗប្រហែល ១ លាន ដែលហៅថានេហ្វ្រុង។")}
              kh={kh}
            />
            <FactCard 
              icon={<Droplet className="w-6 h-6 text-indigo-500" />}
              title={t("Water Management", "ការគ្រប់គ្រងទឹក")}
              desc={t("Out of the 200 quarts of liquid filtered, about 198 quarts are recovered by the body, leaving only 2 quarts of urine produced daily.", "ក្នុងចំណោមសារធាតុរាវ ២០០ ភាគបួនដែលត្រូវបានចម្រោះ ប្រហែល ១៩៨ ភាគបួនត្រូវបានទាញយកមកវិញដោយរាងកាយ ដោយបន្សល់ទុកតែទឹកនោម ២ ភាគបួនប៉ុណ្ណោះដែលត្រូវបានផលិតជារៀងរាល់ថ្ងៃ។")}
              kh={kh}
            />
            <FactCard 
              icon={<Scale className="w-6 h-6 text-indigo-500" />}
              title={t("More Than Just Waste", "លើសពីកាកសំណល់")}
              desc={t("While they remove waste, they also balance essential body minerals—sodium, phosphorus, and potassium—and manage acidity.", "ខណៈពេលដែលពួកវាយកកាកសំណល់ចេញ ពួកវាក៏ជួយធ្វើឱ្យមានតុល្យភាពសារធាតុរ៉ែសំខាន់ៗរបស់រាងកាយផងដែរ—សូដ្យូម ផូស្វ័រ និងប៉ូតាស្យូម—ព្រមទាំងគ្រប់គ្រងកម្រិតជាតិអាស៊ីត។")}
              kh={kh}
            />
            <FactCard 
              icon={<HeartPulse className="w-6 h-6 text-indigo-500" />}
              title={t("Vital Functions", "មុខងារសំខាន់ៗ")}
              desc={t("Kidneys produce a hormone that tells your body to make red blood cells, convert vitamin D for bone health, and regulate blood pressure.", "តម្រងនោមផលិតអ័រម៉ូនដែលប្រាប់រាងកាយរបស់អ្នកឱ្យបង្កើតកោសិកាឈាមក្រហម បំប្លែងវីតាមីន D សម្រាប់សុខភាពឆ្អឹង និងគ្រប់គ្រងសម្ពាធឈាម។")}
              kh={kh}
            />
            <FactCard 
              icon={<Repeat className="w-6 h-6 text-indigo-500" />}
              title={t("The Excretory Loop", "វដ្តនៃការបញ្ចេញចោល")}
              desc={t("The system consists of the kidneys (filtering), ureters (tubes transporting urine), bladder (storage), and urethra (exit).", "ប្រព័ន្ធនេះមានតម្រងនោម (ការចម្រោះ) បំពង់បង្ហូរទឹកនោម (បំពង់ដឹកជញ្ជូនទឹកនោម) ប្លោកនោម (ការស្តុកទុក) និងបំពង់នោម (ផ្លូវចេញ)។")}
              kh={kh}
            />
            <div className="md:col-span-2 lg:col-span-3">
              <FactCard 
                icon={<AlertCircle className="w-6 h-6 text-rose-500" />}
                title={t("Kidney Health", "សុខភាពតម្រងនោម")}
                desc={t("High blood pressure and diabetes are the leading causes of kidney disease.", "ជំងឺលើសសម្ពាធឈាម និងជំងឺទឹកនោមផ្អែម គឺជាមូលហេតុចម្បងនៃជំងឺតម្រងនោម។")}
                kh={kh}
                highlight={true}
              />
            </div>
          </div>
        </div>

        {/* Local Health Context (Hydration) */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-sm border border-amber-100">
          <div className="flex items-center gap-3 mb-4 text-orange-600">
            <ThermometerSun className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Local Health Context: Hydration", "គន្លឹះសុខភាព៖ ការរក្សាជាតិទឹក")}
            </h2>
          </div>
          <p className={`text-slate-700 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
            {t(
              "Pro-Tip: In hot, tropical climates, sweating removes water, making the kidneys work harder. Staying hydrated prevents kidney stones and urinary tract infections.",
              "នៅក្នុងអាកាសធាតុក្តៅ តំបន់ត្រូពិច ការបែកញើសធ្វើឱ្យបាត់បង់ជាតិទឹក ដែលធ្វើឱ្យតម្រងនោមធ្វើការកាន់តែខ្លាំង។ ការរក្សាជាតិទឹកក្នុងខ្លួនជួយការពារក្រួសក្នុងតម្រងនោម និងការឆ្លងមេរោគផ្លូវទឹកនោម។"
            )}
          </p>
        </div>

      </div>
    </div>
  );
}

function FactCard({ icon, title, desc, kh, highlight = false }: { icon: React.ReactNode, title: string, desc: string, kh: boolean, highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-6 shadow-sm border flex gap-4 items-start hover:shadow-md transition-shadow ${highlight ? 'border-rose-200 bg-rose-50/50' : 'border-slate-100 bg-white'}`}>
      <div className={`mt-1 p-3 rounded-lg shrink-0 ${highlight ? 'bg-rose-100' : 'bg-indigo-50'}`}>
        {icon}
      </div>
      <div>
        <h3 className={`text-xl font-bold text-slate-900 mb-2 ${kh ? 'font-khmer' : ''}`}>
          {title}
        </h3>
        <p className={`text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
          {desc}
        </p>
      </div>
    </div>
  );
}

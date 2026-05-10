import { useTranslation, useLanguageStore } from "@/store/use-language";
import {
  Dna, Users, Activity, Heart, Thermometer, Calendar, Microscope,
  Clock, Droplets, Baby, Layers, Target, Globe
} from "lucide-react";

export default function ReproductiveSystem() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className={`text-4xl font-bold text-slate-900 mb-6 ${kh ? 'font-khmer leading-relaxed' : 'font-display'}`}>
          {t("The Reproductive System", "ប្រព័ន្ធបន្តពូជ")}
        </h1>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-rose-600">
            <Heart className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Introduction", "សេចក្តីផ្តើម")}
            </h2>
          </div>
          <p className={`text-slate-700 leading-relaxed text-lg ${kh ? 'font-khmer' : ''}`}>
            {t(
              "The human reproductive system consists of specialized internal and external organs designed to produce gametes (sperm/eggs), facilitate fertilization, and support fetal development. It relies on hormones like estrogen and testosterone to regulate fertility, with the female system typically cycling monthly and the male system producing sperm constantly.",
              "ប្រព័ន្ធបន្តពូជរបស់មនុស្សមានសរីរាង្គខាងក្នុង និងខាងក្រៅឯកទេស ដែលត្រូវបានរចនាឡើងដើម្បីផលិតកាម៉ែត (មេជីវិតឈ្មោល/ស៊ុត) សម្រួលដល់ការបង្កកំណើត និងជួយដល់ការលូតលាស់របស់ទារក។ វាពឹងផ្អែកលើអ័រម៉ូនដូចជាអេស្ត្រូសែន និងតេស្តូស្តេរ៉ូនដើម្បីគ្រប់គ្រងភាពមានកូន ដោយប្រព័ន្ធស្ត្រីជាទូទៅមានវដ្តរៀងរាល់ខែ ហើយប្រព័ន្ធបុរសផលិតមេជីវិតឈ្មោលជាប្រចាំ។"
            )}
          </p>
        </div>

        {/* Detailed Breakdown: Female & Male Systems */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* Female System Facts */}
          <div className="bg-pink-50/50 rounded-2xl p-6 shadow-sm border border-pink-100">
            <div className="flex items-center gap-3 mb-6 text-pink-600">
              <Users className="w-8 h-8" />
              <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
                {t("Female Reproductive System", "ប្រព័ន្ធបន្តពូជស្ត្រី")}
              </h2>
            </div>
            
            <div className="space-y-4">
              <FactCard 
                icon={<Calendar className="w-6 h-6 text-pink-500" />}
                title={t("Ovulation", "ការបញ្ចេញស៊ុត")}
                desc={t("Generally, one ovum (egg) is released from the ovaries approximately every 28 days, a process regulated by hormones.", "ជាទូទៅ ស៊ុតមួយត្រូវបានបញ្ចេញពីអូវែរប្រហែលរៀងរាល់ ២៨ ថ្ងៃម្តង ដែលជាដំណើរការគ្រប់គ្រងដោយអ័រម៉ូន។")}
                kh={kh}
              />
              <FactCard 
                icon={<Baby className="w-6 h-6 text-pink-500" />}
                title={t("The Uterus", "ស្បូន")}
                desc={t("This organ is designed to hold a developing fetus. It is highly muscular and can expand significantly during pregnancy.", "សរីរាង្គនេះត្រូវបានរចនាឡើងដើម្បីរក្សាទារកដែលកំពុងលូតលាស់។ វាមានសាច់ដុំច្រើន និងអាចពង្រីកបានយ៉ាងធំអំឡុងពេលមានផ្ទៃពោះ។")}
                kh={kh}
              />
              <FactCard 
                icon={<Clock className="w-6 h-6 text-pink-500" />}
                title={t("Egg Lifespan", "អាយុកាលស៊ុត")}
                desc={t("A released egg survives for about 12 to 24 hours, whereas sperm can survive in the female reproductive tract for up to 5 days.", "ស៊ុតដែលបានបញ្ចេញរស់រានមានជីវិតប្រហែល ១២ ទៅ ២៤ ម៉ោង ខណៈពេលដែលមេជីវិតឈ្មោលអាចរស់នៅក្នុងផ្លូវបន្តពូជស្ត្រីបានរហូតដល់ ៥ ថ្ងៃ។")}
                kh={kh}
              />
              <FactCard 
                icon={<Activity className="w-6 h-6 text-pink-500" />}
                title={t("Menopause", "អស់រដូវ")}
                desc={t("This marks the end of the menstrual cycle and fertility, usually occurring in a woman's late 40s or early 50s.", "នេះបង្ហាញពីការបញ្ចប់នៃវដ្តរដូវ និងភាពមានកូន ដែលជាធម្មតាកើតឡើងនៅចុងអាយុ ៤០ ឆ្នាំ ឬដើមអាយុ ៥០ ឆ្នាំរបស់ស្ត្រី។")}
                kh={kh}
              />
              <FactCard 
                icon={<Layers className="w-6 h-6 text-pink-500" />}
                title={t("Organ Structure", "រចនាសម្ព័ន្ធសរីរាង្គ")}
                desc={t("The system includes ovaries (produce eggs), fallopian tubes, the uterus, cervix, and vagina.", "ប្រព័ន្ធនេះរួមមានអូវែរ (ផលិតស៊ុត) បំពង់ដៃស្បូន ស្បូន មាត់ស្បូន និងទ្វារមាស។")}
                kh={kh}
              />
            </div>
          </div>

          {/* Male System Facts */}
          <div className="bg-blue-50/50 rounded-2xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center gap-3 mb-6 text-blue-600">
              <Activity className="w-8 h-8" />
              <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
                {t("Male Reproductive System", "ប្រព័ន្ធបន្តពូជបុរស")}
              </h2>
            </div>

            <div className="space-y-4">
              <FactCard 
                icon={<Thermometer className="w-6 h-6 text-blue-500" />}
                title={t("Sperm Production", "ការផលិតមេជីវិតឈ្មោល")}
                desc={t("Sperm are produced in the testes, a process that requires a temperature roughly 2 to 3°C lower than body temperature, which is why the testicles are housed outside the body in the scrotum.", "មេជីវិតឈ្មោលត្រូវបានផលិតនៅក្នុងពងស្វាស ដែលជាដំណើរការតម្រូវឱ្យមានសីតុណ្ហភាពទាបជាងសីតុណ្ហភាពរាងកាយប្រហែល ២ ទៅ ៣ អង្សាសេ ដែលនេះជាមូលហេតុដែលពងស្វាសស្ថិតនៅខាងក្រៅរាងកាយក្នុងថង់ពងស្វាស។")}
                kh={kh}
              />
              <FactCard 
                icon={<Droplets className="w-6 h-6 text-blue-500" />}
                title={t("Production Volume", "បរិមាណផលិតផល")}
                desc={t("Approximately 100 to 300 million sperm are produced each day.", "មេជីវិតឈ្មោលប្រហែល ១០០ ទៅ ៣០០ លានត្រូវបានផលិតជារៀងរាល់ថ្ងៃ។")}
                kh={kh}
              />
              <FactCard 
                icon={<Calendar className="w-6 h-6 text-blue-500" />}
                title={t("Maturity Time", "ពេលវេលាពេញវ័យ")}
                desc={t("It takes roughly 64 days for a sperm cell to fully develop and mature.", "វាចំណាយពេលប្រហែល ៦៤ ថ្ងៃដើម្បីឱ្យកោសិកាមេជីវិតឈ្មោលលូតលាស់ និងពេញវ័យទាំងស្រុង។")}
                kh={kh}
              />
              <FactCard 
                icon={<Microscope className="w-6 h-6 text-blue-500" />}
                title={t("Sperm Size", "ទំហំមេជីវិតឈ្មោល")}
                desc={t("Sperm are exceptionally small, with a volume roughly 85,000 times less than that of the female egg.", "មេជីវិតឈ្មោលមានទំហំតូចខុសធម្មតា ដែលមានមាឌតូចជាងស៊ុតស្ត្រីប្រហែល ៨៥,០០០ ដង។")}
                kh={kh}
              />
              <FactCard 
                icon={<Layers className="w-6 h-6 text-blue-500" />}
                title={t("Key Organs", "សរីរាង្គសំខាន់ៗ")}
                desc={t("Key components include the testes, vas deferens, prostate gland, and penis.", "សមាសធាតុសំខាន់ៗរួមមានពងស្វាស បំពង់បង្ហូរមេជីវិតឈ្មោល ក្រពេញប្រូស្តាត និងលិង្គ។")}
                kh={kh}
              />
            </div>
          </div>
        </div>

        {/* General Facts */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-sm border border-indigo-100">
          <div className="flex items-center gap-3 mb-6 text-indigo-600">
            <Globe className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("General Facts", "ការពិតទូទៅ")}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/60 rounded-xl p-5 border border-indigo-50">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-indigo-500" />
                <h3 className={`font-bold text-indigo-900 ${kh ? 'font-khmer' : ''}`}>
                  {t("Fertilization Location", "ទីតាំងបង្កកំណើត")}
                </h3>
              </div>
              <p className={`text-slate-700 text-sm leading-relaxed ${kh ? 'font-khmer' : ''}`}>
                {t("Conception usually occurs when sperm meets an egg in the fallopian tube.", "ការមានផ្ទៃពោះជាធម្មតាកើតឡើងនៅពេលដែលមេជីវិតឈ្មោលជួបនឹងស៊ុតនៅក្នុងបំពង់ដៃស្បូន។")}
              </p>
            </div>

            <div className="bg-white/60 rounded-xl p-5 border border-indigo-50">
              <div className="flex items-center gap-3 mb-3">
                <Dna className="w-6 h-6 text-indigo-500" />
                <h3 className={`font-bold text-indigo-900 ${kh ? 'font-khmer' : ''}`}>
                  {t("Genetic Contribution", "ការចូលរួមហ្សែន")}
                </h3>
              </div>
              <p className={`text-slate-700 text-sm leading-relaxed ${kh ? 'font-khmer' : ''}`}>
                {t("Sperm and egg cells each contribute half the genetic material necessary to create a new organism.", "កោសិកាមេជីវិតឈ្មោល និងស៊ុតនីមួយៗចូលរួមពាក់កណ្តាលនៃសម្ភារៈហ្សែនដែលចាំបាច់ដើម្បីបង្កើតភាវៈរស់ថ្មី។")}
              </p>
            </div>

            <div className="bg-white/60 rounded-xl p-5 border border-indigo-50">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-6 h-6 text-indigo-500" />
                <h3 className={`font-bold text-indigo-900 ${kh ? 'font-khmer' : ''}`}>
                  {t("Common Functions", "មុខងាររួម")}
                </h3>
              </div>
              <p className={`text-slate-700 text-sm leading-relaxed ${kh ? 'font-khmer' : ''}`}>
                {t("Both systems, while very different, are essential for creating life and are heavily controlled by the endocrine system.", "ប្រព័ន្ធទាំងពីរ ទោះបីជាខុសគ្នាខ្លាំងក៏ដោយ គឺចាំបាច់សម្រាប់ការបង្កើតជីវិត និងត្រូវបានគ្រប់គ្រងយ៉ាងខ្លាំងដោយប្រព័ន្ធអង់ដូគ្រីន។")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function FactCard({ icon, title, desc, kh }: { icon: React.ReactNode, title: string, desc: string, kh: boolean }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex gap-4 items-start hover:shadow-md transition-shadow">
      <div className="mt-1 bg-slate-50 p-2 rounded-lg shrink-0">
        {icon}
      </div>
      <div>
        <h3 className={`font-bold text-slate-900 mb-1 ${kh ? 'font-khmer' : ''}`}>
          {title}
        </h3>
        <p className={`text-sm text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
          {desc}
        </p>
      </div>
    </div>
  );
}

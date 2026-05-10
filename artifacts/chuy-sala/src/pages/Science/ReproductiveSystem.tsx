import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Dna, Users, Activity, Heart } from "lucide-react";

export default function ReproductiveSystem() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className={`text-4xl font-bold text-slate-900 mb-6 ${kh ? 'font-khmer leading-relaxed' : 'font-display'}`}>
          {t("The Reproductive System", "ប្រព័ន្ធបន្តពូជ")}
        </h1>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-rose-600">
            <Heart className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Introduction", "សេចក្តីផ្តើម")}
            </h2>
          </div>
          <p className={`text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
            {t(
              "The reproductive system is the biological system responsible for producing offspring and passing on genetic material (DNA) to the next generation.",
              "ប្រព័ន្ធបន្តពូជគឺជាប្រព័ន្ធជីវសាស្ត្រដែលទទួលខុសត្រូវក្នុងការបង្កើតកូនចៅ និងបញ្ជូនសម្ភារៈហ្សែន (DNA) ទៅជំនាន់ក្រោយ។"
            )}
          </p>
        </div>

        {/* Male and Female Systems */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-2xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center gap-3 mb-4 text-blue-600">
              <Activity className="w-6 h-6" />
              <h2 className={`text-xl font-bold ${kh ? 'font-khmer' : ''}`}>
                {t("The Male System", "ប្រព័ន្ធបុរស")}
              </h2>
            </div>
            <p className={`text-slate-700 leading-relaxed mb-4 ${kh ? 'font-khmer' : ''}`}>
              {t(
                "The primary functions include producing sperm and testosterone in the Testes, and the delivery system required for reproduction.",
                "មុខងារចម្បងរួមមានការផលិតមេជីវិតឈ្មោល និងអ័រម៉ូនតេស្តូស្តេរ៉ូននៅក្នុងពងស្វាស ព្រមទាំងប្រព័ន្ធបញ្ជូនដែលចាំបាច់សម្រាប់ការបន្តពូជ។"
              )}
            </p>
          </div>

          <div className="bg-pink-50 rounded-2xl p-6 shadow-sm border border-pink-100">
            <div className="flex items-center gap-3 mb-4 text-pink-600">
              <Users className="w-6 h-6" />
              <h2 className={`text-xl font-bold ${kh ? 'font-khmer' : ''}`}>
                {t("The Female System", "ប្រព័ន្ធស្ត្រី")}
              </h2>
            </div>
            <p className={`text-slate-700 leading-relaxed mb-4 ${kh ? 'font-khmer' : ''}`}>
              {t(
                "The primary functions include producing eggs (ova), estrogen, and progesterone in the Ovaries, the Fallopian tubes for transport, and the Uterus (womb) where fetal development occurs.",
                "មុខងារចម្បងរួមមានការផលិតស៊ុត អេស្ត្រូសែន និងប្រូសេស្តេរ៉ូននៅក្នុងអូវែរ បំពង់ដៃស្បូនសម្រាប់ការដឹកជញ្ជូន និងស្បូនដែលការលូតលាស់របស់ទារកប្រព្រឹត្តទៅ។"
              )}
            </p>
          </div>
        </div>

        {/* Fertilization & Development */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-sm border border-indigo-100">
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <Dna className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Fertilization & Development", "ការបង្កកំណើត និងការលូតលាស់")}
            </h2>
          </div>
          <p className={`text-slate-700 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
            {t(
              "Fertilization occurs when a sperm cell and an egg cell combine to form a single-celled zygote. This zygote then divides and grows, eventually developing into an embryo.",
              "ការបង្កកំណើតកើតឡើងនៅពេលដែលកោសិកាមេជីវិតឈ្មោល និងកោសិកាស៊ុតរួមបញ្ចូលគ្នាបង្កើតបានជាស៊ីហ្កូតកោសិកាតែមួយ។ ស៊ីហ្កូតនេះបន្ទាប់មកបែងចែក និងលូតលាស់ ដោយទីបំផុតវិវត្តទៅជាអំប្រ៊ីយ៉ុង។"
            )}
          </p>
        </div>

      </div>
    </div>
  );
}

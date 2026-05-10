import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Bone, Shield, Activity, User, Layers, Move, Droplet, ListTree, Network, ChevronDown } from "lucide-react";

export default function SkeletalSystemPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className={`text-4xl font-bold text-slate-900 mb-6 ${kh ? 'font-khmer leading-relaxed' : 'font-display'}`}>
          {t("The Skeletal System", "ប្រព័ន្ធគ្រោងឆ្អឹង")}
        </h1>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4 text-slate-700">
            <Bone className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Introduction", "សេចក្តីផ្តើម")}
            </h2>
          </div>
          <p className={`text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
            {t(
              "The skeletal system is the internal framework of the human body. Composed of bones and cartilage, it provides structure, support, and protection for internal organs, while also enabling movement and producing blood cells.",
              "ប្រព័ន្ធគ្រោងឆ្អឹងគឺជារចនាសម្ព័ន្ធខាងក្នុងនៃរាងកាយមនុស្ស។ ផ្សំឡើងពីឆ្អឹង និងឆ្អឹងខ្ចី វាផ្តល់នូវរចនាសម្ព័ន្ធ ការគាំទ្រ និងការការពារសម្រាប់សរីរាង្គខាងក្នុង ព្រមទាំងជួយឱ្យមានចលនា និងផលិតកោសិកាឈាមផងដែរ។"
            )}
          </p>
        </div>

        {/* Key Functions */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-indigo-600" />
            <h2 className={`text-2xl font-bold text-slate-800 ${kh ? 'font-khmer' : 'font-display'}`}>
              {t("Key Functions", "មុខងារសំខាន់ៗ")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                titleEn: "Support & Shape",
                titleKh: "ការគាំទ្រ និងរូបរាង",
                icon: <User className="w-6 h-6 text-indigo-500" />,
                descEn: "Provides a rigid framework that supports the body and maintains its shape.",
                descKh: "ផ្តល់នូវរចនាសម្ព័ន្ធរឹងមាំដែលគាំទ្ររាងកាយ និងរក្សារូបរាងរបស់វា។"
              },
              {
                titleEn: "Protection",
                titleKh: "ការការពារ",
                icon: <Shield className="w-6 h-6 text-emerald-500" />,
                descEn: "Protects vital organs. For example, the skull protects the brain, and the rib cage protects the heart and lungs.",
                descKh: "ការពារសរីរាង្គសំខាន់ៗ។ ជាឧទាហរណ៍ លលាដ៍ក្បាលការពារខួរក្បាល ហើយទ្រុងឆ្អឹងជំនីការពារបេះដូង និងសួត។"
              },
              {
                titleEn: "Movement",
                titleKh: "ចលនា",
                icon: <Move className="w-6 h-6 text-blue-500" />,
                descEn: "Bones act as levers. When muscles attached to bones contract, they pull on the bones to create movement.",
                descKh: "ឆ្អឹងដើរតួជាដងថ្លឹង។ នៅពេលសាច់ដុំដែលជាប់នឹងឆ្អឹងកន្ត្រាក់ ពួកវាទាញឆ្អឹងដើម្បីបង្កើតចលនា។"
              },
              {
                titleEn: "Blood Cell Production",
                titleKh: "ការផលិតកោសិកាឈាម",
                icon: <Droplet className="w-6 h-6 text-rose-500" />,
                descEn: "The soft tissue inside some bones (bone marrow) produces red blood cells, white blood cells, and platelets.",
                descKh: "ជាលិកាទន់ខាងក្នុងឆ្អឹងខ្លះ (ខួរឆ្អឹង) ផលិតកោសិកាឈាមក្រហម កោសិកាឈាមស និងប្លាកែត។"
              }
            ].map((func, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex gap-4">
                <div className="shrink-0 mt-1">{func.icon}</div>
                <div>
                  <strong className={`block text-lg text-slate-800 mb-1 ${kh ? 'font-khmer' : ''}`}>
                    {kh ? func.titleKh : func.titleEn}
                  </strong>
                  <p className={`text-sm text-slate-600 leading-relaxed ${kh ? 'font-khmer' : ''}`}>
                    {kh ? func.descKh : func.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Major Components */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6 text-emerald-600">
            <Layers className="w-8 h-8" />
            <h2 className={`text-2xl font-bold ${kh ? 'font-khmer' : ''}`}>
              {t("Major Components", "សមាសធាតុសំខាន់ៗ")}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <strong className={`block text-slate-800 text-lg ${kh ? 'font-khmer' : ''}`}>
                  {t("Bones", "ឆ្អឹង")}
                </strong>
                <p className={`text-slate-600 text-sm mt-1 ${kh ? 'font-khmer' : ''}`}>
                  {t("Hard, dense connective tissue that forms most of the adult skeleton. An adult human has 206 bones.", "ជាលិកាតភ្ជាប់រឹង និងហាប់ណែន ដែលបង្កើតបានជាគ្រោងឆ្អឹងមនុស្សពេញវ័យភាគច្រើន។ មនុស្សពេញវ័យមានឆ្អឹង ២០៦។")}
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <strong className={`block text-slate-800 text-lg ${kh ? 'font-khmer' : ''}`}>
                  {t("Joints", "សន្លាក់")}
                </strong>
                <p className={`text-slate-600 text-sm mt-1 ${kh ? 'font-khmer' : ''}`}>
                  {t("The points where two or more bones meet, allowing for different types of movement (like hinge or ball-and-socket joints).", "ចំណុចដែលឆ្អឹងពីរ ឬច្រើនជួបគ្នា ដែលអនុញ្ញាតឱ្យមានចលនាប្រភេទផ្សេងៗ (ដូចជាសន្លាក់ត្រចៀកទ្វារ ឬសន្លាក់រាងមូល)។")}
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <strong className={`block text-slate-800 text-lg ${kh ? 'font-khmer' : ''}`}>
                  {t("Cartilage", "ឆ្អឹងខ្ចី")}
                </strong>
                <p className={`text-slate-600 text-sm mt-1 ${kh ? 'font-khmer' : ''}`}>
                  {t("A smooth, flexible tissue that covers the ends of bones at joints, reducing friction and acting as a shock absorber.", "ជាលិការលោង និងបត់បែនដែលគ្របដណ្តប់ចុងឆ្អឹងនៅសន្លាក់ កាត់បន្ថយការកកិត និងដើរតួជាអ្នកស្រូបយកការទង្គិច។")}
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <strong className={`block text-slate-800 text-lg ${kh ? 'font-khmer' : ''}`}>
                  {t("Ligaments", "សរសៃចំណង")}
                </strong>
                <p className={`text-slate-600 text-sm mt-1 ${kh ? 'font-khmer' : ''}`}>
                  {t("Strong bands of fibrous connective tissue that connect bones to other bones, stabilizing joints.", "បន្ទះសរសៃនៃជាលិកាតភ្ជាប់ដ៏រឹងមាំដែលភ្ជាប់ឆ្អឹងទៅនឹងឆ្អឹងផ្សេងទៀត ដើម្បីរក្សាលំនឹងសន្លាក់។")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The 206 Bones Directory */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6 text-rose-600">
            <ListTree className="w-8 h-8" />
            <h2 className={`text-2xl font-bold text-slate-800 ${kh ? 'font-khmer' : 'font-display'}`}>
              {t("The 206 Bones of the Human Body", "ឆ្អឹងទាំង ២០៦ នៃរាងកាយមនុស្ស")}
            </h2>
          </div>
          
          <div className="space-y-4">
            {/* Axial Skeleton */}
            <details className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Network className="w-6 h-6 text-rose-500" />
                  <span className={`text-lg font-bold text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                    {t("The Axial Skeleton (80 bones)", "គ្រោងឆ្អឹងអ័ក្ស (ឆ្អឹង ៨០)")}
                  </span>
                </div>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-5 pt-0 border-t border-slate-100">
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  
                  {/* The Skull */}
                  <div className="space-y-2">
                    <strong className={`block text-slate-800 border-b pb-2 ${kh ? 'font-khmer' : ''}`}>
                      {t("The Skull (22 bones)", "លលាដ៍ក្បាល (ឆ្អឹង ២២)")}
                    </strong>
                    <ul className={`text-sm text-slate-600 space-y-1 ${kh ? 'font-khmer' : ''}`}>
                      <li>{t("Cranial bones", "ឆ្អឹងសំបកក្បាល")}</li>
                      <li>{t("Facial bones", "ឆ្អឹងមុខ")}</li>
                    </ul>
                  </div>

                  {/* Associated Bones */}
                  <div className="space-y-2">
                    <strong className={`block text-slate-800 border-b pb-2 ${kh ? 'font-khmer' : ''}`}>
                      {t("Associated Bones (7 bones)", "ឆ្អឹងពាក់ព័ន្ធ (ឆ្អឹង ៧)")}
                    </strong>
                    <ul className={`text-sm text-slate-600 space-y-1 ${kh ? 'font-khmer' : ''}`}>
                      <li>{t("Auditory ossicles (Malleus, Incus, Stapes)", "ឆ្អឹងស្តាប់ (Malleus, Incus, Stapes)")}</li>
                      <li>{t("Hyoid bone", "ឆ្អឹងអណ្តាត")}</li>
                    </ul>
                  </div>

                  {/* Vertebral Column */}
                  <div className="space-y-2">
                    <strong className={`block text-slate-800 border-b pb-2 ${kh ? 'font-khmer' : ''}`}>
                      {t("Vertebral Column (26 bones)", "ជួរឈ្អឹងខ្នង (ឆ្អឹង ២៦)")}
                    </strong>
                    <ul className={`text-sm text-slate-600 space-y-1 ${kh ? 'font-khmer' : ''}`}>
                      <li>{t("Cervical, Thoracic, and Lumbar vertebrae", "ឆ្អឹងកំភួនក ឆ្អឹងទ្រូង និងឆ្អឹងចង្កេះ")}</li>
                      <li>{t("Sacrum", "ឆ្អឹងកញ្ចូញគូទ")}</li>
                      <li>{t("Coccyx (Tailbone)", "ឆ្អឹងកន្ទុយ")}</li>
                    </ul>
                  </div>

                  {/* Thoracic Cage */}
                  <div className="space-y-2">
                    <strong className={`block text-slate-800 border-b pb-2 ${kh ? 'font-khmer' : ''}`}>
                      {t("Thoracic Cage (25 bones)", "ទ្រុងឆ្អឹងជំនី (ឆ្អឹង ២៥)")}
                    </strong>
                    <ul className={`text-sm text-slate-600 space-y-1 ${kh ? 'font-khmer' : ''}`}>
                      <li>{t("Sternum (Breastbone)", "ឆ្អឹងសន្ទះទ្រូង")}</li>
                      <li>{t("Ribs", "ឆ្អឹងជំនី")}</li>
                    </ul>
                  </div>

                </div>
              </div>
            </details>

            {/* Appendicular Skeleton */}
            <details className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-blue-500" />
                  <span className={`text-lg font-bold text-slate-800 ${kh ? 'font-khmer' : ''}`}>
                    {t("The Appendicular Skeleton (126 bones)", "គ្រោងឆ្អឹងខ្នែង (ឆ្អឹង ១២៦)")}
                  </span>
                </div>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-5 pt-0 border-t border-slate-100">
                <div className="grid md:grid-cols-2 gap-6 mt-4">

                  {/* Pectoral Girdles */}
                  <div className="space-y-2">
                    <strong className={`block text-slate-800 border-b pb-2 ${kh ? 'font-khmer' : ''}`}>
                      {t("Pectoral Girdles (4 bones)", "ឆ្អឹងក្រវាត់ស្មា (ឆ្អឹង ៤)")}
                    </strong>
                    <ul className={`text-sm text-slate-600 space-y-1 ${kh ? 'font-khmer' : ''}`}>
                      <li>{t("Clavicle (Collarbone)", "ឆ្អឹងដងកាំបិត")}</li>
                      <li>{t("Scapula (Shoulder blade)", "ឆ្អឹងស្លាបប្រចៀវ")}</li>
                    </ul>
                  </div>

                  {/* Upper Limbs */}
                  <div className="space-y-2">
                    <strong className={`block text-slate-800 border-b pb-2 ${kh ? 'font-khmer' : ''}`}>
                      {t("Upper Limbs (60 bones)", "អវយវៈខាងលើ (ឆ្អឹង ៦០)")}
                    </strong>
                    <ul className={`text-sm text-slate-600 space-y-1 ${kh ? 'font-khmer' : ''}`}>
                      <li>{t("Humerus (Upper arm)", "ឆ្អឹងដើមដៃ")}</li>
                      <li>{t("Radius & Ulna (Forearm)", "ឆ្អឹងកំភួនដៃ")}</li>
                      <li>{t("Carpals (Wrist)", "ឆ្អឹងកដៃ")}</li>
                      <li>{t("Metacarpals (Hand)", "ឆ្អឹងបាតដៃ")}</li>
                      <li>{t("Phalanges (Fingers)", "ឆ្អឹងម្រាមដៃ")}</li>
                    </ul>
                  </div>

                  {/* Pelvic Girdle */}
                  <div className="space-y-2">
                    <strong className={`block text-slate-800 border-b pb-2 ${kh ? 'font-khmer' : ''}`}>
                      {t("Pelvic Girdle (2 bones)", "ឆ្អឹងត្រគាក (ឆ្អឹង ២)")}
                    </strong>
                    <ul className={`text-sm text-slate-600 space-y-1 ${kh ? 'font-khmer' : ''}`}>
                      <li>{t("Hip bones (Ilium, Ischium, Pubis)", "ឆ្អឹងត្រគាក (Ilium, Ischium, Pubis)")}</li>
                    </ul>
                  </div>

                  {/* Lower Limbs */}
                  <div className="space-y-2">
                    <strong className={`block text-slate-800 border-b pb-2 ${kh ? 'font-khmer' : ''}`}>
                      {t("Lower Limbs (60 bones)", "អវយវៈខាងក្រោម (ឆ្អឹង ៦០)")}
                    </strong>
                    <ul className={`text-sm text-slate-600 space-y-1 ${kh ? 'font-khmer' : ''}`}>
                      <li>{t("Femur (Thigh bone)", "ឆ្អឹងភ្លៅ")}</li>
                      <li>{t("Patella (Kneecap)", "ឆ្អឹងអង្គង់")}</li>
                      <li>{t("Tibia (Shin bone) & Fibula (Calf bone)", "ឆ្អឹងស្មងជើង និងឆ្អឹងកំភួនជើង")}</li>
                      <li>{t("Tarsals (Ankle)", "ឆ្អឹងកជើង")}</li>
                      <li>{t("Metatarsals (Foot)", "ឆ្អឹងបាតជើង")}</li>
                      <li>{t("Phalanges (Toes)", "ឆ្អឹងម្រាមជើង")}</li>
                    </ul>
                  </div>

                </div>
              </div>
            </details>
          </div>
        </div>

      </div>
    </div>
  );
}

import { Lightbulb } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

/**
 * Search entry for "The Incandescent Bulb: Let There Be Light" module
 * inside the Electrical Safety page. Lives at /electrical-safety#incandescent-bulb.
 */
export const searchMeta: SearchEntry = {
  id: "electrical-safety-incandescent-bulb",
  type: "module",
  href: "/electrical-safety#incandescent-bulb",
  icon: Lightbulb,
  titleEn: "The Incandescent Bulb: Let There Be Light",
  titleKh: "អំពូលភ្លើងតាំង៖ ការបង្កើតពន្លឺ",
  categoryEn: "Electricity",
  categoryKh: "អគ្គិសនី",
  descEn:
    "How Edison's 1879 lightbulb actually works — a tungsten filament heated to 2,500°C inside a vacuum or inert-gas globe so it can glow without burning up. Why bulbs burn out (the metal slowly evaporates), the difference between Watts (energy in) and Lumens (light out), and why 90% of the energy is wasted as dangerous heat — pushing the world toward LEDs.",
  descKh:
    "របៀបដែលអំពូលរបស់ Edison ឆ្នាំ ១៨៧៩ ដំណើរការពិតប្រាកដ — ខ្សែហ្វីឡាម៉ង់តង់ស្ទែនត្រូវកម្តៅរហូតដល់ ២,៥០០°C ក្នុងបាល់កែវដែលបូមខ្យល់ចេញ ឬមានឧស្ម័នអសកម្ម ដើម្បីឲ្យវាភ្លឺដោយមិនឆេះ។ មូលហេតុដែលអំពូលរលត់ (លោហៈបង្ហើរយឺតៗ) ភាពខុសគ្នារវាងវ៉ាត់ (ថាមពលចូល) និងលូម៉ែន (ពន្លឺចេញ) និងមូលហេតុដែល ៩០% នៃថាមពលត្រូវខ្ជះខ្ជាយជាកំដៅគ្រោះថ្នាក់ — ជំរុញពិភពលោកទៅរក LED។",
  keywordsEn: [
    "lightbulb", "light bulb", "bulb", "incandescent", "incandescent bulb",
    "electricity", "electrical",
    "wattage", "watt", "watts",
    "lumen", "lumens", "brightness",
    "edison", "thomas edison", "1879",
    "filament", "tungsten",
    "vacuum", "inert gas", "argon",
    "burned out", "burn out",
    "led", "leds", "energy efficient",
    "heat", "burn", "safety",
  ],
  keywordsKh: [
    "អំពូល", "អំពូលភ្លើង", "អំពូលភ្លើងតាំង",
    "អគ្គិសនី",
    "វ៉ាត់", "កម្លាំងវ៉ាត់",
    "លូម៉ែន", "ពន្លឺ",
    "Edison", "Thomas Edison", "ឆ្នាំ ១៨៧៩",
    "ខ្សែហ្វីឡាម៉ង់", "ហ្វីឡាម៉ង់", "តង់ស្ទែន",
    "បូមខ្យល់ចេញ", "ឧស្ម័នអសកម្ម",
    "រលត់", "ដាច់",
    "LED", "សន្សំសំចៃថាមពល",
    "កំដៅ", "សុវត្ថិភាព",
  ],
};

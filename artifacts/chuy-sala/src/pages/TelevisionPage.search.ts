import { Radio } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

/**
 * Search entry for "The Invisible Command: How a TV Remote Works" module
 * inside the Television page. Lives at /technology/television#remote-control.
 */
export const searchMeta: SearchEntry = {
  id: "technology-television-remote-control",
  type: "module",
  href: "/technology/television#remote-control",
  icon: Radio,
  titleEn: "The Invisible Command: How a TV Remote Works",
  titleKh: "បញ្ជាមើលមិនឃើញ៖ របៀបបញ្ជាទូរទស្សន៍ដំណើរការ",
  categoryEn: "Technology",
  categoryKh: "បច្ចេកវិទ្យា",
  descEn:
    "How a TV remote actually fires invisible Infrared (IR) light at the television. The bulb is an LED, but the wavelength is too long for human eyes. Every button flashes its own binary code (e.g. 10110 for Volume Up) at the IR sensor. Plus a try-it-now smartphone experiment — point the remote at your phone's camera and you can SEE the invisible flash on screen as bright purple-white light.",
  descKh:
    "របៀបដែលបញ្ជាទូរទស្សន៍បាញ់ពន្លឺអ៊ីនហ្វ្រារ៉េដ (IR) មើលមិនឃើញទៅកាន់ទូរទស្សន៍ពិតប្រាកដ។ អំពូលគឺជា LED ប៉ុន្តែរលកវែងពេកសម្រាប់ភ្នែកមនុស្ស។ គ្រប់ប៊ូតុងភ្លឹបភ្លែតកូដគោលពីរផ្ទាល់ខ្លួនរបស់វា (ឧ. 10110 សម្រាប់បង្កើនសំឡេង) ទៅកាន់សិន្ធុ IR។ បូករួមជាមួយការពិសោធន៍ស្មាតហ្វូន — តម្រង់បញ្ជាទៅកាមេរ៉ាទូរស័ព្ទ ហើយអ្នកអាចមើលឃើញពន្លឺមើលមិនឃើញនៅលើអេក្រង់ជាពន្លឺពណ៌ស្វាយ-សភ្លឺ។",
  keywordsEn: [
    "remote", "remote control", "tv remote", "television remote",
    "infrared", "ir", "infrared light", "ir light",
    "television", "tv",
    "signal", "ir signal", "ir sensor",
    "binary", "binary code", "code",
    "led", "wavelength",
    "smartphone camera experiment", "camera trick",
    "invisible light", "invisible command",
  ],
  keywordsKh: [
    "បញ្ជា", "បញ្ជាទូរទស្សន៍",
    "អ៊ីនហ្វ្រារ៉េដ", "ពន្លឺអ៊ីនហ្វ្រារ៉េដ", "IR",
    "ទូរទស្សន៍",
    "សញ្ញា", "សិន្ធុ",
    "កូដគោលពីរ", "Binary", "កូដ",
    "LED", "រលក",
    "ការពិសោធន៍ទូរស័ព្ទ", "កាមេរ៉ា",
    "ពន្លឺមើលមិនឃើញ", "បញ្ជាមើលមិនឃើញ",
  ],
};

import { Activity } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "science-fourier-transform",
  type: "page",
  href: "/science/fourier-transform",
  icon: Activity,
  titleEn: "Fourier Transformation: The Secret Recipe of Waves",
  titleKh: "ការបំប្លែង Fourier៖ រូបមន្តសម្ងាត់នៃរលក",
  categoryEn: "Science",
  categoryKh: "វិទ្យាសាស្ត្រ",
  descEn:
    "The math that pulls any signal apart into the pure tones (frequencies) it is made of — explained with the smoothie analogy, the Time vs Frequency view, and the three places it changed the world: MP3 music, MRI medical imaging, and Wi-Fi.",
  descKh:
    "គណិតវិទ្យាដែលបំបែកសញ្ញាណាមួយទៅជាសំឡេងសុទ្ធ (ប្រេកង់) ដែលវាបង្កើតឡើង — ពន្យល់ដោយការប្រៀបធៀបជាមួយទឹកក្រឡុក ទិដ្ឋភាពពេលវេលា ធៀបនឹងប្រេកង់ និងកន្លែងបីដែលវាបានផ្លាស់ប្តូរពិភពលោក៖ តន្ត្រី MP3 រូបភាពពេទ្យ MRI និង Wi-Fi។",
  keywordsEn: [
    "fourier", "fourier transform", "fourier transformation", "fft",
    "joseph fourier", "frequencies", "frequency", "frequency domain", "time domain",
    "sine wave", "sine waves", "cosine", "wave", "waves", "waveform",
    "signal processing", "signal", "spectrum", "spectral", "harmonic", "harmonics",
    "oscilloscope", "oscillator", "vibration",
    "mp3", "music compression", "audio compression", "lossy", "codec",
    "mri", "medical imaging", "ct scan", "ct", "imaging",
    "wifi", "wi-fi", "ofdm", "radio", "telecommunications",
    "smoothie analogy", "mathematics", "applied math", "calculus",
    "integral", "transform",
  ],
  keywordsKh: [
    "ការបំប្លែង", "Fourier", "ហ្វូរីយេ",
    "ប្រេកង់", "ដែនប្រេកង់", "ដែនពេលវេលា", "ពេលវេលា",
    "រលកស៊ីនុស", "រលក", "ទម្រង់រលក",
    "ការដំណើរការសញ្ញា", "សញ្ញា", "វិសាលគម", "អាម៉ូនិច",
    "បណ្តាញវាស់រលក",
    "MP3", "តន្ត្រី", "ការបង្ហាប់សំឡេង",
    "MRI", "រូបភាពពេទ្យ", "ការថត CT",
    "Wi-Fi", "វិទ្យុ", "ទូរគមនាគមន៍",
    "ទឹកក្រឡុក", "គណិតវិទ្យា", "អាំងតេក្រាល",
  ],
};

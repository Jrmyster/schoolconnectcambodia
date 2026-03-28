export const PROVINCE_KH: Record<string, string> = {
  "Banteay Meanchey": "បន្ទាយមានជ័យ",
  "Battambang":       "បាត់ដំបង",
  "Kampong Cham":     "កំពង់ចាម",
  "Kampong Chhnang":  "កំពង់ឆ្នាំង",
  "Kampong Speu":     "កំពង់ស្ពឺ",
  "Kampong Thom":     "កំពង់ធំ",
  "Kampot":           "កំពត",
  "Kandal":           "កណ្តាល",
  "Kep":              "កែប",
  "Koh Kong":         "កោះកុង",
  "Kratié":           "ក្រចេះ",
  "Mondulkiri":       "មណ្ឌលគីរី",
  "Oddar Meanchey":   "ឧត្តរមានជ័យ",
  "Pailin":           "ប៉ៃលិន",
  "Phnom Penh":       "ភ្នំពេញ",
  "Preah Sihanouk":   "ព្រះសីហនុ",
  "Preah Vihear":     "ព្រះវិហារ",
  "Prey Veng":        "ព្រៃវែង",
  "Pursat":           "ពោធិ៍សាត់",
  "Ratanakiri":       "រតនគីរី",
  "Siem Reap":        "សៀមរាប",
  "Stung Treng":      "ស្ទឹងត្រែង",
  "Svay Rieng":       "ស្វាយរៀង",
  "Takéo":            "តាកែវ",
  "Tboung Khmum":     "ត្បូងឃ្មុំ",
};

export function localizeProvince(province: string, language: string): string {
  if (language !== "kh") return province;
  return PROVINCE_KH[province] ?? province;
}

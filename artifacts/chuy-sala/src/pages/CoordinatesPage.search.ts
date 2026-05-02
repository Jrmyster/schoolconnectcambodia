import { Compass } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "study-coordinates",
  type: "page",
  href: "/study-center/coordinates",
  icon: Compass,
  titleEn: "Coordinates — Latitude, Longitude & GPS",
  titleKh: "កូអរដោនេ — រយៈទទឹង រយៈបណ្ដោយ និង GPS",
  categoryEn: "Geography",
  categoryKh: "ភូមិសាស្ត្រ",
  descEn:
    "How to pin any spot on Earth in two numbers — the equator, the prime meridian, time zones, and the satellite math that makes Google Maps possible.",
  descKh:
    "របៀបកំណត់ទីតាំងណាមួយលើផែនដីក្នុងលេខពីរ — បន្ទាត់អេក្វាទ័រ បន្ទាត់មេឌៀន ល្វែងពេលវេលា និងគណិតវិទ្យាផ្កាយរណបដែលធ្វើឲ្យ Google Maps អាចមាន។",
  keywordsEn: [
    "coordinates", "latitude", "longitude", "GPS",
    "equator", "prime meridian", "time zone",
    "navigation", "google maps", "geolocation",
    "compass", "map skills",
    "satellite", "satellites", "trilateration", "constellation",
    "altitude", "speed of light", "atomic clock",
  ],
  keywordsKh: [
    "កូអរដោនេ", "រយៈទទឹង", "រយៈបណ្ដោយ", "GPS",
    "បន្ទាត់អេក្វាទ័រ", "ផ្កាយរណប", "ល្វែងពេលវេលា",
    "ត្រីវិស័យ",
    "បណ្តាញផ្កាយរណប", "ការវាស់ចម្ងាយត្រីកោណ",
    "កម្ពស់", "ល្បឿនពន្លឺ", "នាឡិកាអាតូម",
  ],
};

import { Microscope } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "biology-microscopes",
  type: "page",
  href: "/science/biology/microscopes",
  icon: Microscope,
  titleEn: "Microscopes — Seeing the Invisible",
  titleKh: "មីក្រូទស្សន៍ — ឃើញរបស់ដែលមើលមិនឃើញ",
  categoryEn: "Biology",
  categoryKh: "ជីវវិទ្យា",
  descEn:
    "From Leeuwenhoek's hand-blown lens to electron microscopes — magnification, resolution, staining, and how to actually use a school microscope.",
  descKh:
    "ពីកញ្ចក់ផ្លុំដោយដៃរបស់ Leeuwenhoek ដល់មីក្រូទស្សន៍អេឡិចត្រុង — ការពង្រីក គុណភាពឈ្ងោចគ្នា ការជ្រលក់ពណ៌ និងរបៀបប្រើមីក្រូទស្សន៍សាលាជាក់ស្ដែង។",
  keywordsEn: [
    "microscope", "microscopes", "magnification", "lens",
    "leeuwenhoek", "electron microscope", "SEM", "TEM",
    "staining", "slide", "objective lens", "eyepiece",
    "compound microscope",
  ],
  keywordsKh: [
    "មីក្រូទស្សន៍", "ការពង្រីក", "កញ្ចក់ខាងក្រោម",
    "មីក្រូទស្សន៍អេឡិចត្រុង", "ការជ្រលក់ពណ៌",
  ],
};

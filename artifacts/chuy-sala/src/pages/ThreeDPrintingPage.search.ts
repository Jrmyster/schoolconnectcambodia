import { Factory } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "tech-3d-printing",
  type: "page",
  href: "/technology/3d-printing",
  icon: Factory,
  titleEn: "3D Printing & Additive Manufacturing",
  titleKh: "ការបោះពុម្ព៣វិមាត្រ និងផលិតកម្មបន្ថែម",
  categoryEn: "Technology",
  categoryKh: "បច្ចេកវិទ្យា",
  descEn:
    "How a printer builds objects layer by layer from plastic, metal, or even living cells — from prototypes to rocket parts.",
  descKh:
    "របៀបម៉ាស៊ីនបោះពុម្ពសាងសង់វត្ថុមួយស្រទាប់នៅពេលមួយ ពីប្លាស្ទិច ដែក ឬសូម្បីកោសិកា — ពីគំរូ ដល់គ្រឿងមីស៊ីល។",
  keywordsEn: [
    "3d printing", "3d print", "3d printer", "additive manufacturing", "additive",
    "fdm", "sla", "sls", "filament", "resin", "extrusion",
    "prototype", "rapid prototyping", "layer", "stl", "slicer",
    "manufacturing", "fabrication", "printing technology", "bioprinting",
    "rocket parts", "spacex", "nasa printing", "metal printing",
    // APM (atomically precise manufacturing) — speculative-future section
    "apm", "atomically precise manufacturing", "atomic manufacturing",
    "nano", "nanotech", "nanotechnology", "nano-builder",
    "mechanosynthesis", "molecular manufacturing", "molecular assembler",
    "diamond crystal", "carbon nanotubes", "post-scarcity", "end of scarcity",
    "drexler", "feynman bottom there is plenty of room",
  ],
  keywordsKh: [
    "ការបោះពុម្ព៣វិមាត្រ", "បោះពុម្ព ៣D", "ផលិតកម្មបន្ថែម",
    "ម៉ាស៊ីនបោះពុម្ព៣វិមាត្រ", "ប្លាស្ទិច", "ដែក", "គំរូ", "ស្រទាប់",
    "បច្ចេកវិទ្យាបោះពុម្ព", "ផលិតកម្ម",
    // APM Khmer
    "ការផលិតដោយភាពជាក់លាក់កម្រិតអាតូម", "អ្នកសាងសង់ណាណូ",
    "ការសំយោគមេកានិច", "ណាណូ", "អាតូម", "ពេជ្រ", "បំពង់ណាណូកាបោន",
    "ទីបញ្ចប់នៃភាពខ្វះខាត",
  ],
};

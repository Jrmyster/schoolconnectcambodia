import { Sigma } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "mathematics-tensors",
  type: "page",
  href: "/mathematics/tensors",
  icon: Sigma,
  titleEn: "Introduction to Tensors",
  titleKh: "សេចក្ដីណែនាំអំពីតង់ស័រ",
  categoryEn: "Mathematics",
  categoryKh: "គណិតវិទ្យា",
  descEn:
    "Tensors generalise scalars, vectors, and matrices into a unified language. Covers rank, the stress cube (σᵢⱼ, traction vectors), tensor product ⊗, commutator [x,y]=xy−yx, Einstein summation, Levi-Civita symbol, and an introduction to algebraic K-theory K*(F).",
  descKh:
    "តង់ស័រធ្វើឱ្យ scalar vector និងម៉ាទ្រីសក្លាយជាភាសាតែមួយ។ គ្របដណ្ដប់ឋានៈ គូបស្ត្រេស (σᵢⱼ, T^(eᵢ)) ផ្លែ ⊗ commutator [x,y] ច្បាប់ Einstein និងការណែនាំ K-theory។",
  keywordsEn: [
    "tensor", "tensors", "introduction to tensors",
    "rank", "tensor rank", "scalar", "vector", "matrix",
    "stress tensor", "stress cube", "cauchy stress",
    "sigma", "sigma ij", "normal stress", "shear stress", "traction vector",
    "tensor product", "outer product",
    "commutator", "lie bracket",
    "einstein summation", "einstein convention", "index notation",
    "kronecker delta", "levi-civita", "antisymmetric tensor",
    "contravariant", "covariant", "upper index", "lower index",
    "k-theory", "algebraic k-theory", "milnor k-theory",
    "leibniz rule", "product rule", "covariant derivative",
    "linear algebra", "multilinear", "general relativity", "quantum mechanics",
    "mathematics", "advanced mathematics",
  ],
  keywordsKh: [
    "តង់ស័រ", "ការណែនាំអំពីតង់ស័រ",
    "ឋានៈ", "ស្កាឡ", "វ៉ិចទ័រ", "ម៉ាទ្រីស",
    "ស្ត្រេស", "គូបស្ត្រេស",
    "ផ្លែតង់ស័រ",
    "commutator",
    "ច្បាប់ Einstein", "eur notation",
    "K-theory",
    "ច្បាប់ Leibniz", "ដេរីវេ covariant",
    "គណិតវិទ្យា", "គណិតកម្រិតខ្ពស់",
  ],
};

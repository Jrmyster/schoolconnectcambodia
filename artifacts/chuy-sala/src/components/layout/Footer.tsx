import { STEM_SITE_URL } from "@/config/sites";
export function Footer() {
  return (
    <footer className="bg-slate-950 text-white p-8 flex flex-wrap gap-6">
      <span>© {new Date().getFullYear()} School Connect Map</span>
      <a href={STEM_SITE_URL} target="_blank" rel="noopener noreferrer">
        STEM Hub ↗
      </a>
    </footer>
  );
}

import { useState } from "react";
import { Link } from "wouter";
import { useListSchools } from "@workspace/api-client-react";
import CambodiaEarth from "@/features/cambodia-earth/components/CambodiaEarth";
import { useTranslation, useLanguageStore } from "@/store/use-language";
export function MapPage() {
  const t = useTranslation(),
    kh = useLanguageStore((s) => s.language) === "kh";
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, refetch } = useListSchools();
  const schools = Array.isArray(data) ? data : [];
  const visible = schools.filter((s) =>
    `${s.nameEn} ${s.nameKh} ${s.province}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <>
      <CambodiaEarth schools={schools} />
      <section className="max-w-6xl mx-auto p-6 space-y-4" id="schools">
        <h2 className="text-2xl font-bold">
          {t("School Directory", "បញ្ជីសាលារៀន")}
        </h2>
        <label className="block">
          {t("Search schools or provinces", "ស្វែងរកសាលា ឬខេត្ត")}
          <input
            className="block w-full border rounded-lg p-3 mt-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        {isLoading && (
          <p role="status">{t("Loading schools…", "កំពុងផ្ទុកសាលា…")}</p>
        )}
        {isError && (
          <div role="alert">
            {t(
              "School data is unavailable. The landscape explorer remains available.",
              "ទិន្នន័យសាលាមិនអាចប្រើបាន។ ផែនទីនៅតែអាចប្រើបាន។",
            )}{" "}
            <button className="underline" onClick={() => void refetch()}>
              {t("Retry", "ព្យាយាមម្តងទៀត")}
            </button>
          </div>
        )}
        {!isLoading && !isError && visible.length === 0 && (
          <p>{t("No schools found.", "រកមិនឃើញសាលា។")}</p>
        )}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visible.map((s) => (
            <li key={s.id}>
              <Link
                href={`/school/${s.id}`}
                className="block border rounded-xl p-4 hover:bg-sky-50"
              >
                <strong>{kh ? s.nameKh : s.nameEn}</strong>
                <p>{s.province}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import { useLanguage } from "../lib/i18n/LanguageContext";

interface NeighborhoodOut {
  name: string;
  safety_score?: number;
  water_score?: number;
  electricity_score?: number;
  internet_score?: number;
  transport_score?: number;
  school_proximity_score?: number;
  hospital_proximity_score?: number;
  cost_of_living_score?: number;
}

export default function NeighborhoodScore({ neighborhoodId }: { neighborhoodId?: string }) {
  const { t } = useLanguage();
  const [data, setData] = useState<NeighborhoodOut | null>(null);

  useEffect(() => {
    if (!neighborhoodId) return;
    apiGet<NeighborhoodOut>(`/neighborhoods/${neighborhoodId}`).then(setData).catch(() => setData(null));
  }, [neighborhoodId]);

  if (!data) return <p className="text-sm text-gray-500">{t("neighborhood.noData")}</p>;

  const rows: [string, number | undefined][] = [
    [t("neighborhood.safety"), data.safety_score],
    [t("neighborhood.water"), data.water_score],
    [t("neighborhood.electricity"), data.electricity_score],
    [t("neighborhood.internet"), data.internet_score],
    [t("neighborhood.transport"), data.transport_score],
    [t("neighborhood.school"), data.school_proximity_score],
    [t("neighborhood.hospital"), data.hospital_proximity_score],
    [t("neighborhood.costOfLiving"), data.cost_of_living_score],
  ];

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold mb-2">{t("neighborhood.heading", { name: data.name })}</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between border-b py-1">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium">{value ?? "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

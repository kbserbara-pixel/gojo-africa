"use client";
import { useState } from "react";
import { apiPost } from "../lib/api";
import { useLanguage } from "../lib/i18n/LanguageContext";

interface ResultItem {
  property_id: string;
  title: string;
  explanation: string;
  score_breakdown: Record<string, number>;
}

export default function ChatHunter() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await apiPost<{ results: ResultItem[] }>("/ai/search", { query });
      setResults(data.results);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          className="border rounded-lg px-3 py-2 flex-1"
          placeholder={t("chatHunter.placeholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch} className="bg-emerald-700 text-white rounded-lg px-4 py-2">
          {loading ? t("chatHunter.searching") : t("chatHunter.search")}
        </button>
      </div>
      <div className="mt-6 space-y-3">
        {results.map((r) => (
          <div key={r.property_id} className="border rounded-lg p-4 bg-white">
            <h4 className="font-semibold">{r.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{r.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

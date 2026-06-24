"use client";
import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { apiPost, apiGet } from "../../lib/api";
import { getUser, AuthUser } from "../../lib/auth";
import { useLanguage } from "../../lib/i18n/LanguageContext";

interface Match {
  user_id: string;
  compatibility_score: number;
}

export default function HousematesPage() {
  const { t } = useLanguage();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [lifestyle, setLifestyle] = useState("");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [finding, setFinding] = useState(false);
  const [matches, setMatches] = useState<Match[] | null>(null);

  useEffect(() => {
    setUser(getUser());
    setCheckedAuth(true);
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setSaving(true);
    try {
      await apiPost("/housemates/profile", {
        user_id: user.id,
        budget_min: Number(budgetMin),
        budget_max: Number(budgetMax),
        lifestyle: { notes: lifestyle },
      });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? t("housematesPage.error") : t("housematesPage.genericError"));
    } finally {
      setSaving(false);
    }
  }

  async function handleFindMatches() {
    if (!user) return;
    setFinding(true);
    try {
      const data = await apiGet<{ matches: Match[] }>(`/housemates/matches/${user.id}`);
      setMatches(data.matches);
    } catch {
      setMatches([]);
    } finally {
      setFinding(false);
    }
  }

  if (!checkedAuth) return null;

  if (!user) {
    return (
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-emerald-800 mb-2">{t("housematesPage.title")}</h1>
        <p className="text-gray-600">
          {t("housematesPage.needLogin")}{" "}
          <Link href="/login" className="text-emerald-700 underline">
            {t("housematesPage.loginLink")}
          </Link>{" "}
          {t("housematesPage.or")}{" "}
          <Link href="/register" className="text-emerald-700 underline">
            {t("housematesPage.createAccountLink")}
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-emerald-800 mb-2">{t("housematesPage.title")}</h1>
      <p className="text-gray-600 mb-6">{t("housematesPage.intro")}</p>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t("housematesPage.budgetMinLabel")}</label>
            <input
              type="number"
              required
              min={0}
              className="w-full border rounded-lg px-3 py-2"
              value={budgetMin}
              onChange={(e) => setBudgetMin(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("housematesPage.budgetMaxLabel")}</label>
            <input
              type="number"
              required
              min={0}
              className="w-full border rounded-lg px-3 py-2"
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("housematesPage.lifestyleLabel")}</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            placeholder={t("housematesPage.lifestylePlaceholder")}
            value={lifestyle}
            onChange={(e) => setLifestyle(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {saved && <p className="text-emerald-700 text-sm">{t("housematesPage.profileSaved")}</p>}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-emerald-700 text-white rounded-lg px-4 py-2 disabled:opacity-60"
        >
          {saving ? t("housematesPage.saving") : t("housematesPage.saveProfile")}
        </button>
      </form>

      <button
        onClick={handleFindMatches}
        disabled={finding}
        className="w-full mt-4 border border-emerald-700 text-emerald-700 rounded-lg px-4 py-2 disabled:opacity-60"
      >
        {finding ? t("housematesPage.finding") : t("housematesPage.findMatches")}
      </button>

      {matches !== null && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">{t("housematesPage.matchesTitle")}</h2>
          {matches.length === 0 ? (
            <p className="text-gray-500 text-sm">{t("housematesPage.noMatches")}</p>
          ) : (
            <div className="space-y-2">
              {matches.map((m) => (
                <div key={m.user_id} className="border rounded-lg p-3 bg-white flex items-center justify-between">
                  <span className="text-sm text-gray-700">{m.user_id}</span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    {t("housematesPage.compatibility", { score: Math.round(m.compatibility_score) })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

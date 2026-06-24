"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiPost, apiGetAuth } from "../../lib/api";
import { saveSession, AuthUser } from "../../lib/auth";
import { useLanguage } from "../../lib/i18n/LanguageContext";

export default function LoginPage() {
  const router = useRouter();
  const { t, setLocale } = useLanguage();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { access_token } = await apiPost<{ access_token: string }>("/auth/login", {
        phone,
        password,
      });
      const user = await apiGetAuth<AuthUser>("/auth/me", access_token);
      saveSession(access_token, user);
      // Switch the UI to the account's saved language preference, if set.
      if (user.locale === "am" || user.locale === "en") setLocale(user.locale);
      router.push("/marketplace");
    } catch (err) {
      setError(err instanceof Error ? t("loginPage.error") : t("loginPage.genericError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-emerald-800 mb-6">{t("loginPage.title")}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("loginPage.phone")}</label>
          <input
            type="tel"
            required
            className="w-full border rounded-lg px-3 py-2"
            placeholder="+251 9XX XXX XXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("loginPage.password")}</label>
          <input
            type="password"
            required
            className="w-full border rounded-lg px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-700 text-white rounded-lg px-4 py-2 disabled:opacity-60"
        >
          {loading ? t("loginPage.submitting") : t("loginPage.submit")}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        {t("loginPage.noAccount")}{" "}
        <Link href="/register" className="text-emerald-700 underline">
          {t("loginPage.signupLink")}
        </Link>
      </p>
    </div>
  );
}

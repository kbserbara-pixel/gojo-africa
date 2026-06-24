"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiPost, apiGetAuth } from "../../lib/api";
import { saveSession, AuthUser } from "../../lib/auth";
import { useLanguage } from "../../lib/i18n/LanguageContext";

const ROLE_VALUES = ["renter", "landlord", "agent", "provider"] as const;

export default function RegisterPage() {
  const router = useRouter();
  const { t, locale, setLocale } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("renter");
  const [isDiaspora, setIsDiaspora] = useState(false);
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    if (!trimmedPhone && !trimmedEmail) {
      setError(t("registerPage.contactRequiredError"));
      return;
    }

    setLoading(true);
    try {
      await apiPost("/auth/register", {
        full_name: fullName,
        phone: trimmedPhone || undefined,
        email: trimmedEmail || undefined,
        password,
        role,
        locale, // save the language the user registered in as their preference
        is_diaspora: isDiaspora,
        country_of_residence: isDiaspora ? countryOfResidence || undefined : undefined,
      });

      // Auto-login right after registration so the user lands signed in.
      // Use whichever of email/phone was actually provided as the identifier.
      const { access_token } = await apiPost<{ access_token: string }>("/auth/login", {
        identifier: trimmedEmail || trimmedPhone,
        password,
      });
      const user = await apiGetAuth<AuthUser>("/auth/me", access_token);
      saveSession(access_token, user);
      if (user.locale === "am" || user.locale === "en") setLocale(user.locale);
      router.push("/marketplace");
    } catch (err) {
      setError(err instanceof Error ? t("registerPage.error") : t("registerPage.genericError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-emerald-800 mb-6">{t("registerPage.title")}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("registerPage.fullName")}</label>
          <input
            required
            className="w-full border rounded-lg px-3 py-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <p className="text-xs text-gray-500">{t("registerPage.contactHint")}</p>
        <div>
          <label className="block text-sm font-medium mb-1">{t("registerPage.phone")}</label>
          <input
            type="tel"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="+251 9XX XXX XXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("registerPage.email")}</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("registerPage.password")}</label>
          <input
            type="password"
            required
            minLength={4}
            className="w-full border rounded-lg px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("registerPage.roleLabel")}</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {ROLE_VALUES.map((value) => (
              <option key={value} value={value}>
                {t(`registerPage.roles.${value}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="diaspora"
            checked={isDiaspora}
            onChange={(e) => setIsDiaspora(e.target.checked)}
          />
          <label htmlFor="diaspora" className="text-sm">
            {t("registerPage.diasporaCheckbox")}
          </label>
        </div>
        {isDiaspora && (
          <div>
            <label className="block text-sm font-medium mb-1">{t("registerPage.countryOfResidence")}</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={countryOfResidence}
              onChange={(e) => setCountryOfResidence(e.target.value)}
            />
          </div>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-700 text-white rounded-lg px-4 py-2 disabled:opacity-60"
        >
          {loading ? t("registerPage.submitting") : t("registerPage.submit")}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        {t("registerPage.haveAccount")}{" "}
        <Link href="/login" className="text-emerald-700 underline">
          {t("registerPage.loginLink")}
        </Link>
      </p>
    </div>
  );
}

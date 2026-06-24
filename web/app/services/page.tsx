"use client";
import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import TrustBadge from "../../components/TrustBadge";
import { apiGet, apiPost } from "../../lib/api";
import { getUser, AuthUser } from "../../lib/auth";
import { useLanguage } from "../../lib/i18n/LanguageContext";

const SERVICE_TYPE_VALUES = [
  "mover",
  "cleaner",
  "furniture",
  "internet_provider",
  "maintenance",
  "insurance",
] as const;

interface Provider {
  id: string;
  full_name: string;
  trust_score: number;
}

export default function ServicesPage() {
  const { t, locale } = useLanguage();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);

  const [providerId, setProviderId] = useState("");
  const [serviceType, setServiceType] = useState<string>(SERVICE_TYPE_VALUES[0]);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState<{ status: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUser(getUser());
    setCheckedAuth(true);
    apiGet<Provider[]>("/services/providers")
      .then((data) => {
        setProviders(data);
        if (data.length > 0) setProviderId(data[0].id);
      })
      .catch(() => setProviders([]));
  }, []);

  async function handleBook(e: FormEvent) {
    e.preventDefault();
    if (!user || !providerId) return;
    setError(null);
    setBooking(true);
    try {
      const result = await apiPost<{ status: string }>("/services/bookings", {
        user_id: user.id,
        provider_id: providerId,
        service_type: serviceType,
      });
      setBooked(result);
    } catch {
      setError(t("servicesPage.error"));
    } finally {
      setBooking(false);
    }
  }

  if (!checkedAuth) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t("servicesPage.title")}</h1>

      {providers.length === 0 && <p className="text-gray-500 mb-6">{t("servicesPage.empty")}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {providers.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 bg-white flex items-center justify-between">
            <span className="font-medium">{p.full_name}</span>
            <TrustBadge score={p.trust_score} locale={locale} />
          </div>
        ))}
      </div>

      {!user ? (
        <p className="text-gray-600">
          {t("servicesPage.needLogin")}{" "}
          <Link href="/login" className="text-emerald-700 underline">
            {t("servicesPage.loginLink")}
          </Link>{" "}
          {t("servicesPage.or")}{" "}
          <Link href="/register" className="text-emerald-700 underline">
            {t("servicesPage.createAccountLink")}
          </Link>
          .
        </p>
      ) : (
        providers.length > 0 && (
          <form onSubmit={handleBook} className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t("servicesPage.providerLabel")}</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={providerId}
                onChange={(e) => setProviderId(e.target.value)}
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.full_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t("servicesPage.serviceTypeLabel")}</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                {SERVICE_TYPE_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {t(`servicesPage.serviceTypes.${value}`)}
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {booked && (
              <p className="text-emerald-700 text-sm">{t("servicesPage.bookedBody", { status: booked.status })}</p>
            )}
            <button
              type="submit"
              disabled={booking}
              className="w-full bg-emerald-700 text-white rounded-lg px-4 py-2 disabled:opacity-60"
            >
              {booking ? t("servicesPage.booking") : t("servicesPage.bookButton")}
            </button>
          </form>
        )
      )}
    </div>
  );
}

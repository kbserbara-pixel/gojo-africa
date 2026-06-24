"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiPost } from "../../lib/api";
import { getUser, AuthUser } from "../../lib/auth";
import { useLanguage } from "../../lib/i18n/LanguageContext";

interface BookingResult {
  booking_id: string;
  status: string;
}

type Action = "virtual-tour" | "video-inspection" | "sign";

export default function DiasporaPage() {
  const { t } = useLanguage();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const [propertyId, setPropertyId] = useState("");
  const [pending, setPending] = useState<Action | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUser(getUser());
    setCheckedAuth(true);
  }, []);

  async function handleRequest(action: Action) {
    if (!user || !propertyId.trim()) return;
    setError(null);
    setResult(null);
    setPending(action);
    try {
      const params = `property_id=${encodeURIComponent(propertyId.trim())}&user_id=${encodeURIComponent(user.id)}`;
      const data = await apiPost<BookingResult>(`/diaspora/${action}?${params}`, {});
      setResult(data);
    } catch {
      setError(t("diasporaPage.error"));
    } finally {
      setPending(null);
    }
  }

  if (!checkedAuth) return null;

  if (!user) {
    return (
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-emerald-800 mb-2">{t("diasporaPage.title")}</h1>
        <p className="text-gray-600">
          {t("diasporaPage.needLogin")}{" "}
          <Link href="/login" className="text-emerald-700 underline">
            {t("diasporaPage.loginLink")}
          </Link>{" "}
          {t("diasporaPage.or")}{" "}
          <Link href="/register" className="text-emerald-700 underline">
            {t("diasporaPage.createAccountLink")}
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-emerald-800 mb-2">{t("diasporaPage.title")}</h1>
      <p className="text-gray-600 mb-6">{t("diasporaPage.intro")}</p>

      <label className="block text-sm font-medium mb-1">{t("diasporaPage.propertyIdLabel")}</label>
      <input
        className="w-full border rounded-lg px-3 py-2 mb-4"
        placeholder={t("diasporaPage.propertyIdPlaceholder")}
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
      />

      <div className="space-y-2">
        {(["virtual-tour", "video-inspection", "sign"] as Action[]).map((action) => (
          <button
            key={action}
            onClick={() => handleRequest(action)}
            disabled={!propertyId.trim() || pending !== null}
            className="w-full bg-emerald-700 text-white rounded-lg px-4 py-2 disabled:opacity-60"
          >
            {pending === action
              ? t("diasporaPage.requesting")
              : t(
                  `diasporaPage.${
                    action === "virtual-tour" ? "virtualTour" : action === "video-inspection" ? "videoInspection" : "remoteSigning"
                  }`
                )}
          </button>
        ))}
      </div>

      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
      {result && (
        <div className="mt-4 border rounded-lg p-4 bg-white">
          <p className="font-semibold text-emerald-700">{t("diasporaPage.requestedTitle")}</p>
          <p className="text-sm text-gray-600 mt-1">
            {t("diasporaPage.requestedBody", { id: result.booking_id, status: result.status })}
          </p>
        </div>
      )}
    </div>
  );
}

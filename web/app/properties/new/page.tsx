"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiPostAuth } from "../../../lib/api";
import { getToken } from "../../../lib/auth";
import { useLanguage } from "../../../lib/i18n/LanguageContext";

const LISTING_TYPE_VALUES = ["rental", "sale", "commercial", "student_housing", "shared_accommodation"] as const;

interface PropertyOut {
  id: string;
  title: string;
}

export default function NewPropertyPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const [listingType, setListingType] = useState("rental");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("ETB");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [areaSqm, setAreaSqm] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState<PropertyOut | null>(null);

  useEffect(() => {
    setToken(getToken());
    setCheckedAuth(true);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        listing_type: listingType,
        title,
        description: description || undefined,
        price: Number(price),
        currency,
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        bathrooms: bathrooms ? Number(bathrooms) : undefined,
        area_sqm: areaSqm ? Number(areaSqm) : undefined,
        address: address || undefined,
      };
      const result = await apiPostAuth<PropertyOut>("/properties", payload, token);
      setCreated(result);
    } catch (err) {
      setError(err instanceof Error ? t("postListingPage.error") : t("postListingPage.genericError"));
    } finally {
      setSubmitting(false);
    }
  }

  if (!checkedAuth) return null;

  if (!token) {
    return (
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-emerald-800 mb-2">{t("postListingPage.title")}</h1>
        <p className="text-gray-600">
          {t("postListingPage.needLogin")}{" "}
          <Link href="/login" className="text-emerald-700 underline">
            {t("postListingPage.loginLink")}
          </Link>{" "}
          {t("postListingPage.or")}{" "}
          <Link href="/register" className="text-emerald-700 underline">
            {t("postListingPage.createAccountLink")}
          </Link>
          .
        </p>
      </div>
    );
  }

  if (created) {
    return (
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-emerald-800 mb-2">{t("postListingPage.submittedTitle")}</h1>
        <p className="text-gray-600 mb-4">{t("postListingPage.submittedBody", { title: created.title })}</p>
        <Link href={`/property/${created.id}`} className="text-emerald-700 underline">
          {t("postListingPage.viewListing")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-emerald-800 mb-6">{t("postListingPage.title")}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("postListingPage.listingTypeLabel")}</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={listingType}
            onChange={(e) => setListingType(e.target.value)}
          >
            {LISTING_TYPE_VALUES.map((value) => (
              <option key={value} value={value}>
                {t(`listingTypes.${value}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("postListingPage.titleLabel")}</label>
          <input
            required
            className="w-full border rounded-lg px-3 py-2"
            placeholder={t("postListingPage.titlePlaceholder")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("postListingPage.descriptionLabel")}</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t("postListingPage.priceLabel")}</label>
            <input
              type="number"
              required
              min={0}
              step="0.01"
              className="w-full border rounded-lg px-3 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("postListingPage.currencyLabel")}</label>
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="ETB">ETB</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t("postListingPage.bedroomsLabel")}</label>
            <input
              type="number"
              min={0}
              className="w-full border rounded-lg px-3 py-2"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("postListingPage.bathroomsLabel")}</label>
            <input
              type="number"
              min={0}
              className="w-full border rounded-lg px-3 py-2"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("postListingPage.areaLabel")}</label>
            <input
              type="number"
              min={0}
              className="w-full border rounded-lg px-3 py-2"
              value={areaSqm}
              onChange={(e) => setAreaSqm(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("postListingPage.addressLabel")}</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder={t("postListingPage.addressPlaceholder")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-emerald-700 text-white rounded-lg px-4 py-2 disabled:opacity-60"
        >
          {submitting ? t("postListingPage.submitting") : t("postListingPage.submit")}
        </button>
      </form>
    </div>
  );
}

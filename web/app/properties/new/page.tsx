"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { apiPostAuth, apiUploadAuth } from "../../../lib/api";
import { getToken, getUser } from "../../../lib/auth";
import { useLanguage } from "../../../lib/i18n/LanguageContext";

const LocationPicker = dynamic(() => import("../../../components/LocationPicker"), {
  ssr: false,
});

const LISTING_TYPE_VALUES = ["rental", "sale", "commercial", "student_housing", "shared_accommodation"] as const;

interface PropertyOut {
  id: string;
  title: string;
}

interface PhotoEntry {
  file: File;
  previewUrl: string;
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
  const [contactPhone, setContactPhone] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [created, setCreated] = useState<PropertyOut | null>(null);

  useEffect(() => {
    setToken(getToken());
    const user = getUser();
    if (user?.phone) setContactPhone(user.phone);
    setCheckedAuth(true);
  }, []);

  function handlePhotosSelected(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files).map((file) => ({ file, previewUrl: URL.createObjectURL(file) }));
    setPhotos((prev) => [...prev, ...next]);
  }

  function removePhoto(index: number) {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  }

  function useMyLocation() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(Number(pos.coords.latitude.toFixed(6)));
        setLng(Number(pos.coords.longitude.toFixed(6)));
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

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
        latitude: lat ?? undefined,
        longitude: lng ?? undefined,
        contact_phone: contactPhone || undefined,
      };
      const result = await apiPostAuth<PropertyOut>("/properties", payload, token);

      if (photos.length > 0) {
        setUploadingPhotos(true);
        for (const photo of photos) {
          const formData = new FormData();
          formData.append("file", photo.file);
          try {
            await apiUploadAuth(`/properties/${result.id}/media`, formData, token);
          } catch {
            // Don't block the whole submission if one photo fails -- the
            // listing itself was already created successfully.
          }
        }
        setUploadingPhotos(false);
      }

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

        <div>
          <label className="block text-sm font-medium mb-1">{t("postListingPage.contactPhoneLabel")}</label>
          <input
            type="tel"
            className="w-full border rounded-lg px-3 py-2"
            placeholder={t("postListingPage.contactPhonePlaceholder")}
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium">{t("postListingPage.locationLabel")}</label>
            <button
              type="button"
              onClick={useMyLocation}
              disabled={locating}
              className="text-xs text-emerald-700 underline disabled:opacity-60"
            >
              {locating ? t("postListingPage.locating") : t("postListingPage.useMyLocation")}
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-2">{t("postListingPage.locationHint")}</p>
          <LocationPicker lat={lat} lng={lng} onChange={(newLat, newLng) => { setLat(newLat); setLng(newLng); }} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t("postListingPage.photosLabel")}</label>
          <p className="text-xs text-gray-500 mb-2">{t("postListingPage.photosHint")}</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handlePhotosSelected(e.target.files)}
            className="block w-full text-sm"
          />
          {photos.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {photos.map((photo, i) => (
                <div key={i} className="relative">
                  <img src={photo.previewUrl} alt="" className="w-full h-20 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute -top-2 -right-2 bg-white border rounded-full w-5 h-5 text-xs leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-emerald-700 text-white rounded-lg px-4 py-2 disabled:opacity-60"
        >
          {submitting
            ? uploadingPhotos
              ? t("postListingPage.uploadingPhotos")
              : t("postListingPage.submitting")
            : t("postListingPage.submit")}
        </button>
      </form>
    </div>
  );
}

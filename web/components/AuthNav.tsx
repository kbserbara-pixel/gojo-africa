"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUser, clearSession, AuthUser } from "../lib/auth";
import { useLanguage } from "../lib/i18n/LanguageContext";

export default function AuthNav() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    setUser(getUser());
    setHydrated(true);
  }, []);

  function handleLogout() {
    clearSession();
    setUser(null);
    router.push("/");
  }

  // Avoid a server/client mismatch flash -- render nothing until we've
  // checked localStorage on the client.
  if (!hydrated) return null;

  if (user) {
    return (
      <div className="flex items-center gap-4 text-sm">
        <Link href="/properties/new" className="bg-emerald-700 text-white rounded-lg px-3 py-1.5">
          {t("auth.postListing")}
        </Link>
        <span className="text-gray-500">{t("auth.greeting", { name: user.full_name.split(" ")[0] })}</span>
        <button onClick={handleLogout} className="text-emerald-700 hover:underline">
          {t("auth.logout")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <Link href="/login">{t("auth.login")}</Link>
      <Link href="/register" className="bg-emerald-700 text-white rounded-lg px-3 py-1.5">
        {t("auth.signup")}
      </Link>
    </div>
  );
}

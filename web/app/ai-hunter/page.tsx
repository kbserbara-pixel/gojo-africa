import ChatHunter from "../../components/ChatHunter";
import { getLocale } from "../../lib/i18n/server";
import { t } from "../../lib/i18n/translations";

export default function AiHunterPage() {
  const locale = getLocale();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t(locale, "aiHunterPage.title")}</h1>
      <p className="text-gray-600 mb-6">{t(locale, "aiHunterPage.description")}</p>
      <ChatHunter />
    </div>
  );
}

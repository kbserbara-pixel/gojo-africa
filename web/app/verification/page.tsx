import { apiGet } from "../../lib/api";
import { getLocale } from "../../lib/i18n/server";
import { t } from "../../lib/i18n/translations";

interface VerificationQueueItem {
  id: string;
  target_type: string;
  target_id: string;
  stage: string;
}

export default async function VerificationPage() {
  const locale = getLocale();
  let queue: VerificationQueueItem[] = [];
  try {
    queue = await apiGet<VerificationQueueItem[]>("/verification/queue");
  } catch {
    // Backend not running yet -- render an empty state instead of crashing.
    queue = [];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t(locale, "verificationPage.title")}</h1>
      {queue.length === 0 && <p className="text-gray-500">{t(locale, "verificationPage.empty")}</p>}
      <div className="space-y-3">
        {queue.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 bg-white flex items-center justify-between">
            <div>
              <p className="font-medium">
                {t(locale, "verificationPage.target")}: {item.target_type} &middot; {item.target_id}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {t(locale, "verificationPage.stage")}: {item.stage}
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-700">
              {t(locale, "verificationPage.pending")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

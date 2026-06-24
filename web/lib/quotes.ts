/**
 * Daily Motivation quotes for the login/signup "digital companion" card.
 *
 * 18 original, universal quotes (courage, kindness, patience, gratitude,
 * overcoming challenges, personal growth) in English and Amharic. These are
 * intentionally NOT about housing -- the goal is a quiet, warm moment before
 * the user starts their session, not another product pitch.
 *
 * Selection is deterministic by UTC calendar date (day-of-year mod length),
 * so every user sees the same "Quote of the Day" regardless of timezone or
 * locale, and it only changes once every 24 hours.
 */

export interface Quote {
  en: string;
  am: string;
}

export const QUOTES: Quote[] = [
  // Courage
  {
    en: "Courage is not the absence of fear, but the decision to take one more step despite it.",
    am: "ድፍረት ፍርሃት ማጣት አይደለም፤ ፍርሃት እያለ አንድ ተጨማሪ ርምጃ የመውሰድ ውሳኔ ነው።",
  },
  {
    en: "Every small act of bravery plants a seed for the courage you'll need tomorrow.",
    am: "ትንሽ የጀግንነት ተግባር እንኳ ለነገ ለሚያስፈልገን ድፍረት ዘር ይተክላል።",
  },
  {
    en: "You do not need to feel ready to begin. You only need to begin.",
    am: "ለመጀመር ዝግጁ ሆኖ መሰማት አያስፈልግም፤ መጀመር ብቻ ይበቃል።",
  },
  // Kindness
  {
    en: "A kind word costs nothing, yet it can carry someone through their hardest day.",
    am: "ቸር ቃል ምንም አያስከፍልም፤ ግን አንድን ሰው በከባድ ቀኑ ሊደግፍ ይችላል።",
  },
  {
    en: "The kindness you give returns to you, even in ways you may never see.",
    am: "የምታደርገው ቸርነት ራስህ ሳታየው እንኳ ይመለስልሃል።",
  },
  {
    en: "Be the calm someone else needed today.",
    am: "ለሌላው ሰው ዛሬ የሚያስፈልገውን ጸጥታ ሁን።",
  },
  // Patience
  {
    en: "Good things take root slowly, like a home built to last.",
    am: "መልካም ነገሮች እንደ ዘላቂ ቤት ቀስ በቀስ ሥር ይይዛሉ።",
  },
  {
    en: "Patience is not waiting quietly. It is trusting the process while you keep moving.",
    am: "ትዕግስት ጸጥ ብሎ መጠበቅ አይደለም፤ ሂደቱን እያመንክ መጓዝ ነው።",
  },
  {
    en: "Some doors open only after we have learned to wait without losing hope.",
    am: "አንዳንድ ደጃፎች ተስፋ ሳንቆርጥ መጠበቅን ስንለማመድ ብቻ ይከፈታሉ።",
  },
  // Gratitude
  {
    en: "Gratitude turns what we have into enough.",
    am: "ምስጋና ያለንን ነገር በቂ ያደርገዋል።",
  },
  {
    en: "Notice one small good thing today. It is often where peace begins.",
    am: "ዛሬ አንድ ትንሽ መልካም ነገር ልብ በል፤ ብዙ ጊዜ ሰላም የሚጀምረው ከዚያ ነው።",
  },
  {
    en: "A grateful heart finds light even on ordinary days.",
    am: "አመስጋኝ ልብ በተራ ቀናት እንኳ ብርሃን ያገኛል።",
  },
  // Overcoming challenges
  {
    en: "The hardest seasons often grow the deepest roots.",
    am: "በጣም ጠንካራ ወቅቶች ብዙ ጊዜ ጥልቅ ሥር ያበቅላሉ።",
  },
  {
    en: "You have survived every difficult day so far. That is not luck. That is strength.",
    am: "እስከ አሁን ያጋጠመህን እያንዳንዱን ከባድ ቀን አሳልፈሃል፤ ይህ እድል ብቻ አይደለም፣ ይህ ጥንካሬ ነው።",
  },
  {
    en: "Every challenge you face is shaping the person you are becoming.",
    am: "የምታጋጥመው እያንዳንዱ ፈተና የምትሆነውን ሰው እየቀረጸ ነው።",
  },
  // Personal growth
  {
    en: "Growth is quiet. It rarely feels like progress until you look back.",
    am: "እድገት ጸጥ ያለ ነው፤ ወደ ኋላ ተመልክተህ እስክታየው ድረስ እምብዛም እንደ ለውጥ አይሰማም።",
  },
  {
    en: "You are allowed to outgrow the person you used to be.",
    am: "ከነበርከው ሰው አልፈህ የመሄድ መብት አለህ።",
  },
  {
    en: "Small, steady steps build a life you can be proud of.",
    am: "ትንንሽ፣ ቋሚ ርምጃዎች ልትኮራበት የምትችለውን ሕይወት ይገነባሉ።",
  },
];

/**
 * Deterministic day-of-year (UTC) so the index is stable across timezones
 * and across repeated calls within the same calendar day.
 */
function utcDayOfYear(date: Date): number {
  const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 1);
  const startOfDay = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((startOfDay - startOfYear) / 86_400_000);
}

export function getQuoteOfTheDay(date: Date = new Date()): Quote {
  const index = utcDayOfYear(date) % QUOTES.length;
  return QUOTES[index];
}

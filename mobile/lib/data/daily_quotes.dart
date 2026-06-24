/// Daily Motivation quotes for the login/signup "digital companion" card.
///
/// 18 original, universal quotes (courage, kindness, patience, gratitude,
/// overcoming challenges, personal growth) in English and Amharic. Mirrors
/// `web/lib/quotes.ts` so both platforms show the same Quote of the Day.
library;

class Quote {
  final String en;
  final String am;
  const Quote(this.en, this.am);
}

const List<Quote> kDailyQuotes = [
  // Courage
  Quote(
    "Courage is not the absence of fear, but the decision to take one more step despite it.",
    "ድፍረት ፍርሃት ማጣት አይደለም፤ ፍርሃት እያለ አንድ ተጨማሪ ርምጃ የመውሰድ ውሳኔ ነው።",
  ),
  Quote(
    "Every small act of bravery plants a seed for the courage you'll need tomorrow.",
    "ትንሽ የጀግንነት ተግባር እንኳ ለነገ ለሚያስፈልገን ድፍረት ዘር ይተክላል።",
  ),
  Quote(
    "You do not need to feel ready to begin. You only need to begin.",
    "ለመጀመር ዝግጁ ሆኖ መሰማት አያስፈልግም፤ መጀመር ብቻ ይበቃል።",
  ),
  // Kindness
  Quote(
    "A kind word costs nothing, yet it can carry someone through their hardest day.",
    "ቸር ቃል ምንም አያስከፍልም፤ ግን አንድን ሰው በከባድ ቀኑ ሊደግፍ ይችላል።",
  ),
  Quote(
    "The kindness you give returns to you, even in ways you may never see.",
    "የምታደርገው ቸርነት ራስህ ሳታየው እንኳ ይመለስልሃል።",
  ),
  Quote(
    "Be the calm someone else needed today.",
    "ለሌላው ሰው ዛሬ የሚያስፈልገውን ጸጥታ ሁን።",
  ),
  // Patience
  Quote(
    "Good things take root slowly, like a home built to last.",
    "መልካም ነገሮች እንደ ዘላቂ ቤት ቀስ በቀስ ሥር ይይዛሉ።",
  ),
  Quote(
    "Patience is not waiting quietly. It is trusting the process while you keep moving.",
    "ትዕግስት ጸጥ ብሎ መጠበቅ አይደለም፤ ሂደቱን እያመንክ መጓዝ ነው።",
  ),
  Quote(
    "Some doors open only after we have learned to wait without losing hope.",
    "አንዳንድ ደጃፎች ተስፋ ሳንቆርጥ መጠበቅን ስንለማመድ ብቻ ይከፈታሉ።",
  ),
  // Gratitude
  Quote(
    "Gratitude turns what we have into enough.",
    "ምስጋና ያለንን ነገር በቂ ያደርገዋል።",
  ),
  Quote(
    "Notice one small good thing today. It is often where peace begins.",
    "ዛሬ አንድ ትንሽ መልካም ነገር ልብ በል፤ ብዙ ጊዜ ሰላም የሚጀምረው ከዚያ ነው።",
  ),
  Quote(
    "A grateful heart finds light even on ordinary days.",
    "አመስጋኝ ልብ በተራ ቀናት እንኳ ብርሃን ያገኛል።",
  ),
  // Overcoming challenges
  Quote(
    "The hardest seasons often grow the deepest roots.",
    "በጣም ጠንካራ ወቅቶች ብዙ ጊዜ ጥልቅ ሥር ያበቅላሉ።",
  ),
  Quote(
    "You have survived every difficult day so far. That is not luck. That is strength.",
    "እስከ አሁን ያጋጠመህን እያንዳንዱን ከባድ ቀን አሳልፈሃል፤ ይህ እድል ብቻ አይደለም፣ ይህ ጥንካሬ ነው።",
  ),
  Quote(
    "Every challenge you face is shaping the person you are becoming.",
    "የምታጋጥመው እያንዳንዱ ፈተና የምትሆነውን ሰው እየቀረጸ ነው።",
  ),
  // Personal growth
  Quote(
    "Growth is quiet. It rarely feels like progress until you look back.",
    "እድገት ጸጥ ያለ ነው፤ ወደ ኋላ ተመልክተህ እስክታየው ድረስ እምብዛም እንደ ለውጥ አይሰማም።",
  ),
  Quote(
    "You are allowed to outgrow the person you used to be.",
    "ከነበርከው ሰው አልፈህ የመሄድ መብት አለህ።",
  ),
  Quote(
    "Small, steady steps build a life you can be proud of.",
    "ትንንሽ፣ ቋሚ ርምጃዎች ልትኮራበት የምትችለውን ሕይወት ይገነባሉ።",
  ),
];

/// Deterministic day-of-year (UTC) so the index is stable across timezones
/// and matches the web app's selection for the same calendar day.
int _utcDayOfYear(DateTime date) {
  final utc = date.toUtc();
  final startOfYear = DateTime.utc(utc.year, 1, 1);
  final startOfDay = DateTime.utc(utc.year, utc.month, utc.day);
  return startOfDay.difference(startOfYear).inDays;
}

Quote getQuoteOfTheDay([DateTime? date]) {
  final index = _utcDayOfYear(date ?? DateTime.now()) % kDailyQuotes.length;
  return kDailyQuotes[index];
}

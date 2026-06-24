/**
 * Gojo Africa translation dictionary: English + Amharic (አማርኛ).
 *
 * Keep this flat-ish and string-keyed (dot-path lookups via `t()`) rather
 * than pulling in a full i18n library/routing layer -- the app has no
 * [locale] route segments, so this stays a simple value lookup instead of
 * a routing concern.
 */

export type Locale = "en" | "am";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "am", label: "አማርኛ" },
];

type Dict = Record<string, any>;

export const translations: Record<Locale, Dict> = {
  en: {
    nav: {
      marketplace: "Marketplace",
      aiHunter: "AI House Hunter",
      analytics: "Analytics",
    },
    auth: {
      postListing: "Post a Listing",
      greeting: "Hi, {name}",
      logout: "Log out",
      login: "Log in",
      signup: "Sign up",
    },
    home: {
      heading: "A complete housing ecosystem for Africa.",
      subheading:
        "Starting in Ethiopia. Search, verify, and settle into a home with AI-powered trust and intelligence.",
      modules: {
        marketplace: { title: "Property Marketplace", desc: "Rentals, sales, commercial, student housing, shared accommodation." },
        aiHunter: { title: "AI House Hunter", desc: "Conversational search with explainable recommendations." },
        neighborhood: { title: "Neighborhood Intelligence", desc: "Safety, utilities, internet, transit, schools, cost of living." },
        verification: { title: "Verified Property System", desc: "AI + human verification, trust scores, scam detection." },
        housemates: { title: "Housemate Matching", desc: "Compatibility scoring, messaging, shared budget planning." },
        diaspora: { title: "Diaspora Concierge", desc: "Virtual tours, video inspection, remote signing, international payments." },
        services: { title: "Home Services Marketplace", desc: "Movers, cleaners, furniture, internet, maintenance, insurance." },
        analytics: { title: "AI Analytics Dashboard", desc: "Rental trends, price prediction, area growth forecasting." },
      },
    },
    loginPage: {
      title: "Log in",
      phone: "Phone number",
      password: "Password",
      submit: "Log in",
      submitting: "Logging in...",
      error: "Could not log in -- check your phone/password, and that the backend is running.",
      genericError: "Something went wrong.",
      noAccount: "Don't have an account?",
      signupLink: "Sign up",
    },
    dailyQuote: {
      heading: "Quote of the Day",
      continue: "Continue to Gojo Africa",
    },
    registerPage: {
      title: "Create an account",
      fullName: "Full name",
      phone: "Phone number",
      email: "Email (optional)",
      password: "Password",
      roleLabel: "I am a...",
      roles: {
        renter: "Renter / Buyer",
        landlord: "Landlord",
        agent: "Agent",
        provider: "Service Provider",
      },
      diasporaCheckbox: "I'm part of the Ethiopian diaspora",
      countryOfResidence: "Country of residence",
      submit: "Sign up",
      submitting: "Creating account...",
      error: "Could not create your account -- the phone number may already be registered, or the backend isn't running.",
      genericError: "Something went wrong.",
      haveAccount: "Already have an account?",
      loginLink: "Log in",
    },
    listingTypes: {
      rental: "Rental",
      sale: "Sale",
      commercial: "Commercial",
      student_housing: "Student Housing",
      shared_accommodation: "Shared Accommodation",
    },
    postListingPage: {
      title: "Post a Listing",
      needLogin: "You need to be logged in to post a listing.",
      loginLink: "Log in",
      or: "or",
      createAccountLink: "create an account",
      listingTypeLabel: "Listing type",
      titleLabel: "Title",
      titlePlaceholder: "2-bedroom apartment in Bole",
      descriptionLabel: "Description",
      priceLabel: "Price",
      currencyLabel: "Currency",
      bedroomsLabel: "Bedrooms",
      bathroomsLabel: "Bathrooms",
      areaLabel: "Area (sqm)",
      addressLabel: "Address",
      addressPlaceholder: "Bole, Addis Ababa",
      submit: "Submit Listing",
      submitting: "Submitting...",
      error: "Could not create the listing -- check the fields and that the backend is running.",
      genericError: "Something went wrong.",
      submittedTitle: "Listing submitted",
      submittedBody: '"{title}" has been submitted and is pending verification before it goes live on the marketplace.',
      viewListing: "View listing",
    },
    marketplacePage: {
      title: "Marketplace",
      empty: "No listings yet -- start the backend and add some properties.",
    },
    aiHunterPage: {
      title: "AI House Hunter",
      description: "Describe what you're looking for in plain language -- budget, area, lifestyle -- and get explained recommendations.",
    },
    dashboardPage: {
      title: "AI Analytics Dashboard",
      description: "Rental trends, price prediction, and area growth forecasting render here, backed by",
    },
    chatHunter: {
      placeholder: "e.g. 3-bedroom near Bole under 25,000 ETB with reliable water",
      search: "Search",
      searching: "Searching...",
    },
    trustBadge: {
      label: "Trust {score}",
    },
    neighborhood: {
      noData: "No neighborhood data available.",
      heading: "{name} -- Neighborhood Intelligence",
      safety: "Safety",
      water: "Water reliability",
      electricity: "Electricity reliability",
      internet: "Internet quality",
      transport: "Transportation access",
      school: "School proximity",
      hospital: "Hospital proximity",
      costOfLiving: "Cost of living",
    },
    propertyDetail: {
      notFound: "Property not found, or backend not running.",
      bed: "bed",
      bath: "bath",
      sqm: "sqm",
    },
    neighborhoodsPage: {
      title: "Neighborhood Intelligence",
      empty: "No neighborhoods added yet.",
    },
    verificationPage: {
      title: "Verification Queue",
      empty: "Nothing pending verification right now.",
      target: "Target",
      stage: "Stage",
      pending: "Pending",
    },
    housematesPage: {
      title: "Housemate Matching",
      intro: "Tell us your budget and living habits, and we'll surface compatible housemates.",
      needLogin: "You need to be logged in to set up a housemate profile.",
      loginLink: "Log in",
      or: "or",
      createAccountLink: "create an account",
      budgetMinLabel: "Minimum budget",
      budgetMaxLabel: "Maximum budget",
      lifestyleLabel: "Lifestyle notes",
      lifestylePlaceholder: "e.g. early riser, non-smoker, quiet, no pets",
      saveProfile: "Save profile",
      saving: "Saving...",
      profileSaved: "Profile saved.",
      findMatches: "Find matches",
      finding: "Finding matches...",
      matchesTitle: "Possible matches",
      noMatches: "No matches yet. Check back once more housemate profiles are added.",
      compatibility: "Compatibility {score}%",
      error: "Could not save your profile. Check the fields and that the backend is running.",
      genericError: "Something went wrong.",
    },
    diasporaPage: {
      title: "Diaspora Concierge",
      intro: "Request a virtual tour, video inspection, or remote signing for a property from anywhere in the world.",
      needLogin: "You need to be logged in to request concierge services.",
      loginLink: "Log in",
      or: "or",
      createAccountLink: "create an account",
      propertyIdLabel: "Property ID",
      propertyIdPlaceholder: "Paste a property ID from the marketplace",
      virtualTour: "Request virtual tour",
      videoInspection: "Request video inspection",
      remoteSigning: "Request remote signing",
      requesting: "Requesting...",
      requestedTitle: "Request sent",
      requestedBody: "Request {id} is now {status}.",
      error: "Could not submit the request. Check the property ID and that the backend is running.",
    },
    servicesPage: {
      title: "Home Services Marketplace",
      empty: "No service providers listed yet.",
      serviceTypeLabel: "Service type",
      serviceTypes: {
        mover: "Mover",
        cleaner: "Cleaner",
        furniture: "Furniture",
        internet_provider: "Internet provider",
        maintenance: "Maintenance",
        insurance: "Insurance",
      },
      needLogin: "You need to be logged in to book a service.",
      loginLink: "Log in",
      or: "or",
      createAccountLink: "create an account",
      providerLabel: "Provider",
      bookButton: "Book",
      booking: "Booking...",
      bookedTitle: "Booking requested",
      bookedBody: "Your booking is now {status}.",
      error: "Could not create the booking. Check the fields and that the backend is running.",
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "© {year} Gojo Africa. All rights reserved.",
    },
    legalPrivacyPage: {
      title: "Privacy Policy",
      updated: "Last updated: June 24, 2026",
      intro:
        'Gojo Africa ("Gojo Africa", "we", "us") operates a housing marketplace and related services connecting renters, landlords, agents, service providers, and the Ethiopian diaspora. This Privacy Policy explains what information we collect, how we use it, and the choices you have. By using Gojo Africa, you agree to the practices described here.',
      sections: {
        collect: {
          title: "Information We Collect",
          body: "We collect information you provide directly, such as your name, phone number, email address, password, role (renter, landlord, agent, or service provider), and any details you add to a property listing, housemate profile, or service booking. We also collect information generated through your use of the platform, including messages, verification requests, trust scores, and basic usage data such as device type and IP address.",
        },
        use: {
          title: "How We Use Your Information",
          body: "We use your information to operate the marketplace: creating and managing your account, matching you with properties, housemates, or service providers, verifying listings and identities, processing diaspora concierge requests, generating neighborhood and analytics insights, and communicating with you about your account or activity. We do not sell your personal information to third parties.",
        },
        location: {
          title: "Location & Property Data",
          body: "Property listings include address and neighborhood information that we use to power search, neighborhood intelligence scores (safety, utilities, transit, schools, cost of living), and AI-based recommendations. This data is sourced from listing owners and, where available, third-party or public neighborhood datasets.",
        },
        sharing: {
          title: "Sharing of Information",
          body: "We share information with other users only as needed for the service to work – for example, sharing your contact details with a landlord when you express interest in a property, or with a housemate match you choose to connect with. We may share information with service providers who help us operate the platform (such as cloud hosting and payment processors), and where required by law.",
        },
        security: {
          title: "Data Storage & Security",
          body: "Your data is stored on secured cloud infrastructure with access controls in place. While we take reasonable steps to protect your information, no system is completely secure, and we cannot guarantee absolute security of data transmitted to or from the platform.",
        },
        rights: {
          title: "Your Rights & Choices",
          body: "You can review and update your account information at any time, and you may request deletion of your account by contacting us. You may also decline to provide optional information, such as email address, though this may limit some features.",
        },
        children: {
          title: "Children's Privacy",
          body: "Gojo Africa is not directed at children under 18, and we do not knowingly collect information from them. If you believe a child has created an account, please contact us so we can remove it.",
        },
        changes: {
          title: "Changes to This Policy",
          body: 'We may update this Privacy Policy from time to time as the platform evolves. We will update the "last updated" date above when changes are made, and significant changes will be communicated through the platform.',
        },
        contact: {
          title: "Contact Us",
          body: "If you have questions about this Privacy Policy or how your information is handled, contact us at support@gojoafrica.com.",
        },
      },
    },
    legalTermsPage: {
      title: "Terms of Service",
      updated: "Last updated: June 24, 2026",
      intro:
        'These Terms of Service ("Terms") govern your access to and use of Gojo Africa, a housing marketplace and related services for Ethiopia and the Ethiopian diaspora. By creating an account or using the platform, you agree to these Terms.',
      sections: {
        acceptance: {
          title: "Acceptance of Terms",
          body: "By accessing or using Gojo Africa, you confirm that you are at least 18 years old and able to enter into a binding agreement, and that you agree to these Terms and our Privacy Policy.",
        },
        service: {
          title: "Description of Service",
          body: "Gojo Africa provides a property marketplace, AI-powered house search, neighborhood intelligence, property verification, housemate matching, diaspora concierge services, and a home services marketplace. Features may be added, changed, or removed over time.",
        },
        accounts: {
          title: "User Accounts",
          body: "You are responsible for keeping your account credentials secure and for all activity under your account. You agree to provide accurate information when registering and to update it as needed. We may suspend or terminate accounts that violate these Terms.",
        },
        listings: {
          title: "Listings & Marketplace Conduct",
          body: "Landlords and agents are responsible for the accuracy of their listings, including price, availability, and property condition. Gojo Africa performs AI and human verification to reduce fraud and scams, but does not guarantee that every listing is accurate or available. Users should exercise reasonable judgment, including in-person or video verification, before making payments or commitments.",
        },
        diaspora: {
          title: "Diaspora & Remote Transactions",
          body: "Diaspora concierge features (virtual tours, video inspections, remote signing) are provided to assist users transacting from abroad, but Gojo Africa is not a party to the underlying rental or sale agreement between users, and is not responsible for disputes arising from those agreements.",
        },
        verification: {
          title: "Verification & Trust Scores",
          body: "Trust scores and verification badges reflect our assessment based on available information at a point in time. They are intended as a helpful signal, not a guarantee of a user's or property's legitimacy, condition, or reliability.",
        },
        payments: {
          title: "Payments & Fees",
          body: "Some services on the platform may involve fees, which will be clearly disclosed before you commit to them. Gojo Africa is not a bank or payment processor; any payments between users for rent, deposits, or services are the responsibility of those users.",
        },
        prohibited: {
          title: "Prohibited Conduct",
          body: "You may not use Gojo Africa to post fraudulent or misleading listings, harass other users, discriminate unlawfully, scrape or misuse platform data, or attempt to interfere with the platform's security or operation.",
        },
        liability: {
          title: "Disclaimers & Limitation of Liability",
          body: 'Gojo Africa is provided "as is" without warranties of any kind. To the fullest extent permitted by law, Gojo Africa is not liable for indirect, incidental, or consequential damages arising from your use of the platform, including disputes between users.',
        },
        termination: {
          title: "Termination",
          body: "You may stop using Gojo Africa at any time. We may suspend or terminate access to the platform for violations of these Terms or for conduct that we believe harms other users or the platform.",
        },
        law: {
          title: "Governing Law",
          body: "These Terms are governed by the laws of Ethiopia, without regard to conflict-of-law principles, unless otherwise required by applicable local law.",
        },
        changes: {
          title: "Changes to These Terms",
          body: "We may update these Terms as the platform evolves. Continued use of Gojo Africa after changes take effect constitutes acceptance of the updated Terms.",
        },
        contact: {
          title: "Contact Us",
          body: "If you have questions about these Terms, contact us at support@gojoafrica.com.",
        },
      },
    },
  },

  am: {
    nav: {
      marketplace: "የንብረት ገበያ",
      aiHunter: "የኤ.አይ. ቤት ፈላጊ",
      analytics: "ትንታኔ",
    },
    auth: {
      postListing: "ቤት ይመዝግቡ",
      greeting: "ሰላም፣ {name}",
      logout: "ይውጡ",
      login: "ይግቡ",
      signup: "ይመዝገቡ",
    },
    home: {
      heading: "ለአፍሪካ የተሟላ የቤት መፍትሄ።",
      subheading: "ከኢትዮጵያ ጀምሮ፤ በኤ.አይ. የተደገፈ እምነትና ግንዛቤ በመጠቀም ቤት ይፈልጉ፣ ያረጋግጡ እና በሰላም ይኑሩ።",
      modules: {
        marketplace: { title: "የንብረት ገበያ", desc: "ኪራይ፣ ሽያጭ፣ የንግድ ቤቶች፣ የተማሪ መኖሪያ፣ የጋራ መኖሪያ ቤቶች።" },
        aiHunter: { title: "የኤ.አይ. (AI) ቤት ፈላጊ", desc: "ውይይት-አዘል ፍለጋ እና በምክንያት የታጀቡ የቤት ምክሮች።" },
        neighborhood: { title: "የአካባቢ መረጃ", desc: "የደህንነት ሁኔታ፣ መሰረተ-ልማቶች፣ የኢንተርኔት ተደራሽነት፣ ትራንስፖርት፣ ትምህርት ቤቶች፣ የኑሮ ውድነት።" },
        verification: { title: "የተረጋገጠ ንብረት ስርዓት", desc: "በ AI እና በሰው ኃይል ማረጋገጫ፣ የእምነት ነጥብ (Trust Score)፣ የማጭበርበር መከላከያ።" },
        housemates: { title: "የቤት ጓደኛ ማገናኛ", desc: "የተስማሚነት ነጥብ፣ መልዕክት መለዋወጥ፣ የጋራ በጀት እቅድ።" },
        diaspora: { title: "የዲያስፖራ አገልግሎት", desc: "ምናባዊ ጉብኝት (Virtual Tour)፣ የቪዲዮ ምርመራ፣ የርቀት ፊርማ፣ ዓለም አቀፍ ክፍያ።" },
        services: { title: "የቤት አገልግሎቶች ገበያ", desc: "የቤት አጓጓዦች፣ አጽዳቂዎች፣ የቤት ዕቃ አቅራቢዎች፣ የኢንተርኔት አገልግሎት፣ የጥገና ባለሙያዎች፣ ኢንሹራንስ።" },
        analytics: { title: "የኤ.አይ. ትንታኔ ዳሽቦርድ", desc: "የኪራይ ዋጋ አዝማሚያ፣ የዋጋ ትንበያ፣ የአካባቢ እድገት ትንበያ።" },
      },
    },
    loginPage: {
      title: "ይግቡ",
      phone: "የስልክ ቁጥር",
      password: "የመግቢያ ቁጥር",
      submit: "ይግቡ",
      submitting: "በመግባት ላይ...",
      error: "መግባት አልተቻለም። የስልክ ቁጥርዎንና የመግቢያ ቁጥርዎን በትክክል ያስገቡ፣ አገልጋዩም እየሰራ መሆኑን ያረጋግጡ።",
      genericError: "የሆነ ችግር ተከስቷል።",
      noAccount: "መለያ የለዎትም?",
      signupLink: "ይመዝገቡ",
    },
    dailyQuote: {
      heading: "የዕለቱ ጥቅስ",
      continue: "ወደ ጎጆ አፍሪካ ይቀጥሉ",
    },
    registerPage: {
      title: "መለያ ይክፈቱ",
      fullName: "ሙሉ ስም",
      phone: "የስልክ ቁጥር",
      email: "ኢሜይል (አማራጭ)",
      password: "የመግቢያ ቁጥር",
      roleLabel: "እኔ...",
      roles: {
        renter: "ተከራይ ወይም ገዢ",
        landlord: "አከራይ",
        agent: "ወኪል",
        provider: "የአገልግሎት ሰጪ",
      },
      diasporaCheckbox: "የኢትዮጵያ ዲያስፖራ አካል ነኝ",
      countryOfResidence: "የመኖሪያ ሀገር",
      submit: "ይመዝገቡ",
      submitting: "መለያ በመክፈት ላይ...",
      error: "መለያ መክፈት አልተቻለም። ይህ ስልክ ቁጥር ቀደም ሲል ተመዝግቦ ሊሆን ይችላል፣ ወይም አገልጋዩ እየሰራ ላይሆን ይችላል።",
      genericError: "የሆነ ችግር ተከስቷል።",
      haveAccount: "መለያ አለዎት?",
      loginLink: "ይግቡ",
    },
    listingTypes: {
      rental: "ኪራይ",
      sale: "ሽያጭ",
      commercial: "የንግድ",
      student_housing: "የተማሪ መኖሪያ",
      shared_accommodation: "የጋራ መኖሪያ",
    },
    postListingPage: {
      title: "ቤት ይመዝግቡ",
      needLogin: "ቤት ለመመዝገብ መግባት አለብዎት።",
      loginLink: "ይግቡ",
      or: "ወይም",
      createAccountLink: "መለያ ይክፈቱ",
      listingTypeLabel: "የንብረት አይነት",
      titleLabel: "ርዕስ",
      titlePlaceholder: "2 መኝታ ቤት ያለው አፓርትመንት በቦሌ",
      descriptionLabel: "መግለጫ",
      priceLabel: "ዋጋ",
      currencyLabel: "የገንዘብ መለኪያ",
      bedroomsLabel: "የመኝታ ቤቶች ብዛት",
      bathroomsLabel: "የመታጠቢያ ቤቶች ብዛት",
      areaLabel: "ስፋት (ካ.ሜ.)",
      addressLabel: "አድራሻ",
      addressPlaceholder: "ቦሌ፣ አዲስ አበባ",
      submit: "ንብረት ያስገቡ",
      submitting: "በማስገባት ላይ...",
      error: "ንብረቱን ማስገባት አልተቻለም። ያስገቡት መረጃ ትክክል መሆኑን እና አገልጋዩ እየሰራ መሆኑን ያረጋግጡ።",
      genericError: "የሆነ ችግር ተከስቷል።",
      submittedTitle: "ንብረቱ በሰላም ገብቷል",
      submittedBody: "“{title}” ገብቷል እና ገበያው ላይ ከመውጣቱ በፊት በማረጋገጫ ሂደት ላይ ነው።",
      viewListing: "ንብረቱን ይመልከቱ",
    },
    marketplacePage: {
      title: "የንብረት ገበያ",
      empty: "እስካሁን ምንም ንብረት አልተመዘገበም። አገልጋዩን ካስነሱ በኋላ ንብረት ያክሉ።",
    },
    aiHunterPage: {
      title: "የኤ.አይ. ቤት ፈላጊ",
      description: "የሚፈልጉትን ቤት በቀላል ቋንቋ ይግለጹ፤ በጀትዎን፣ አካባቢዎን እና የአኗኗር ዘይቤዎን ጨምረው ይንገሩን። ግልጽ ማብራሪያ ያላቸው ምክሮችን እናቀርብልዎታለን።",
    },
    dashboardPage: {
      title: "የኤ.አይ. ትንታኔ ዳሽቦርድ",
      description: "የኪራይ ዋጋ አዝማሚያ፣ የዋጋ ትንበያ እና የአካባቢ እድገት ትንበያ ከዚህ በታች ይታያል፦",
    },
    chatHunter: {
      placeholder: "ለምሳሌ፡ በቦሌ አካባቢ ከ25,000 ብር በታች 3 መኝታ ቤት ያለው፣ ውሃ የተሟላለት",
      search: "ይፈልጉ",
      searching: "በመፈለግ ላይ...",
    },
    trustBadge: {
      label: "እምነት {score}",
    },
    neighborhood: {
      noData: "ለዚህ አካባቢ መረጃ የለም።",
      heading: "{name} የአካባቢ ግንዛቤ",
      safety: "ደህንነት",
      water: "የውሃ አስተማማኝነት",
      electricity: "የመብራት አስተማማኝነት",
      internet: "የኢንተርኔት ጥራት",
      transport: "የትራንስፖርት አቅርቦት",
      school: "ለትምህርት ቤት ቅርበት",
      hospital: "ለሆስፒታል ቅርበት",
      costOfLiving: "የኑሮ ውድነት",
    },
    propertyDetail: {
      notFound: "ይህ ንብረት አልተገኘም፣ ወይም አገልጋዩ እየሰራ አይደለም።",
      bed: "መኝታ ቤት",
      bath: "የመታጠቢያ ቤት",
      sqm: "ካ.ሜ.",
    },
    neighborhoodsPage: {
      title: "የአካባቢ ግንዛቤ",
      empty: "እስካሁን የተመዘገበ አካባቢ የለም።",
    },
    verificationPage: {
      title: "የማረጋገጫ ሂደት ላይ ያሉ ጥያቄዎች",
      empty: "በአሁኑ ጊዜ ምንም በማረጋገጫ የሚጠብቅ ነገር የለም።",
      target: "ርዕሰ ጉዳይ",
      stage: "ደረጃ",
      pending: "በመጠባበቅ ላይ",
    },
    housematesPage: {
      title: "ቤት/ክፍል የሚጋራ መገናኛት",
      intro: "በጀትዎንና የአኗኗር ዘይቤዎን ይንገሩን፤ ከእርስዎ ጋር የሚስማሙ የቤት ጓደኞችን እናቀርብልዎታለን።",
      needLogin: "የቤት ጓደኛ መገለጫ ለመክፈት መግባት አለብዎት።",
      loginLink: "ይግቡ",
      or: "ወይም",
      createAccountLink: "መለያ ይክፈቱ",
      budgetMinLabel: "ዝቅተኛ በጀት",
      budgetMaxLabel: "ከፍተኛ በጀት",
      lifestyleLabel: "የአኗኗር ዘይቤ መግለጫ",
      lifestylePlaceholder: "ለምሳሌ፦ ጧት ተነሺ፣ ትንባሆ የማይጨስ፣ ጸጥ ያለ አካባቢ ወዳጅ፣ የቤት እንስሳት የለሽ",
      saveProfile: "መገለጫ ያስቀምጡ",
      saving: "በማስቀመጥ ላይ...",
      profileSaved: "መገለጫዎ ተቀምጧል።",
      findMatches: "ግጥሚያዎችን ይፈልጉ",
      finding: "በመፈለግ ላይ...",
      matchesTitle: "ሊስማሙ የሚችሉ ጓደኞች",
      noMatches: "እስካሁን ግጥሚያ አልተገኘም፤ ተጨማሪ መገለጫዎች ሲመዘገቡ ይመልሱ።",
      compatibility: "ተስማሚነት {score}%",
      error: "መገለጫዎን ማስቀመጥ አልተቻለም። መረጃውን እና አገልጋዩ እየሰራ መሆኑን ያረጋግጡ።",
      genericError: "የሆነ ችግር ተከስቷል።",
    },
    diasporaPage: {
      title: "የዲያስፖራ ልዩ አገልግሎት",
      intro: "ከየትኛውም የዓለም ክፍል ሆነው ለንብረት ምናባዊ ጉብኝት፣ የቪዲዮ ምርመራ ወይም የርቀት ፊርማ ይጠይቁ።",
      needLogin: "ይህን አገልግሎት ለመጠየቅ መግባት አለብዎት።",
      loginLink: "ይግቡ",
      or: "ወይም",
      createAccountLink: "መለያ ይክፈቱ",
      propertyIdLabel: "የንብረት መለያ ቁጥር",
      propertyIdPlaceholder: "ከገበያው ላይ ያገኙትን የንብረት መለያ ቁጥር ይለጥፉ",
      virtualTour: "ምናባዊ ጉብኝት ይጠይቁ",
      videoInspection: "የቪዲዮ ምርመራ ይጠይቁ",
      remoteSigning: "የርቀት ፊርማ ይጠይቁ",
      requesting: "በመጠየቅ ላይ...",
      requestedTitle: "ጥያቄው ተልኳል",
      requestedBody: "የጥያቄ ቁጥር {id} ደረጃው {status} ሆኗል።",
      error: "ጥያቄውን ማስገባት አልተቻለም። የንብረት መለያ ቁጥሩን እና አገልጋዩ እየሰራ መሆኑን ያረጋግጡ።",
    },
    servicesPage: {
      title: "የቤት አገልግሎቶች ገበያ",
      empty: "እስካሁን የተመዘገበ አገልግሎት አቅራቢ የለም።",
      serviceTypeLabel: "የአገልግሎት አይነት",
      serviceTypes: {
        mover: "አጓጓዥ",
        cleaner: "የጽዳት ሰራተኛ",
        furniture: "የቤት እቃ",
        internet_provider: "የኢንተርኔት አቅራቢ",
        maintenance: "ጥገና",
        insurance: "መድን",
      },
      needLogin: "አገልግሎት ለማስያዝ መግባት አለብዎት።",
      loginLink: "ይግቡ",
      or: "ወይም",
      createAccountLink: "መለያ ይክፈቱ",
      providerLabel: "አቅራቢ",
      bookButton: "ያስያዙ",
      booking: "በማስያዝ ላይ...",
      bookedTitle: "ጥያቄው ገብቷል",
      bookedBody: "የእርስዎ ጥያቄ ደረጃው {status} ሆኗል።",
      error: "ጥያቄውን ማስገባት አልተቻለም። መረጃውን እና አገልጋዩ እየሰራ መሆኑን ያረጋግጡ።",
    },
    footer: {
      privacy: "የግላዊነት መመሪያ",
      terms: "የአገልግሎት ውሎች",
      rights: "© {year} ጎጆ አፍሪካ። መብቱ በህግ የተጠበቀ ነው።",
    },
    legalPrivacyPage: {
      title: "የግላዊነት መመሪያ",
      updated: "መጨረሻ የተሻሻለበት ቀን፦ ሰኔ 24፣ 2026",
      intro:
        "ጎጆ አፍሪካ (\"ጎጆ አፍሪካ\"፣ \"እኛ\") ተከራዮችን፣ አከራዮችን፣ ወኪሎችን፣ የአገልግሎት ሰጪዎችን እና የኢትዮጵያ ዲያስፖራን የሚያገናኝ የቤት ገበያና ተያያዥ አገልግሎቶችን ያቀርባል። ይህ የግላዊነት መመሪያ ምን አይነት መረጃ እንደምንሰበስብ፣ እንዴት እንደምንጠቀምበት እና ያሉዎትን ምርጫዎች ያብራራል። ጎጆ አፍሪካን በመጠቀምዎ በዚህ የተገለጹትን አሰራሮች ተቀብለዋል ማለት ነው።",
      sections: {
        collect: {
          title: "የምንሰበስበው መረጃ",
          body: "በቀጥታ የሚሰጡንን መረጃ እንሰበስባለን፤ ይህም ስም፣ የስልክ ቁጥር፣ ኢሜይል አድራሻ፣ የመግቢያ ቁጥር፣ ሚና (ተከራይ፣ አከራይ፣ ወኪል ወይም የአገልግሎት ሰጪ)፣ እና ለንብረት ምዝገባ፣ ለቤት ጓደኛ መገለጫ ወይም ለአገልግሎት ማስያዝ የሚያክሉትን ዝርዝሮች ያካትታል። እንዲሁም ከመተግበሪያው አጠቃቀም የሚገኙ መረጃዎችን እንሰበስባለን፤ እነዚህም መልዕክቶች፣ የማረጋገጫ ጥያቄዎች፣ የእምነት ነጥቦች እና እንደ የመሣሪያ አይነትና IP አድራሻ ያሉ መሰረታዊ የአጠቃቀም መረጃዎችን ይጨምራል።",
        },
        use: {
          title: "መረጃዎን እንዴት እንጠቀማለን",
          body: "መረጃዎን ገበያውን ለማስኬድ እንጠቀምበታለን፦ መለያዎን ለመክፈትና ለማስተዳደር፣ ከንብረቶች፣ ከቤት ጓደኞች ወይም ከአገልግሎት ሰጪዎች ጋር ለማገናኘት፣ ንብረቶችንና መታወቂያዎችን ለማረጋገጥ፣ የዲያስፖራ አገልግሎት ጥያቄዎችን ለማስኬድ፣ የአካባቢ እና የትንታኔ ግንዛቤዎችን ለማመንጨት፣ እና ከመለያዎ ወይም ከእንቅስቃሴዎ ጋር በተያያዘ ለማግባባት ነው። የግል መረጃዎን ለሶስተኛ ወገኖች አንሸጥም።",
        },
        location: {
          title: "የአካባቢና የንብረት መረጃ",
          body: "የንብረት ምዝገባዎች አድራሻና አካባቢ መረጃን ያካትታሉ፤ እነዚህንም ለፍለጋ፣ ለአካባቢ ግንዛቤ ነጥቦች (ደህንነት፣ መሰረተ-ልማት፣ ትራንስፖርት፣ ትምህርት ቤቶች፣ የኑሮ ውድነት) እና ለኤ.አይ. ምክሮች እንጠቀምባቸዋለን። ይህ መረጃ ከንብረት ባለቤቶችና፣ ሲገኝ፣ ከሶስተኛ ወገን ወይም ከህዝባዊ የአካባቢ ዳታ ምንጮች የተገኘ ነው።",
        },
        sharing: {
          title: "የመረጃ መጋራት",
          body: "መረጃን ከሌሎች ተጠቃሚዎች ጋር የምናጋራው አገልግሎቱ እንዲሰራ አስፈላጊ ሲሆን ብቻ ነው፤ ለምሳሌ በንብረት ላይ ፍላጎት ሲያሳዩ የመገናኛ ዝርዝርዎን ለአከራይ ማጋራት፣ ወይም እርስዎ ለመገናኘት የመረጧቸውን የቤት ጓደኛ ጋር ማጋራት። መድረኩን እንድናስኬድ የሚረዱንን አገልግሎት ሰጪዎች (እንደ ክላውድ ማከማቻና የክፍያ አስፈፃሚዎች) ጋርም፣ እና በህግ ሲጠየቅ መረጃን እናጋራለን።",
        },
        security: {
          title: "የመረጃ ማከማቻና ደህንነት",
          body: "የእርስዎ መረጃ በተጠበቀ ክላውድ መሰረተ-ልማት ላይ የመግቢያ ቁጥጥሮች ባለበት ይከማቻል። መረጃዎን ለመጠበቅ ምክንያታዊ እርምጃዎችን ብንወስድም፣ ምንም ስርዓት ሙሉ በሙሉ ደህንነቱ የተጠበቀ ስላልሆነ ወደ መድረኩ የሚተላለፍ ወይም ከመድረኩ የሚወጣ መረጃ ፍጹም ደህንነት እንዳለው ማረጋገጥ አንችልም።",
        },
        rights: {
          title: "የእርስዎ መብቶችና ምርጫዎች",
          body: "የመለያ መረጃዎን በማንኛውም ጊዜ መመልከትና ማስተካከል ይችላሉ፣ እንዲሁም መለያዎ እንዲሰረዝ በማናገረን መጠየቅ ይችላሉ። እንደ ኢሜይል አድራሻ ያሉ አማራጭ መረጃዎችን ላለመስጠት መምረጥ ይችላሉ፤ ይህ ግን አንዳንድ ባህሪያትን ሊገድብ ይችላል።",
        },
        children: {
          title: "የልጆች ግላዊነት",
          body: "ጎጆ አፍሪካ ከ18 ዓመት በታች ለሆኑ ልጆች የተዘጋጀ አይደለም፣ እና ከእነሱ መረጃን ሆን ብለን አንሰበስብም። ልጅ መለያ መከፈቱን ካመኑ፣ እንድናስወግደው እኛን ያነጋግሩን።",
        },
        changes: {
          title: "በዚህ መመሪያ ላይ የሚደረጉ ለውጦች",
          body: "መድረኩ እያደገ ሲሄድ ይህን የግላዊነት መመሪያ ከጊዜ ወደ ጊዜ ልናሻሽለው እንችላለን። ለውጦች ሲደረጉ ከላይ ያለውን \"መጨረሻ የተሻሻለበት ቀን\" እናዘምናለን፣ ጉልህ ለውጦችም በመድረኩ ይነገራሉ።",
        },
        contact: {
          title: "ያግኙን",
          body: "ይህን የግላዊነት መመሪያ ወይም መረጃዎ እንዴት እንደሚያያዝ በተመለከተ ጥያቄ ካለዎት በ support@gojoafrica.com ያግኙን።",
        },
      },
    },
    legalTermsPage: {
      title: "የአገልግሎት ውሎች",
      updated: "መጨረሻ የተሻሻለበት ቀን፦ ሰኔ 24፣ 2026",
      intro:
        "እነዚህ የአገልግሎት ውሎች (\"ውሎች\") ለኢትዮጵያና ለኢትዮጵያ ዲያስፖራ የተዘጋጀውን የቤት ገበያና ተያያዥ አገልግሎቶችን የሚያቀርበውን ጎጆ አፍሪካን መድረክ መጠቀምዎን ይመለከታሉ። መለያ በመክፈት ወይም መድረኩን በመጠቀም በዚህ ውስጥ የተገለጹትን ውሎች ተቀብለዋል ማለት ነው።",
      sections: {
        acceptance: {
          title: "ውሎችን መቀበል",
          body: "ጎጆ አፍሪካን በመጠቀምዎ ቢያንስ የ18 ዓመት ዕድሜ እንዳለዎት፣ አስገዳጅ ስምምነት ለመግባት የሚችሉ መሆንዎን፣ እና በዚህ ውል እና በግላዊነት መመሪያችን መስማማትዎን ያረጋግጣሉ።",
        },
        service: {
          title: "የአገልግሎት መግለጫ",
          body: "ጎጆ አፍሪካ የንብረት ገበያ፣ በኤ.አይ. የተደገፈ የቤት ፍለጋ፣ የአካባቢ ግንዛቤ፣ የንብረት ማረጋገጫ፣ የቤት ጓደኛ ግጥሚያ፣ የዲያስፖራ ልዩ አገልግሎቶች እና የቤት አገልግሎቶች ገበያን ያቀርባል። ባህሪያት ከጊዜ ወደ ጊዜ ሊጨመሩ፣ ሊቀየሩ ወይም ሊወገዱ ይችላሉ።",
        },
        accounts: {
          title: "የተጠቃሚ መለያዎች",
          body: "የመለያ መግቢያ ዝርዝሮችዎን ደህንነት መጠበቅና በመለያዎ ስር የሚደረግ ማንኛውም እንቅስቃሴ የእርስዎ ኃላፊነት ነው። ሲመዘገቡ ትክክለኛ መረጃ መስጠትና እንደ አስፈላጊነቱ ማዘመን ይጠበቅባቸዋል። ይህን ውል የሚጥሱ መለያዎችን እናግድ ወይም እናቋርጥ ይሆናል።",
        },
        listings: {
          title: "ምዝገባዎችና የገበያ ምግባር",
          body: "አከራዮችና ወኪሎች የምዝገባቸውን ትክክለኛነት፣ ዋጋ፣ ተገኝነትና የንብረት ሁኔታን ጨምሮ ኃላፊነት ይወስዳሉ። ጎጆ አፍሪካ ማጭበርበርንና ስርቆትን ለመቀነስ በኤ.አይ. እና በሰው ኃይል ማረጋገጫ ያደርጋል፣ ሆኖም ሁሉም ምዝገባ ትክክለኛ ወይም የተገኘ መሆኑን አይተውም። ተጠቃሚዎች ክፍያ ወይም ስምምነት ከመግባት በፊት በአካል ወይም በቪዲዮ ማረጋገጥ የመሰለ ምክንያታዊ ጥንቃቄ ማድረግ አለባቸው።",
        },
        diaspora: {
          title: "የዲያስፖራና የርቀት ግብይቶች",
          body: "የዲያስፖራ ልዩ አገልግሎቶች (ምናባዊ ጉብኝት፣ የቪዲዮ ምርመራ፣ የርቀት ፊርማ) ከውጭ ሀገር ግብይት የሚፈጽሙ ተጠቃሚዎችን ለመርዳት የቀረቡ ናቸው፣ ሆኖም ጎጆ አፍሪካ በተጠቃሚዎች መካከል ባለው የኪራይ ወይም የሽያጭ ስምምነት ላይ ወገን አይደለም፣ እና ከእነዚህ ስምምነቶች ለሚነሱ አለመግባባቶች ኃላፊነት የለውም።",
        },
        verification: {
          title: "ማረጋገጫና የእምነት ነጥቦች",
          body: "የእምነት ነጥቦችና የማረጋገጫ ምልክቶች በተወሰነ ጊዜ ላይ ባለው መረጃ ላይ የተመሰረተ የእኛ ግምገማ ያንፀባርቃሉ። ጠቃሚ ምልክት ለመሆን የታሰቡ ናቸው፣ የተጠቃሚ ወይም የንብረት ህጋዊነት፣ ሁኔታ ወይም አስተማማኝነት ማረጋገጫ አይደሉም።",
        },
        payments: {
          title: "ክፍያዎችና ክፍያዎች",
          body: "በመድረኩ ላይ ያሉ አንዳንድ አገልግሎቶች ክፍያ ሊያስከፍሉ ይችላሉ፤ ይህም ቀድሞ በግልጽ ይነገራል። ጎጆ አፍሪካ ባንክ ወይም የክፍያ አስፈፃሚ አይደለም፤ በተጠቃሚዎች መካከል ለኪራይ፣ ለቅድሚያ ክፍያ ወይም ለአገልግሎት የሚደረግ ክፍያ የእነዚያ ተጠቃሚዎች ኃላፊነት ነው።",
        },
        prohibited: {
          title: "የተከለከሉ ድርጊቶች",
          body: "ጎጆ አፍሪካን ለማጭበርበር ወይም አሳሳች ምዝገባ ለማውጣት፣ ሌሎች ተጠቃሚዎችን ለማስቸገር፣ ህገ-ወጥ መድልዎ ለማድረግ፣ የመድረኩን ዳታ ለመስለብ ወይም ለማላሌት፣ ወይም የመድረኩን ደህንነት ወይም ስራ ለማወክ መጠቀም አይፈቀድም።",
        },
        liability: {
          title: "ማስታወቂያዎችና የተወሰነ ኃላፊነት",
          body: "ጎጆ አፍሪካ \"እንዳለ\" ምንም ዓይነት ማረጋገጫ ሳይኖር ይቀርባል። በህግ በሚፈቀደው መጠን፣ ጎጆ አፍሪካ ከመድረኩ አጠቃቀም ለሚነሱ ቀጥተኛ ያልሆኑ፣ ድንገተኛ ወይም ተከታይ ጉዳቶች፣ በተጠቃሚዎች መካከል ለሚነሱ አለመግባባቶችን ጨምሮ ኃላፊነት የለውም።",
        },
        termination: {
          title: "ስምምነት ማቋረጥ",
          body: "ጎጆ አፍሪካን በማንኛውም ጊዜ መጠቀም ማቆም ይችላሉ። ይህን ውል የሚጥሱ ወይም ሌሎች ተጠቃሚዎችን ወይም መድረኩን ይጎዳሉ ብለን የምናምንባቸውን ድርጊቶች ለፈጸሙ መለያዎች ወደ መድረኩ መግባትን እናግድ ወይም እናቋርጥ ይሆናል።",
        },
        law: {
          title: "ተፈጻሚ ህግ",
          body: "እነዚህ ውሎች በኢትዮጵያ ህግ ይመራሉ፣ የህግ ግጭት መርሆዎችን ግምት ውስጥ ሳያስገባ፣ እንደ ተፈጻሚ የአካባቢ ህግ ሌላ ካልጠየቀ በስተቀር።",
        },
        changes: {
          title: "በእነዚህ ውሎች ላይ የሚደረጉ ለውጦች",
          body: "መድረኩ እያደገ ሲሄድ እነዚህን ውሎች ልናሻሽላቸው እንችላለን። ለውጦች ከተደረጉ በኋላ ጎጆ አፍሪካን መጠቀም መቀጠል የተሻሻሉትን ውሎች መቀበል ማለት ነው።",
        },
        contact: {
          title: "ያግኙን",
          body: "ስለ እነዚህ ውሎች ጥያቄ ካለዎት በ support@gojoafrica.com ያግኙን።",
        },
      },
    },
  },
};

function lookup(dict: Dict, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Dict)) {
      return (acc as Dict)[key];
    }
    return undefined;
  }, dict);
}

/**
 * Translate a dot-path key for the given locale, falling back to English
 * and then to the raw key if nothing matches. Supports simple {var}
 * interpolation, e.g. t("am", "auth.greeting", { name: "Selam" }).
 */
export function t(locale: Locale, path: string, vars?: Record<string, string | number>): string {
  let value = lookup(translations[locale] ?? translations.en, path);
  if (value === undefined) value = lookup(translations.en, path);
  if (typeof value !== "string") return path;
  if (!vars) return value;
  return Object.entries(vars).reduce((str, [key, val]) => str.split(`{${key}}`).join(String(val)), value);
}

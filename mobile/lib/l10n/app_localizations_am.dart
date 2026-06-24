// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Amharic (`am`).
class AppLocalizationsAm extends AppLocalizations {
  AppLocalizationsAm([String locale = 'am']) : super(locale);

  @override
  String get navMarketplace => 'ገበያ';

  @override
  String get navAiHunter => 'ኤ.አይ. ፈላጊ';

  @override
  String get navPost => 'ይመዝግቡ';

  @override
  String get navAccount => 'መለያ';

  @override
  String get marketplaceTitle => 'ገበያ';

  @override
  String get marketplaceEmpty => 'እስካሁን ምንም ንብረት አልተመዘገበም።';

  @override
  String marketplaceBackendError(String url) {
    return 'አገልጋዩን በ$url ማግኘት አልተቻለም።';
  }

  @override
  String trustLabel(String score) {
    return 'እምነት $score';
  }

  @override
  String get aiHunterTitle => 'የኤ.አይ. ቤት ፈላጊ';

  @override
  String get aiHunterHint => 'ለምሳሌ፡ በቦሌ አካባቢ ከ25,000 ብር በታች 3 መኝታ ቤት ያለው';

  @override
  String get aiHunterSearch => 'ይፈልጉ';

  @override
  String get aiHunterSearching => 'በመፈለግ ላይ...';

  @override
  String get aiHunterError => 'ፍለጋው አልተሳካም። አገልጋዩ እየሰራ መሆኑን ያረጋግጡ።';

  @override
  String get postListingTitle => 'ቤት ይመዝግቡ';

  @override
  String get postListingNeedLogin => 'ቤት ለመመዝገብ መጀመሪያ ከመለያ ክፍል ይግቡ።';

  @override
  String get listingTypeLabel => 'የንብረት አይነት';

  @override
  String get listingTypeRental => 'ኪራይ';

  @override
  String get listingTypeSale => 'ሽያጭ';

  @override
  String get listingTypeCommercial => 'የንግድ';

  @override
  String get listingTypeStudentHousing => 'የተማሪ መኖሪያ';

  @override
  String get listingTypeSharedAccommodation => 'የጋራ መኖሪያ';

  @override
  String get titleLabel => 'ርዕስ';

  @override
  String get requiredError => 'የሚያስፈልግ';

  @override
  String get descriptionLabel => 'መግለጫ';

  @override
  String get priceLabel => 'ዋጋ';

  @override
  String get currencyLabel => 'የገንዘብ መለኪያ';

  @override
  String get bedroomsLabel => 'የመኝታ ቤቶች ብዛት';

  @override
  String get bathroomsLabel => 'የመታጠቢያ ቤቶች ብዛት';

  @override
  String get addressLabel => 'አድራሻ';

  @override
  String get listingSubmitted => 'ንብረቱ በሰላም ገብቷል፤ በማረጋገጫ ሂደት ላይ ነው።';

  @override
  String get listingSubmitError => 'ንብረቱን ማስገባት አልተቻለም። አገልጋዩ እየሰራ መሆኑን ያረጋግጡ።';

  @override
  String get submit => 'ንብረት ያስገቡ';

  @override
  String get submitting => 'በማስገባት ላይ...';

  @override
  String get accountTitle => 'መለያ';

  @override
  String greeting(String name) {
    return 'ሰላም፣ $name';
  }

  @override
  String phoneLine(String phone) {
    return 'ስልክ፡ $phone';
  }

  @override
  String roleLine(String role) {
    return 'ደረጃ፡ $role';
  }

  @override
  String trustScoreLine(String score) {
    return 'የእምነት ነጥብ፡ $score';
  }

  @override
  String get logout => 'ይውጡ';

  @override
  String get signUpTitle => 'ይመዝገቡ';

  @override
  String get logInTitle => 'ይግቡ';

  @override
  String get fullNameLabel => 'ሙሉ ስም';

  @override
  String get phoneNumberLabel => 'የስልክ ቁጥር';

  @override
  String get passwordLabel => 'የመግቢያ ቁጥር';

  @override
  String get iAmALabel => 'እኔ...';

  @override
  String get roleRenter => 'ተከራይ ወይም ገዢ';

  @override
  String get roleLandlord => 'አከራይ';

  @override
  String get roleAgent => 'ወኪል';

  @override
  String get roleProvider => 'የአገልግሎት ሰጪ';

  @override
  String get signUp => 'ይመዝገቡ';

  @override
  String get creatingAccount => 'መለያ በመክፈት ላይ...';

  @override
  String get alreadyHaveAccount => 'መለያ አለዎት? ይግቡ';

  @override
  String get login => 'ይግቡ';

  @override
  String get loggingIn => 'በመግባት ላይ...';

  @override
  String get needAccount => 'መለያ ይፈልጋሉ? ይመዝገቡ';

  @override
  String get loginError => 'መግባት አልተሳካም። የመግቢያ ዝርዝሮችዎንና የአገልጋይ ግንኙነቱን ያረጋግጡ።';

  @override
  String get registerError =>
      'መለያ መክፈት አልተቻለም። ይህ ስልክ ቁጥር ቀደም ሲል ተመዝግቦ ሊሆን ይችላል።';

  @override
  String get quoteOfTheDay => 'የዕለቱ ጥቅስ';

  @override
  String get dailyQuoteContinue => 'ወደ ጎጆ አፍሪካ ይቀጥሉ';

  @override
  String get language => 'ቋንቋ';

  @override
  String get navExplore => 'ተጨማሪ';

  @override
  String get exploreTitle => 'ተጨማሪ አገልግሎቶች';

  @override
  String get moduleNeighborhoodTitle => 'የአካባቢ መረጃ';

  @override
  String get moduleNeighborhoodDesc =>
      'የደህንነት ሁኔታ፣ መሰረተ-ልማቶች፣ የኢንተርኔት ተደራሽነት፣ ትራንስፖርት፣ ትምህርት ቤቶች፣ የኑሮ ውድነት።';

  @override
  String get moduleVerificationTitle => 'የተረጋገጠ ንብረት ስርዓት';

  @override
  String get moduleVerificationDesc =>
      'በ AI እና በሰው ኃይል ማረጋገጫ፣ የእምነት ነጥብ (Trust Score)፣ የማጭበርበር መከላከያ።';

  @override
  String get moduleHousematesTitle => 'የቤት ጓደኛ ማገናኛ';

  @override
  String get moduleHousematesDesc => 'የተስማሚነት ነጥብ፣ መልዕክት መለዋወጥ፣ የጋራ በጀት እቅድ።';

  @override
  String get moduleDiasporaTitle => 'የዲያስፖራ አገልግሎት';

  @override
  String get moduleDiasporaDesc =>
      'ምናባዊ ጉብኝት (Virtual Tour)፣ የቪዲዮ ምርመራ፣ የርቀት ፊርማ፣ ዓለም አቀፍ ክፍያ።';

  @override
  String get moduleServicesTitle => 'የቤት አገልግሎቶች ገበያ';

  @override
  String get moduleServicesDesc =>
      'የቤት አጓጓዦች፣ አጽዳቂዎች፣ የቤት ዕቃ አቅራቢዎች፣ የኢንተርኔት አገልግሎት፣ የጥገና ባለሙያዎች፣ ኢንሹራንስ።';

  @override
  String get neighborhoodsTitle => 'የአካባቢ መረጃ';

  @override
  String get neighborhoodsEmpty => 'እስካሁን የተመዘገበ አካባቢ የለም።';

  @override
  String get neighborhoodSafety => 'ደህንነት';

  @override
  String get neighborhoodWater => 'የውሃ አስተማማኝነት';

  @override
  String get neighborhoodElectricity => 'የመብራት አስተማማኝነት';

  @override
  String get neighborhoodInternet => 'የኢንተርኔት ጥራት';

  @override
  String get neighborhoodTransport => 'የትራንስፖርት አቅርቦት';

  @override
  String get neighborhoodSchool => 'ለትምህርት ቤት ቅርበት';

  @override
  String get neighborhoodHospital => 'ለሆስፒታል ቅርበት';

  @override
  String get neighborhoodCostOfLiving => 'የኑሮ ውድነት';

  @override
  String get verificationTitle => 'የማረጋገጫ ሂደት ላይ ያሉ ጥያቄዎች';

  @override
  String get verificationEmpty => 'በአሁኑ ጊዜ ምንም በማረጋገጫ የሚጠብቅ ነገር የለም።';

  @override
  String get verificationTarget => 'ርዕሰ ጉዳይ';

  @override
  String get verificationStage => 'ደረጃ';

  @override
  String get verificationPending => 'በመጠባበቅ ላይ';

  @override
  String get housematesTitle => 'የቤት ጓደኛ ማገናኛ';

  @override
  String get housematesIntro =>
      'በጀትዎንና የአኗኗር ዘይቤዎን ይንገሩን፤ ከእርስዎ ጋር የሚስማሙ የቤት ጓደኞችን እናቀርብልዎታለን።';

  @override
  String get housematesNeedLogin => 'የቤት ጓደኛ መገለጫ ለመክፈት መጀመሪያ ከመለያ ክፍል ይግቡ።';

  @override
  String get housematesBudgetMin => 'ዝቅተኛ በጀት';

  @override
  String get housematesBudgetMax => 'ከፍተኛ በጀት';

  @override
  String get housematesLifestyle => 'የአኗኗር ዘይቤ መግለጫ';

  @override
  String get housematesLifestyleHint =>
      'ለምሳሌ፦ ጧት ተነሺ፣ ትንባሆ የማይጨስ፣ ጸጥ ያለ አካባቢ ወዳጅ';

  @override
  String get housematesSave => 'መገለጫ ያስቀምጡ';

  @override
  String get housematesSaving => 'በማስቀመጥ ላይ...';

  @override
  String get housematesSaved => 'መገለጫዎ ተቀምጧል።';

  @override
  String get housematesFindMatches => 'ግጥሚያዎችን ይፈልጉ';

  @override
  String get housematesFinding => 'በመፈለግ ላይ...';

  @override
  String get housematesMatchesTitle => 'ሊስማሙ የሚችሉ ጓደኞች';

  @override
  String get housematesNoMatches => 'እስካሁን ግጥሚያ አልተገኘም።';

  @override
  String housematesCompatibility(String score) {
    return 'ተስማሚነት $score%';
  }

  @override
  String get housematesError =>
      'መገለጫዎን ማስቀመጥ አልተቻለም። መረጃውን እና አገልጋዩ እየሰራ መሆኑን ያረጋግጡ።';

  @override
  String get diasporaTitle => 'የዲያስፖራ አገልግሎት';

  @override
  String get diasporaIntro =>
      'ከየትኛውም የዓለም ክፍል ሆነው ለንብረት ምናባዊ ጉብኝት፣ የቪዲዮ ምርመራ ወይም የርቀት ፊርማ ይጠይቁ።';

  @override
  String get diasporaNeedLogin => 'ይህን አገልግሎት ለመጠየቅ መጀመሪያ ከመለያ ክፍል ይግቡ።';

  @override
  String get diasporaPropertyId => 'የንብረት መለያ ቁጥር';

  @override
  String get diasporaPropertyIdHint => 'ከገበያው ላይ ያገኙትን የንብረት መለያ ቁጥር ይለጥፉ';

  @override
  String get diasporaVirtualTour => 'ምናባዊ ጉብኝት ይጠይቁ';

  @override
  String get diasporaVideoInspection => 'የቪዲዮ ምርመራ ይጠይቁ';

  @override
  String get diasporaRemoteSigning => 'የርቀት ፊርማ ይጠይቁ';

  @override
  String get diasporaRequesting => 'በመጠየቅ ላይ...';

  @override
  String get diasporaRequestedTitle => 'ጥያቄው ተልኳል';

  @override
  String diasporaRequestedBody(String id, String status) {
    return 'የጥያቄ ቁጥር $id ደረጃው $status ሆኗል።';
  }

  @override
  String get diasporaError =>
      'ጥያቄውን ማስገባት አልተቻለም። የንብረት መለያ ቁጥሩን እና አገልጋዩ እየሰራ መሆኑን ያረጋግጡ።';

  @override
  String get servicesTitle => 'የቤት አገልግሎቶች ገበያ';

  @override
  String get servicesEmpty => 'እስካሁን የተመዘገበ አገልግሎት አቅራቢ የለም።';

  @override
  String get servicesServiceType => 'የአገልግሎት አይነት';

  @override
  String get serviceTypeMover => 'አጓጓዥ';

  @override
  String get serviceTypeCleaner => 'የጽዳት ሰራተኛ';

  @override
  String get serviceTypeFurniture => 'የቤት እቃ';

  @override
  String get serviceTypeInternetProvider => 'የኢንተርኔት አቅራቢ';

  @override
  String get serviceTypeMaintenance => 'ጥገና';

  @override
  String get serviceTypeInsurance => 'መድን';

  @override
  String get servicesNeedLogin => 'አገልግሎት ለማስያዝ መጀመሪያ ከመለያ ክፍል ይግቡ።';

  @override
  String get servicesProvider => 'አቅራቢ';

  @override
  String get servicesBook => 'ያስያዙ';

  @override
  String get servicesBooking => 'በማስያዝ ላይ...';

  @override
  String servicesBookedBody(String status) {
    return 'የእርስዎ ጥያቄ ደረጃው $status ሆኗል።';
  }

  @override
  String get servicesError =>
      'ጥያቄውን ማስገባት አልተቻለም። መረጃውን እና አገልጋዩ እየሰራ መሆኑን ያረጋግጡ።';
}

// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get navMarketplace => 'Marketplace';

  @override
  String get navAiHunter => 'AI Hunter';

  @override
  String get navPost => 'Post';

  @override
  String get navAccount => 'Account';

  @override
  String get marketplaceTitle => 'Marketplace';

  @override
  String get marketplaceEmpty => 'No listings yet.';

  @override
  String marketplaceBackendError(String url) {
    return 'Could not reach backend at $url';
  }

  @override
  String trustLabel(String score) {
    return 'Trust $score';
  }

  @override
  String get aiHunterTitle => 'AI House Hunter';

  @override
  String get aiHunterHint => 'e.g. 3-bedroom near Bole under 25,000 ETB';

  @override
  String get aiHunterSearch => 'Search';

  @override
  String get aiHunterSearching => 'Searching...';

  @override
  String get aiHunterError =>
      'Search failed -- check that the backend is running.';

  @override
  String get postListingTitle => 'Post a Listing';

  @override
  String get postListingNeedLogin =>
      'Log in from the Account tab first to post a listing.';

  @override
  String get listingTypeLabel => 'Listing type';

  @override
  String get listingTypeRental => 'Rental';

  @override
  String get listingTypeSale => 'Sale';

  @override
  String get listingTypeCommercial => 'Commercial';

  @override
  String get listingTypeStudentHousing => 'Student Housing';

  @override
  String get listingTypeSharedAccommodation => 'Shared Accommodation';

  @override
  String get titleLabel => 'Title';

  @override
  String get requiredError => 'Required';

  @override
  String get descriptionLabel => 'Description';

  @override
  String get priceLabel => 'Price';

  @override
  String get currencyLabel => 'Currency';

  @override
  String get bedroomsLabel => 'Bedrooms';

  @override
  String get bathroomsLabel => 'Bathrooms';

  @override
  String get addressLabel => 'Address';

  @override
  String get listingSubmitted => 'Listing submitted -- pending verification.';

  @override
  String get listingSubmitError =>
      'Could not submit listing -- check the backend is running.';

  @override
  String get submit => 'Submit Listing';

  @override
  String get submitting => 'Submitting...';

  @override
  String get accountTitle => 'Account';

  @override
  String greeting(String name) {
    return 'Hi, $name';
  }

  @override
  String phoneLine(String phone) {
    return 'Phone: $phone';
  }

  @override
  String emailLine(String email) {
    return 'Email: $email';
  }

  @override
  String roleLine(String role) {
    return 'Role: $role';
  }

  @override
  String trustScoreLine(String score) {
    return 'Trust score: $score';
  }

  @override
  String get logout => 'Log out';

  @override
  String get signUpTitle => 'Sign Up';

  @override
  String get logInTitle => 'Log In';

  @override
  String get fullNameLabel => 'Full name';

  @override
  String get phoneNumberLabel => 'Phone number (optional)';

  @override
  String get identifierLabel => 'Email or phone number';

  @override
  String get emailLabel => 'Email (optional)';

  @override
  String get contactHint => 'Provide an email, a phone number, or both.';

  @override
  String get contactRequiredError => 'Enter an email or a phone number.';

  @override
  String get passwordLabel => 'Password';

  @override
  String get iAmALabel => 'I am a...';

  @override
  String get roleRenter => 'Renter / Buyer';

  @override
  String get roleLandlord => 'Landlord';

  @override
  String get roleAgent => 'Agent';

  @override
  String get roleProvider => 'Service Provider';

  @override
  String get signUp => 'Sign up';

  @override
  String get creatingAccount => 'Creating account...';

  @override
  String get alreadyHaveAccount => 'Already have an account? Log in';

  @override
  String get login => 'Log in';

  @override
  String get loggingIn => 'Logging in...';

  @override
  String get needAccount => 'Need an account? Sign up';

  @override
  String get loginError =>
      'Login failed -- check your credentials and the backend connection.';

  @override
  String get registerError =>
      'Could not create account -- that email or phone may already be registered.';

  @override
  String get quoteOfTheDay => 'Quote of the Day';

  @override
  String get dailyQuoteContinue => 'Continue to Gojo Africa';

  @override
  String get language => 'Language';

  @override
  String get navExplore => 'More';

  @override
  String get exploreTitle => 'More Services';

  @override
  String get moduleNeighborhoodTitle => 'Neighborhood Intelligence';

  @override
  String get moduleNeighborhoodDesc =>
      'Safety, utilities, internet, transit, schools, cost of living.';

  @override
  String get moduleVerificationTitle => 'Verified Property System';

  @override
  String get moduleVerificationDesc =>
      'AI + human verification, trust scores, scam detection.';

  @override
  String get moduleHousematesTitle => 'Housemate Matching';

  @override
  String get moduleHousematesDesc =>
      'Compatibility scoring, messaging, shared budget planning.';

  @override
  String get moduleDiasporaTitle => 'Diaspora Concierge';

  @override
  String get moduleDiasporaDesc =>
      'Virtual tours, video inspection, remote signing, international payments.';

  @override
  String get moduleServicesTitle => 'Home Services Marketplace';

  @override
  String get moduleServicesDesc =>
      'Movers, cleaners, furniture, internet, maintenance, insurance.';

  @override
  String get neighborhoodsTitle => 'Neighborhood Intelligence';

  @override
  String get neighborhoodsEmpty => 'No neighborhoods added yet.';

  @override
  String get neighborhoodSafety => 'Safety';

  @override
  String get neighborhoodWater => 'Water reliability';

  @override
  String get neighborhoodElectricity => 'Electricity reliability';

  @override
  String get neighborhoodInternet => 'Internet quality';

  @override
  String get neighborhoodTransport => 'Transportation access';

  @override
  String get neighborhoodSchool => 'School proximity';

  @override
  String get neighborhoodHospital => 'Hospital proximity';

  @override
  String get neighborhoodCostOfLiving => 'Cost of living';

  @override
  String get verificationTitle => 'Verification Queue';

  @override
  String get verificationEmpty => 'Nothing pending verification right now.';

  @override
  String get verificationTarget => 'Target';

  @override
  String get verificationStage => 'Stage';

  @override
  String get verificationPending => 'Pending';

  @override
  String get housematesTitle => 'Housemate Matching';

  @override
  String get housematesIntro =>
      'Tell us your budget and living habits, and we\'ll surface compatible housemates.';

  @override
  String get housematesNeedLogin =>
      'Log in from the Account tab first to set up a housemate profile.';

  @override
  String get housematesBudgetMin => 'Minimum budget';

  @override
  String get housematesBudgetMax => 'Maximum budget';

  @override
  String get housematesLifestyle => 'Lifestyle notes';

  @override
  String get housematesLifestyleHint =>
      'e.g. early riser, non-smoker, quiet, no pets';

  @override
  String get housematesSave => 'Save profile';

  @override
  String get housematesSaving => 'Saving...';

  @override
  String get housematesSaved => 'Profile saved.';

  @override
  String get housematesFindMatches => 'Find matches';

  @override
  String get housematesFinding => 'Finding matches...';

  @override
  String get housematesMatchesTitle => 'Possible matches';

  @override
  String get housematesNoMatches =>
      'No matches yet. Check back once more housemate profiles are added.';

  @override
  String housematesCompatibility(String score) {
    return 'Compatibility $score%';
  }

  @override
  String get housematesError =>
      'Could not save your profile. Check the fields and that the backend is running.';

  @override
  String get diasporaTitle => 'Diaspora Concierge';

  @override
  String get diasporaIntro =>
      'Request a virtual tour, video inspection, or remote signing for a property from anywhere in the world.';

  @override
  String get diasporaNeedLogin =>
      'Log in from the Account tab first to request concierge services.';

  @override
  String get diasporaPropertyId => 'Property ID';

  @override
  String get diasporaPropertyIdHint =>
      'Paste a property ID from the marketplace';

  @override
  String get diasporaVirtualTour => 'Request virtual tour';

  @override
  String get diasporaVideoInspection => 'Request video inspection';

  @override
  String get diasporaRemoteSigning => 'Request remote signing';

  @override
  String get diasporaRequesting => 'Requesting...';

  @override
  String get diasporaRequestedTitle => 'Request sent';

  @override
  String diasporaRequestedBody(String id, String status) {
    return 'Request $id is now $status.';
  }

  @override
  String get diasporaError =>
      'Could not submit the request. Check the property ID and that the backend is running.';

  @override
  String get servicesTitle => 'Home Services Marketplace';

  @override
  String get servicesEmpty => 'No service providers listed yet.';

  @override
  String get servicesServiceType => 'Service type';

  @override
  String get serviceTypeMover => 'Mover';

  @override
  String get serviceTypeCleaner => 'Cleaner';

  @override
  String get serviceTypeFurniture => 'Furniture';

  @override
  String get serviceTypeInternetProvider => 'Internet provider';

  @override
  String get serviceTypeMaintenance => 'Maintenance';

  @override
  String get serviceTypeInsurance => 'Insurance';

  @override
  String get servicesNeedLogin =>
      'Log in from the Account tab first to book a service.';

  @override
  String get servicesProvider => 'Provider';

  @override
  String get servicesBook => 'Book';

  @override
  String get servicesBooking => 'Booking...';

  @override
  String servicesBookedBody(String status) {
    return 'Your booking is now $status.';
  }

  @override
  String get servicesError =>
      'Could not create the booking. Check the fields and that the backend is running.';
}

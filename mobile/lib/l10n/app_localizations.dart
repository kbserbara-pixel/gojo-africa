import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_am.dart';
import 'app_localizations_en.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
      : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('am'),
    Locale('en')
  ];

  /// No description provided for @navMarketplace.
  ///
  /// In en, this message translates to:
  /// **'Marketplace'**
  String get navMarketplace;

  /// No description provided for @navAiHunter.
  ///
  /// In en, this message translates to:
  /// **'AI Hunter'**
  String get navAiHunter;

  /// No description provided for @navPost.
  ///
  /// In en, this message translates to:
  /// **'Post'**
  String get navPost;

  /// No description provided for @navAccount.
  ///
  /// In en, this message translates to:
  /// **'Account'**
  String get navAccount;

  /// No description provided for @marketplaceTitle.
  ///
  /// In en, this message translates to:
  /// **'Marketplace'**
  String get marketplaceTitle;

  /// No description provided for @marketplaceEmpty.
  ///
  /// In en, this message translates to:
  /// **'No listings yet.'**
  String get marketplaceEmpty;

  /// No description provided for @marketplaceBackendError.
  ///
  /// In en, this message translates to:
  /// **'Could not reach backend at {url}'**
  String marketplaceBackendError(String url);

  /// No description provided for @trustLabel.
  ///
  /// In en, this message translates to:
  /// **'Trust {score}'**
  String trustLabel(String score);

  /// No description provided for @aiHunterTitle.
  ///
  /// In en, this message translates to:
  /// **'AI House Hunter'**
  String get aiHunterTitle;

  /// No description provided for @aiHunterHint.
  ///
  /// In en, this message translates to:
  /// **'e.g. 3-bedroom near Bole under 25,000 ETB'**
  String get aiHunterHint;

  /// No description provided for @aiHunterSearch.
  ///
  /// In en, this message translates to:
  /// **'Search'**
  String get aiHunterSearch;

  /// No description provided for @aiHunterSearching.
  ///
  /// In en, this message translates to:
  /// **'Searching...'**
  String get aiHunterSearching;

  /// No description provided for @aiHunterError.
  ///
  /// In en, this message translates to:
  /// **'Search failed -- check that the backend is running.'**
  String get aiHunterError;

  /// No description provided for @postListingTitle.
  ///
  /// In en, this message translates to:
  /// **'Post a Listing'**
  String get postListingTitle;

  /// No description provided for @postListingNeedLogin.
  ///
  /// In en, this message translates to:
  /// **'Log in from the Account tab first to post a listing.'**
  String get postListingNeedLogin;

  /// No description provided for @listingTypeLabel.
  ///
  /// In en, this message translates to:
  /// **'Listing type'**
  String get listingTypeLabel;

  /// No description provided for @listingTypeRental.
  ///
  /// In en, this message translates to:
  /// **'Rental'**
  String get listingTypeRental;

  /// No description provided for @listingTypeSale.
  ///
  /// In en, this message translates to:
  /// **'Sale'**
  String get listingTypeSale;

  /// No description provided for @listingTypeCommercial.
  ///
  /// In en, this message translates to:
  /// **'Commercial'**
  String get listingTypeCommercial;

  /// No description provided for @listingTypeStudentHousing.
  ///
  /// In en, this message translates to:
  /// **'Student Housing'**
  String get listingTypeStudentHousing;

  /// No description provided for @listingTypeSharedAccommodation.
  ///
  /// In en, this message translates to:
  /// **'Shared Accommodation'**
  String get listingTypeSharedAccommodation;

  /// No description provided for @titleLabel.
  ///
  /// In en, this message translates to:
  /// **'Title'**
  String get titleLabel;

  /// No description provided for @requiredError.
  ///
  /// In en, this message translates to:
  /// **'Required'**
  String get requiredError;

  /// No description provided for @descriptionLabel.
  ///
  /// In en, this message translates to:
  /// **'Description'**
  String get descriptionLabel;

  /// No description provided for @priceLabel.
  ///
  /// In en, this message translates to:
  /// **'Price'**
  String get priceLabel;

  /// No description provided for @currencyLabel.
  ///
  /// In en, this message translates to:
  /// **'Currency'**
  String get currencyLabel;

  /// No description provided for @bedroomsLabel.
  ///
  /// In en, this message translates to:
  /// **'Bedrooms'**
  String get bedroomsLabel;

  /// No description provided for @bathroomsLabel.
  ///
  /// In en, this message translates to:
  /// **'Bathrooms'**
  String get bathroomsLabel;

  /// No description provided for @addressLabel.
  ///
  /// In en, this message translates to:
  /// **'Address'**
  String get addressLabel;

  /// No description provided for @listingSubmitted.
  ///
  /// In en, this message translates to:
  /// **'Listing submitted -- pending verification.'**
  String get listingSubmitted;

  /// No description provided for @listingSubmitError.
  ///
  /// In en, this message translates to:
  /// **'Could not submit listing -- check the backend is running.'**
  String get listingSubmitError;

  /// No description provided for @submit.
  ///
  /// In en, this message translates to:
  /// **'Submit Listing'**
  String get submit;

  /// No description provided for @submitting.
  ///
  /// In en, this message translates to:
  /// **'Submitting...'**
  String get submitting;

  /// No description provided for @accountTitle.
  ///
  /// In en, this message translates to:
  /// **'Account'**
  String get accountTitle;

  /// No description provided for @greeting.
  ///
  /// In en, this message translates to:
  /// **'Hi, {name}'**
  String greeting(String name);

  /// No description provided for @phoneLine.
  ///
  /// In en, this message translates to:
  /// **'Phone: {phone}'**
  String phoneLine(String phone);

  /// No description provided for @emailLine.
  ///
  /// In en, this message translates to:
  /// **'Email: {email}'**
  String emailLine(String email);

  /// No description provided for @roleLine.
  ///
  /// In en, this message translates to:
  /// **'Role: {role}'**
  String roleLine(String role);

  /// No description provided for @trustScoreLine.
  ///
  /// In en, this message translates to:
  /// **'Trust score: {score}'**
  String trustScoreLine(String score);

  /// No description provided for @logout.
  ///
  /// In en, this message translates to:
  /// **'Log out'**
  String get logout;

  /// No description provided for @signUpTitle.
  ///
  /// In en, this message translates to:
  /// **'Sign Up'**
  String get signUpTitle;

  /// No description provided for @logInTitle.
  ///
  /// In en, this message translates to:
  /// **'Log In'**
  String get logInTitle;

  /// No description provided for @fullNameLabel.
  ///
  /// In en, this message translates to:
  /// **'Full name'**
  String get fullNameLabel;

  /// No description provided for @phoneNumberLabel.
  ///
  /// In en, this message translates to:
  /// **'Phone number (optional)'**
  String get phoneNumberLabel;

  /// No description provided for @identifierLabel.
  ///
  /// In en, this message translates to:
  /// **'Email or phone number'**
  String get identifierLabel;

  /// No description provided for @emailLabel.
  ///
  /// In en, this message translates to:
  /// **'Email (optional)'**
  String get emailLabel;

  /// No description provided for @contactHint.
  ///
  /// In en, this message translates to:
  /// **'Provide an email, a phone number, or both.'**
  String get contactHint;

  /// No description provided for @contactRequiredError.
  ///
  /// In en, this message translates to:
  /// **'Enter an email or a phone number.'**
  String get contactRequiredError;

  /// No description provided for @passwordLabel.
  ///
  /// In en, this message translates to:
  /// **'Password'**
  String get passwordLabel;

  /// No description provided for @iAmALabel.
  ///
  /// In en, this message translates to:
  /// **'I am a...'**
  String get iAmALabel;

  /// No description provided for @roleRenter.
  ///
  /// In en, this message translates to:
  /// **'Renter / Buyer'**
  String get roleRenter;

  /// No description provided for @roleLandlord.
  ///
  /// In en, this message translates to:
  /// **'Landlord'**
  String get roleLandlord;

  /// No description provided for @roleAgent.
  ///
  /// In en, this message translates to:
  /// **'Agent'**
  String get roleAgent;

  /// No description provided for @roleProvider.
  ///
  /// In en, this message translates to:
  /// **'Service Provider'**
  String get roleProvider;

  /// No description provided for @signUp.
  ///
  /// In en, this message translates to:
  /// **'Sign up'**
  String get signUp;

  /// No description provided for @creatingAccount.
  ///
  /// In en, this message translates to:
  /// **'Creating account...'**
  String get creatingAccount;

  /// No description provided for @alreadyHaveAccount.
  ///
  /// In en, this message translates to:
  /// **'Already have an account? Log in'**
  String get alreadyHaveAccount;

  /// No description provided for @login.
  ///
  /// In en, this message translates to:
  /// **'Log in'**
  String get login;

  /// No description provided for @loggingIn.
  ///
  /// In en, this message translates to:
  /// **'Logging in...'**
  String get loggingIn;

  /// No description provided for @needAccount.
  ///
  /// In en, this message translates to:
  /// **'Need an account? Sign up'**
  String get needAccount;

  /// No description provided for @loginError.
  ///
  /// In en, this message translates to:
  /// **'Login failed -- check your credentials and the backend connection.'**
  String get loginError;

  /// No description provided for @registerError.
  ///
  /// In en, this message translates to:
  /// **'Could not create account -- that email or phone may already be registered.'**
  String get registerError;

  /// No description provided for @quoteOfTheDay.
  ///
  /// In en, this message translates to:
  /// **'Quote of the Day'**
  String get quoteOfTheDay;

  /// No description provided for @dailyQuoteContinue.
  ///
  /// In en, this message translates to:
  /// **'Continue to Gojo Africa'**
  String get dailyQuoteContinue;

  /// No description provided for @language.
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get language;

  /// No description provided for @navExplore.
  ///
  /// In en, this message translates to:
  /// **'More'**
  String get navExplore;

  /// No description provided for @exploreTitle.
  ///
  /// In en, this message translates to:
  /// **'More Services'**
  String get exploreTitle;

  /// No description provided for @moduleNeighborhoodTitle.
  ///
  /// In en, this message translates to:
  /// **'Neighborhood Intelligence'**
  String get moduleNeighborhoodTitle;

  /// No description provided for @moduleNeighborhoodDesc.
  ///
  /// In en, this message translates to:
  /// **'Safety, utilities, internet, transit, schools, cost of living.'**
  String get moduleNeighborhoodDesc;

  /// No description provided for @moduleVerificationTitle.
  ///
  /// In en, this message translates to:
  /// **'Verified Property System'**
  String get moduleVerificationTitle;

  /// No description provided for @moduleVerificationDesc.
  ///
  /// In en, this message translates to:
  /// **'AI + human verification, trust scores, scam detection.'**
  String get moduleVerificationDesc;

  /// No description provided for @moduleHousematesTitle.
  ///
  /// In en, this message translates to:
  /// **'Housemate Matching'**
  String get moduleHousematesTitle;

  /// No description provided for @moduleHousematesDesc.
  ///
  /// In en, this message translates to:
  /// **'Compatibility scoring, messaging, shared budget planning.'**
  String get moduleHousematesDesc;

  /// No description provided for @moduleDiasporaTitle.
  ///
  /// In en, this message translates to:
  /// **'Diaspora Concierge'**
  String get moduleDiasporaTitle;

  /// No description provided for @moduleDiasporaDesc.
  ///
  /// In en, this message translates to:
  /// **'Virtual tours, video inspection, remote signing, international payments.'**
  String get moduleDiasporaDesc;

  /// No description provided for @moduleServicesTitle.
  ///
  /// In en, this message translates to:
  /// **'Home Services Marketplace'**
  String get moduleServicesTitle;

  /// No description provided for @moduleServicesDesc.
  ///
  /// In en, this message translates to:
  /// **'Movers, cleaners, furniture, internet, maintenance, insurance.'**
  String get moduleServicesDesc;

  /// No description provided for @neighborhoodsTitle.
  ///
  /// In en, this message translates to:
  /// **'Neighborhood Intelligence'**
  String get neighborhoodsTitle;

  /// No description provided for @neighborhoodsEmpty.
  ///
  /// In en, this message translates to:
  /// **'No neighborhoods added yet.'**
  String get neighborhoodsEmpty;

  /// No description provided for @neighborhoodSafety.
  ///
  /// In en, this message translates to:
  /// **'Safety'**
  String get neighborhoodSafety;

  /// No description provided for @neighborhoodWater.
  ///
  /// In en, this message translates to:
  /// **'Water reliability'**
  String get neighborhoodWater;

  /// No description provided for @neighborhoodElectricity.
  ///
  /// In en, this message translates to:
  /// **'Electricity reliability'**
  String get neighborhoodElectricity;

  /// No description provided for @neighborhoodInternet.
  ///
  /// In en, this message translates to:
  /// **'Internet quality'**
  String get neighborhoodInternet;

  /// No description provided for @neighborhoodTransport.
  ///
  /// In en, this message translates to:
  /// **'Transportation access'**
  String get neighborhoodTransport;

  /// No description provided for @neighborhoodSchool.
  ///
  /// In en, this message translates to:
  /// **'School proximity'**
  String get neighborhoodSchool;

  /// No description provided for @neighborhoodHospital.
  ///
  /// In en, this message translates to:
  /// **'Hospital proximity'**
  String get neighborhoodHospital;

  /// No description provided for @neighborhoodCostOfLiving.
  ///
  /// In en, this message translates to:
  /// **'Cost of living'**
  String get neighborhoodCostOfLiving;

  /// No description provided for @verificationTitle.
  ///
  /// In en, this message translates to:
  /// **'Verification Queue'**
  String get verificationTitle;

  /// No description provided for @verificationEmpty.
  ///
  /// In en, this message translates to:
  /// **'Nothing pending verification right now.'**
  String get verificationEmpty;

  /// No description provided for @verificationTarget.
  ///
  /// In en, this message translates to:
  /// **'Target'**
  String get verificationTarget;

  /// No description provided for @verificationStage.
  ///
  /// In en, this message translates to:
  /// **'Stage'**
  String get verificationStage;

  /// No description provided for @verificationPending.
  ///
  /// In en, this message translates to:
  /// **'Pending'**
  String get verificationPending;

  /// No description provided for @housematesTitle.
  ///
  /// In en, this message translates to:
  /// **'Housemate Matching'**
  String get housematesTitle;

  /// No description provided for @housematesIntro.
  ///
  /// In en, this message translates to:
  /// **'Tell us your budget and living habits, and we\'ll surface compatible housemates.'**
  String get housematesIntro;

  /// No description provided for @housematesNeedLogin.
  ///
  /// In en, this message translates to:
  /// **'Log in from the Account tab first to set up a housemate profile.'**
  String get housematesNeedLogin;

  /// No description provided for @housematesBudgetMin.
  ///
  /// In en, this message translates to:
  /// **'Minimum budget'**
  String get housematesBudgetMin;

  /// No description provided for @housematesBudgetMax.
  ///
  /// In en, this message translates to:
  /// **'Maximum budget'**
  String get housematesBudgetMax;

  /// No description provided for @housematesLifestyle.
  ///
  /// In en, this message translates to:
  /// **'Lifestyle notes'**
  String get housematesLifestyle;

  /// No description provided for @housematesLifestyleHint.
  ///
  /// In en, this message translates to:
  /// **'e.g. early riser, non-smoker, quiet, no pets'**
  String get housematesLifestyleHint;

  /// No description provided for @housematesSave.
  ///
  /// In en, this message translates to:
  /// **'Save profile'**
  String get housematesSave;

  /// No description provided for @housematesSaving.
  ///
  /// In en, this message translates to:
  /// **'Saving...'**
  String get housematesSaving;

  /// No description provided for @housematesSaved.
  ///
  /// In en, this message translates to:
  /// **'Profile saved.'**
  String get housematesSaved;

  /// No description provided for @housematesFindMatches.
  ///
  /// In en, this message translates to:
  /// **'Find matches'**
  String get housematesFindMatches;

  /// No description provided for @housematesFinding.
  ///
  /// In en, this message translates to:
  /// **'Finding matches...'**
  String get housematesFinding;

  /// No description provided for @housematesMatchesTitle.
  ///
  /// In en, this message translates to:
  /// **'Possible matches'**
  String get housematesMatchesTitle;

  /// No description provided for @housematesNoMatches.
  ///
  /// In en, this message translates to:
  /// **'No matches yet. Check back once more housemate profiles are added.'**
  String get housematesNoMatches;

  /// No description provided for @housematesCompatibility.
  ///
  /// In en, this message translates to:
  /// **'Compatibility {score}%'**
  String housematesCompatibility(String score);

  /// No description provided for @housematesError.
  ///
  /// In en, this message translates to:
  /// **'Could not save your profile. Check the fields and that the backend is running.'**
  String get housematesError;

  /// No description provided for @diasporaTitle.
  ///
  /// In en, this message translates to:
  /// **'Diaspora Concierge'**
  String get diasporaTitle;

  /// No description provided for @diasporaIntro.
  ///
  /// In en, this message translates to:
  /// **'Request a virtual tour, video inspection, or remote signing for a property from anywhere in the world.'**
  String get diasporaIntro;

  /// No description provided for @diasporaNeedLogin.
  ///
  /// In en, this message translates to:
  /// **'Log in from the Account tab first to request concierge services.'**
  String get diasporaNeedLogin;

  /// No description provided for @diasporaPropertyId.
  ///
  /// In en, this message translates to:
  /// **'Property ID'**
  String get diasporaPropertyId;

  /// No description provided for @diasporaPropertyIdHint.
  ///
  /// In en, this message translates to:
  /// **'Paste a property ID from the marketplace'**
  String get diasporaPropertyIdHint;

  /// No description provided for @diasporaVirtualTour.
  ///
  /// In en, this message translates to:
  /// **'Request virtual tour'**
  String get diasporaVirtualTour;

  /// No description provided for @diasporaVideoInspection.
  ///
  /// In en, this message translates to:
  /// **'Request video inspection'**
  String get diasporaVideoInspection;

  /// No description provided for @diasporaRemoteSigning.
  ///
  /// In en, this message translates to:
  /// **'Request remote signing'**
  String get diasporaRemoteSigning;

  /// No description provided for @diasporaRequesting.
  ///
  /// In en, this message translates to:
  /// **'Requesting...'**
  String get diasporaRequesting;

  /// No description provided for @diasporaRequestedTitle.
  ///
  /// In en, this message translates to:
  /// **'Request sent'**
  String get diasporaRequestedTitle;

  /// No description provided for @diasporaRequestedBody.
  ///
  /// In en, this message translates to:
  /// **'Request {id} is now {status}.'**
  String diasporaRequestedBody(String id, String status);

  /// No description provided for @diasporaError.
  ///
  /// In en, this message translates to:
  /// **'Could not submit the request. Check the property ID and that the backend is running.'**
  String get diasporaError;

  /// No description provided for @servicesTitle.
  ///
  /// In en, this message translates to:
  /// **'Home Services Marketplace'**
  String get servicesTitle;

  /// No description provided for @servicesEmpty.
  ///
  /// In en, this message translates to:
  /// **'No service providers listed yet.'**
  String get servicesEmpty;

  /// No description provided for @servicesServiceType.
  ///
  /// In en, this message translates to:
  /// **'Service type'**
  String get servicesServiceType;

  /// No description provided for @serviceTypeMover.
  ///
  /// In en, this message translates to:
  /// **'Mover'**
  String get serviceTypeMover;

  /// No description provided for @serviceTypeCleaner.
  ///
  /// In en, this message translates to:
  /// **'Cleaner'**
  String get serviceTypeCleaner;

  /// No description provided for @serviceTypeFurniture.
  ///
  /// In en, this message translates to:
  /// **'Furniture'**
  String get serviceTypeFurniture;

  /// No description provided for @serviceTypeInternetProvider.
  ///
  /// In en, this message translates to:
  /// **'Internet provider'**
  String get serviceTypeInternetProvider;

  /// No description provided for @serviceTypeMaintenance.
  ///
  /// In en, this message translates to:
  /// **'Maintenance'**
  String get serviceTypeMaintenance;

  /// No description provided for @serviceTypeInsurance.
  ///
  /// In en, this message translates to:
  /// **'Insurance'**
  String get serviceTypeInsurance;

  /// No description provided for @servicesNeedLogin.
  ///
  /// In en, this message translates to:
  /// **'Log in from the Account tab first to book a service.'**
  String get servicesNeedLogin;

  /// No description provided for @servicesProvider.
  ///
  /// In en, this message translates to:
  /// **'Provider'**
  String get servicesProvider;

  /// No description provided for @servicesBook.
  ///
  /// In en, this message translates to:
  /// **'Book'**
  String get servicesBook;

  /// No description provided for @servicesBooking.
  ///
  /// In en, this message translates to:
  /// **'Booking...'**
  String get servicesBooking;

  /// No description provided for @servicesBookedBody.
  ///
  /// In en, this message translates to:
  /// **'Your booking is now {status}.'**
  String servicesBookedBody(String status);

  /// No description provided for @servicesError.
  ///
  /// In en, this message translates to:
  /// **'Could not create the booking. Check the fields and that the backend is running.'**
  String get servicesError;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['am', 'en'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'am':
      return AppLocalizationsAm();
    case 'en':
      return AppLocalizationsEn();
  }

  throw FlutterError(
      'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
      'an issue with the localizations generation tool. Please file an issue '
      'on GitHub with a reproducible sample app and the gen-l10n configuration '
      'that was used.');
}

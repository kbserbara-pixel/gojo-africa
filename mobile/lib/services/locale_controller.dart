import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// App-wide language preference (English / Amharic), persisted with
/// SharedPreferences -- mirrors the simple key-value persistence pattern
/// already used for the auth token in api_client.dart. A ValueNotifier
/// lets the root MaterialApp rebuild with the new `locale` the moment the
/// user switches language, without any routing/navigation changes.
class LocaleController {
  LocaleController._();
  static final LocaleController instance = LocaleController._();

  static const _prefsKey = "gojoafrica_locale";

  final ValueNotifier<Locale> locale = ValueNotifier(const Locale('en'));

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getString(_prefsKey);
    if (saved == 'am' || saved == 'en') {
      locale.value = Locale(saved!);
    }
  }

  Future<void> setLocale(Locale newLocale) async {
    locale.value = newLocale;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_prefsKey, newLocale.languageCode);
  }
}

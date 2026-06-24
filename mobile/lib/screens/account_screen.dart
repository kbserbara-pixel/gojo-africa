import 'package:flutter/material.dart';
import '../services/api_client.dart';
import '../services/locale_controller.dart';
import '../l10n/app_localizations.dart';
import '../widgets/daily_quote_card.dart';

class AccountScreen extends StatefulWidget {
  const AccountScreen({super.key});

  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  bool? _loggedIn;
  Map<String, dynamic>? _user;
  bool _showRegister = false;
  bool _busy = false;
  String? _error;

  // Login fields -- a single field accepts either an email or a phone
  // number; the backend figures out which based on whether it sees an "@".
  final _loginIdentifierController = TextEditingController();
  final _loginPasswordController = TextEditingController();

  // Register fields -- phone and email are both optional, but at least one
  // is required (checked in _register() before the API call). No password
  // complexity is enforced anywhere, by design -- short, simple passwords
  // are fine.
  final _regNameController = TextEditingController();
  final _regPhoneController = TextEditingController();
  final _regEmailController = TextEditingController();
  final _regPasswordController = TextEditingController();
  String _regRole = 'renter';

  @override
  void initState() {
    super.initState();
    _loadSession();
  }

  Future<void> _loadSession() async {
    final token = await ApiClient.getToken();
    if (token == null) {
      setState(() => _loggedIn = false);
      _showDailyQuoteDialog();
      return;
    }
    try {
      final user = await ApiClient.get('/auth/me', auth: true);
      setState(() {
        _loggedIn = true;
        _user = user as Map<String, dynamic>;
      });
    } catch (_) {
      await ApiClient.clearToken();
      setState(() => _loggedIn = false);
      _showDailyQuoteDialog();
    }
  }

  /// Pops the "digital companion" quote up as a centered dialog the moment
  /// we know the user is looking at the login/signup form -- not in
  /// initState directly, since AccountScreen is one of five tabs kept alive
  /// inside an IndexedStack: initState only fires once at app cold-start, not
  /// every time this tab is revisited. Gating on the resolved logged-out
  /// state (here) means it reliably appears whenever someone actually lands
  /// on login/signup, and never pops up over an already-authenticated
  /// profile view.
  void _showDailyQuoteDialog() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final t = AppLocalizations.of(context)!;
      showDialog(
        context: context,
        barrierColor: const Color(0x66064E3B), // translucent emerald-900
        builder: (dialogContext) => Dialog(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          insetPadding: const EdgeInsets.symmetric(horizontal: 24),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                DailyQuoteCard(heading: t.quoteOfTheDay, showContainer: false),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF047857), // emerald-700
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    onPressed: () => Navigator.of(dialogContext).pop(),
                    child: Text(t.dailyQuoteContinue),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    });
  }

  Future<void> _login() async {
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final tokenRes = await ApiClient.post('/auth/login', {
        'identifier': _loginIdentifierController.text.trim(),
        'password': _loginPasswordController.text,
      });
      await ApiClient.saveToken(tokenRes['access_token']);
      await _loadSession();
      // Switch the UI to the account's saved language preference, if set.
      final locale = _user?['locale'];
      if (locale == 'am' || locale == 'en') {
        await LocaleController.instance.setLocale(Locale(locale));
      }
    } catch (e) {
      setState(() => _error = AppLocalizations.of(context)!.loginError);
    } finally {
      setState(() => _busy = false);
    }
  }

  Future<void> _register() async {
    final t = AppLocalizations.of(context)!;
    final phone = _regPhoneController.text.trim();
    final email = _regEmailController.text.trim();
    if (phone.isEmpty && email.isEmpty) {
      setState(() => _error = t.contactRequiredError);
      return;
    }

    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await ApiClient.post('/auth/register', {
        'full_name': _regNameController.text,
        if (phone.isNotEmpty) 'phone': phone,
        if (email.isNotEmpty) 'email': email,
        'password': _regPasswordController.text,
        'role': _regRole,
        // Save the language the user registered in as their preference.
        'locale': LocaleController.instance.locale.value.languageCode,
      });
      // Auto-login right after registration. Use whichever of email/phone
      // was actually provided as the identifier.
      final tokenRes = await ApiClient.post('/auth/login', {
        'identifier': email.isNotEmpty ? email : phone,
        'password': _regPasswordController.text,
      });
      await ApiClient.saveToken(tokenRes['access_token']);
      await _loadSession();
    } catch (e) {
      setState(() => _error = AppLocalizations.of(context)!.registerError);
    } finally {
      setState(() => _busy = false);
    }
  }

  Future<void> _logout() async {
    await ApiClient.clearToken();
    setState(() {
      _loggedIn = false;
      _user = null;
    });
  }

  Widget _buildLanguageSwitcher(AppLocalizations t) {
    return ValueListenableBuilder<Locale>(
      valueListenable: LocaleController.instance.locale,
      builder: (context, locale, _) {
        return Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('${t.language}: '),
            const SizedBox(width: 4),
            SegmentedButton<String>(
              segments: const [
                ButtonSegment(value: 'en', label: Text('English')),
                ButtonSegment(value: 'am', label: Text('አማርኛ')),
              ],
              selected: {locale.languageCode},
              onSelectionChanged: (selection) {
                LocaleController.instance.setLocale(Locale(selection.first));
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    if (_loggedIn == null) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (_loggedIn == true && _user != null) {
      final phone = _user!['phone'] as String?;
      final email = _user!['email'] as String?;
      return Scaffold(
        appBar: AppBar(title: Text(t.accountTitle)),
        body: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(t.greeting(_user!['full_name'] ?? ''), style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: 8),
              if (phone != null && phone.isNotEmpty) Text(t.phoneLine(phone)),
              if (email != null && email.isNotEmpty) Text(t.emailLine(email)),
              Text(t.roleLine(_user!['role'] ?? '')),
              Text(t.trustScoreLine('${_user!['trust_score']}')),
              const SizedBox(height: 16),
              _buildLanguageSwitcher(t),
              const SizedBox(height: 20),
              ElevatedButton(onPressed: _logout, child: Text(t.logout)),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(_showRegister ? t.signUpTitle : t.logInTitle),
        actions: [Padding(padding: const EdgeInsets.only(right: 12), child: Center(child: _buildLanguageSwitcher(t)))],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ..._showRegister
                ? [
                  TextField(
                    controller: _regNameController,
                    decoration: InputDecoration(labelText: t.fullNameLabel, border: const OutlineInputBorder()),
                  ),
                  const SizedBox(height: 12),
                  Text(t.contactHint, style: Theme.of(context).textTheme.bodySmall),
                  const SizedBox(height: 8),
                  TextField(
                    controller: _regPhoneController,
                    keyboardType: TextInputType.phone,
                    decoration: InputDecoration(labelText: t.phoneNumberLabel, border: const OutlineInputBorder()),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _regEmailController,
                    keyboardType: TextInputType.emailAddress,
                    decoration: InputDecoration(labelText: t.emailLabel, border: const OutlineInputBorder()),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _regPasswordController,
                    decoration: InputDecoration(labelText: t.passwordLabel, border: const OutlineInputBorder()),
                    obscureText: true,
                  ),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    value: _regRole,
                    decoration: InputDecoration(labelText: t.iAmALabel, border: const OutlineInputBorder()),
                    items: [
                      DropdownMenuItem(value: 'renter', child: Text(t.roleRenter)),
                      DropdownMenuItem(value: 'landlord', child: Text(t.roleLandlord)),
                      DropdownMenuItem(value: 'agent', child: Text(t.roleAgent)),
                      DropdownMenuItem(value: 'provider', child: Text(t.roleProvider)),
                    ],
                    onChanged: (v) => setState(() => _regRole = v ?? 'renter'),
                  ),
                  const SizedBox(height: 20),
                  if (_error != null) Text(_error!, style: const TextStyle(color: Colors.red)),
                  ElevatedButton(
                    onPressed: _busy ? null : _register,
                    child: Text(_busy ? t.creatingAccount : t.signUp),
                  ),
                  TextButton(
                    onPressed: () => setState(() => _showRegister = false),
                    child: Text(t.alreadyHaveAccount),
                  ),
                ]
              : [
                  TextField(
                    controller: _loginIdentifierController,
                    decoration: InputDecoration(labelText: t.identifierLabel, border: const OutlineInputBorder()),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _loginPasswordController,
                    decoration: InputDecoration(labelText: t.passwordLabel, border: const OutlineInputBorder()),
                    obscureText: true,
                  ),
                  const SizedBox(height: 20),
                  if (_error != null) Text(_error!, style: const TextStyle(color: Colors.red)),
                  ElevatedButton(
                    onPressed: _busy ? null : _login,
                    child: Text(_busy ? t.loggingIn : t.login),
                  ),
                  TextButton(
                    onPressed: () => setState(() => _showRegister = true),
                    child: Text(t.needAccount),
                  ),
                ],
          ],
        ),
      ),
    );
  }
}

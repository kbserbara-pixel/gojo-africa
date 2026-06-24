import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'l10n/app_localizations.dart';
import 'services/locale_controller.dart';
import 'screens/marketplace_screen.dart';
import 'screens/ai_hunter_screen.dart';
import 'screens/post_listing_screen.dart';
import 'screens/explore_screen.dart';
import 'screens/account_screen.dart';

void main() {
  runApp(const GojoAfricaApp());
}

class GojoAfricaApp extends StatefulWidget {
  const GojoAfricaApp({super.key});

  @override
  State<GojoAfricaApp> createState() => _GojoAfricaAppState();
}

class _GojoAfricaAppState extends State<GojoAfricaApp> {
  @override
  void initState() {
    super.initState();
    LocaleController.instance.load();
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<Locale>(
      valueListenable: LocaleController.instance.locale,
      builder: (context, locale, _) {
        return MaterialApp(
          title: 'Gojo Africa',
          theme: ThemeData(primarySwatch: Colors.green, useMaterial3: true),
          locale: locale,
          supportedLocales: AppLocalizations.supportedLocales,
          localizationsDelegates: const [
            ...AppLocalizations.localizationsDelegates,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          home: const RootShell(),
        );
      },
    );
  }
}

class RootShell extends StatefulWidget {
  const RootShell({super.key});

  @override
  State<RootShell> createState() => _RootShellState();
}

class _RootShellState extends State<RootShell> {
  int _index = 0;

  static const _screens = [
    MarketplaceScreen(),
    AiHunterScreen(),
    PostListingScreen(),
    ExploreScreen(),
    AccountScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    return Scaffold(
      body: IndexedStack(index: _index, children: _screens),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (i) => setState(() => _index = i),
        destinations: [
          NavigationDestination(icon: const Icon(Icons.home_outlined), selectedIcon: const Icon(Icons.home), label: t.navMarketplace),
          NavigationDestination(icon: const Icon(Icons.search_outlined), selectedIcon: const Icon(Icons.search), label: t.navAiHunter),
          NavigationDestination(icon: const Icon(Icons.add_box_outlined), selectedIcon: const Icon(Icons.add_box), label: t.navPost),
          NavigationDestination(icon: const Icon(Icons.explore_outlined), selectedIcon: const Icon(Icons.explore), label: t.navExplore),
          NavigationDestination(icon: const Icon(Icons.person_outline), selectedIcon: const Icon(Icons.person), label: t.navAccount),
        ],
      ),
    );
  }
}

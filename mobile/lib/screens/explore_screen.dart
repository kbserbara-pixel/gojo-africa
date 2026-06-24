import 'package:flutter/material.dart';
import '../l10n/app_localizations.dart';
import 'neighborhoods_screen.dart';
import 'verification_screen.dart';
import 'housemates_screen.dart';
import 'diaspora_screen.dart';
import 'services_screen.dart';

class ExploreScreen extends StatelessWidget {
  const ExploreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final modules = <(IconData, String, String, WidgetBuilder)>[
      (Icons.map_outlined, t.moduleNeighborhoodTitle, t.moduleNeighborhoodDesc, (_) => const NeighborhoodsScreen()),
      (Icons.verified_outlined, t.moduleVerificationTitle, t.moduleVerificationDesc, (_) => const VerificationScreen()),
      (Icons.people_outline, t.moduleHousematesTitle, t.moduleHousematesDesc, (_) => const HousematesScreen()),
      (Icons.flight_takeoff_outlined, t.moduleDiasporaTitle, t.moduleDiasporaDesc, (_) => const DiasporaScreen()),
      (Icons.handyman_outlined, t.moduleServicesTitle, t.moduleServicesDesc, (_) => const ServicesScreen()),
    ];

    return Scaffold(
      appBar: AppBar(title: Text(t.exploreTitle)),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: modules.length,
        itemBuilder: (context, index) {
          final (icon, title, desc, builder) = modules[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              contentPadding: const EdgeInsets.all(12),
              leading: CircleAvatar(
                backgroundColor: Colors.green.shade50,
                child: Icon(icon, color: Colors.green.shade700),
              ),
              title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
              subtitle: Text(desc),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: builder)),
            ),
          );
        },
      ),
    );
  }
}

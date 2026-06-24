import 'package:flutter/material.dart';
import '../services/api_client.dart';
import '../l10n/app_localizations.dart';

class MarketplaceScreen extends StatefulWidget {
  const MarketplaceScreen({super.key});

  @override
  State<MarketplaceScreen> createState() => _MarketplaceScreenState();
}

class _MarketplaceScreenState extends State<MarketplaceScreen> {
  List<dynamic> properties = [];
  bool loading = true;
  String? error;

  @override
  void initState() {
    super.initState();
    fetchProperties();
  }

  Future<void> fetchProperties() async {
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final data = await ApiClient.get('/properties');
      setState(() {
        properties = data as List<dynamic>;
        loading = false;
      });
    } catch (e) {
      setState(() {
        error = AppLocalizations.of(context)!.marketplaceBackendError(ApiClient.baseUrl);
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(t.marketplaceTitle)),
      body: RefreshIndicator(
        onRefresh: fetchProperties,
        child: loading
            ? const Center(child: CircularProgressIndicator())
            : error != null
                ? Center(child: Text(error!))
                : properties.isEmpty
                    ? Center(child: Text(t.marketplaceEmpty))
                    : ListView.builder(
                        itemCount: properties.length,
                        itemBuilder: (context, index) {
                          final p = properties[index];
                          return ListTile(
                            title: Text(p['title'] ?? ''),
                            subtitle: Text('${p['price']} ${p['currency']}'),
                            trailing: Text(t.trustLabel(
                                (p['trust_score'] as num?)?.toStringAsFixed(0) ?? '-')),
                          );
                        },
                      ),
      ),
    );
  }
}

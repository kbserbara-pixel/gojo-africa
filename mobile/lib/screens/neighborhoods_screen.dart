import 'package:flutter/material.dart';
import '../services/api_client.dart';
import '../l10n/app_localizations.dart';

class NeighborhoodsScreen extends StatefulWidget {
  const NeighborhoodsScreen({super.key});

  @override
  State<NeighborhoodsScreen> createState() => _NeighborhoodsScreenState();
}

class _NeighborhoodsScreenState extends State<NeighborhoodsScreen> {
  List<Map<String, dynamic>> _neighborhoods = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchNeighborhoods();
  }

  Future<void> _fetchNeighborhoods() async {
    setState(() => _loading = true);
    try {
      final list = await ApiClient.get('/neighborhoods') as List<dynamic>;
      final details = await Future.wait(list.map((n) async {
        try {
          final detail = await ApiClient.get('/neighborhoods/${n['id']}');
          return detail as Map<String, dynamic>;
        } catch (_) {
          return n as Map<String, dynamic>;
        }
      }));
      setState(() {
        _neighborhoods = details;
        _loading = false;
      });
    } catch (_) {
      setState(() {
        _neighborhoods = [];
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(t.neighborhoodsTitle)),
      body: RefreshIndicator(
        onRefresh: _fetchNeighborhoods,
        child: _loading
            ? const Center(child: CircularProgressIndicator())
            : _neighborhoods.isEmpty
                ? Center(child: Text(t.neighborhoodsEmpty))
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _neighborhoods.length,
                    itemBuilder: (context, index) {
                      final n = _neighborhoods[index];
                      final rows = <List<Object?>>[
                        [t.neighborhoodSafety, n['safety_score']],
                        [t.neighborhoodWater, n['water_score']],
                        [t.neighborhoodElectricity, n['electricity_score']],
                        [t.neighborhoodInternet, n['internet_score']],
                        [t.neighborhoodTransport, n['transport_score']],
                        [t.neighborhoodSchool, n['school_proximity_score']],
                        [t.neighborhoodHospital, n['hospital_proximity_score']],
                        [t.neighborhoodCostOfLiving, n['cost_of_living_score']],
                      ];
                      return Card(
                        margin: const EdgeInsets.only(bottom: 12),
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '${n['name'] ?? ''}',
                                style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(height: 8),
                              ...rows.map((r) => Padding(
                                    padding: const EdgeInsets.symmetric(vertical: 2),
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text('${r[0]}', style: const TextStyle(color: Colors.black54)),
                                        Text(r[1] == null ? '—' : '${r[1]}', style: const TextStyle(fontWeight: FontWeight.w600)),
                                      ],
                                    ),
                                  )),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
      ),
    );
  }
}

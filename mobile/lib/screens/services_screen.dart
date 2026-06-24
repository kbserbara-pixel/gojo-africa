import 'package:flutter/material.dart';
import '../services/api_client.dart';
import '../l10n/app_localizations.dart';

const _serviceTypeValues = [
  'mover',
  'cleaner',
  'furniture',
  'internet_provider',
  'maintenance',
  'insurance',
];

class ServicesScreen extends StatefulWidget {
  const ServicesScreen({super.key});

  @override
  State<ServicesScreen> createState() => _ServicesScreenState();
}

class _ServicesScreenState extends State<ServicesScreen> {
  List<dynamic> _providers = [];
  bool _loading = true;

  bool? _loggedIn;
  String? _userId;
  String? _providerId;
  String _serviceType = _serviceTypeValues.first;
  bool _booking = false;
  Map<String, dynamic>? _booked;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchProviders();
    _loadUser();
  }

  Future<void> _fetchProviders() async {
    setState(() => _loading = true);
    try {
      final data = await ApiClient.get('/services/providers') as List<dynamic>;
      setState(() {
        _providers = data;
        _loading = false;
        if (data.isNotEmpty) _providerId = data.first['id'] as String?;
      });
    } catch (_) {
      setState(() {
        _providers = [];
        _loading = false;
      });
    }
  }

  Future<void> _loadUser() async {
    final token = await ApiClient.getToken();
    if (token == null) {
      setState(() => _loggedIn = false);
      return;
    }
    try {
      final user = await ApiClient.get('/auth/me', auth: true);
      setState(() {
        _loggedIn = true;
        _userId = user['id'] as String?;
      });
    } catch (_) {
      setState(() => _loggedIn = false);
    }
  }

  String _serviceTypeLabel(AppLocalizations t, String value) {
    switch (value) {
      case 'mover':
        return t.serviceTypeMover;
      case 'cleaner':
        return t.serviceTypeCleaner;
      case 'furniture':
        return t.serviceTypeFurniture;
      case 'internet_provider':
        return t.serviceTypeInternetProvider;
      case 'maintenance':
        return t.serviceTypeMaintenance;
      case 'insurance':
        return t.serviceTypeInsurance;
      default:
        return value;
    }
  }

  Future<void> _book() async {
    if (_userId == null || _providerId == null) return;
    final t = AppLocalizations.of(context)!;
    setState(() {
      _booking = true;
      _error = null;
      _booked = null;
    });
    try {
      final result = await ApiClient.post('/services/bookings', {
        'user_id': _userId,
        'provider_id': _providerId,
        'service_type': _serviceType,
      });
      setState(() => _booked = result as Map<String, dynamic>);
    } catch (_) {
      setState(() => _error = t.servicesError);
    } finally {
      setState(() => _booking = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(title: Text(t.servicesTitle)),
      body: RefreshIndicator(
        onRefresh: _fetchProviders,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              if (_loading)
                const Center(child: CircularProgressIndicator())
              else if (_providers.isEmpty)
                Text(t.servicesEmpty, style: const TextStyle(color: Colors.black54))
              else
                ..._providers.map((p) => Card(
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        title: Text('${p['full_name'] ?? ''}'),
                        trailing: Text(t.trustLabel('${(p['trust_score'] as num?)?.toStringAsFixed(0) ?? '-'}')),
                      ),
                    )),
              if (_loggedIn == false) ...[
                const SizedBox(height: 16),
                Text(t.servicesNeedLogin, textAlign: TextAlign.center),
              ] else if (_loggedIn == true && _providers.isNotEmpty) ...[
                const SizedBox(height: 16),
                DropdownButtonFormField<String>(
                  value: _providerId,
                  decoration: InputDecoration(labelText: t.servicesProvider, border: const OutlineInputBorder()),
                  items: _providers
                      .map((p) => DropdownMenuItem(
                            value: p['id'] as String,
                            child: Text('${p['full_name'] ?? ''}'),
                          ))
                      .toList(),
                  onChanged: (v) => setState(() => _providerId = v),
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  value: _serviceType,
                  decoration: InputDecoration(labelText: t.servicesServiceType, border: const OutlineInputBorder()),
                  items: _serviceTypeValues
                      .map((v) => DropdownMenuItem(value: v, child: Text(_serviceTypeLabel(t, v))))
                      .toList(),
                  onChanged: (v) => setState(() => _serviceType = v ?? _serviceTypeValues.first),
                ),
                const SizedBox(height: 16),
                if (_error != null) Text(_error!, style: const TextStyle(color: Colors.red)),
                if (_booked != null) Text(t.servicesBookedBody('${_booked!['status'] ?? ''}'), style: const TextStyle(color: Colors.green)),
                const SizedBox(height: 8),
                ElevatedButton(
                  onPressed: _booking ? null : _book,
                  child: Text(_booking ? t.servicesBooking : t.servicesBook),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

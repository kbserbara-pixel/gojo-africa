import 'package:flutter/material.dart';
import '../services/api_client.dart';
import '../l10n/app_localizations.dart';

class DiasporaScreen extends StatefulWidget {
  const DiasporaScreen({super.key});

  @override
  State<DiasporaScreen> createState() => _DiasporaScreenState();
}

class _DiasporaScreenState extends State<DiasporaScreen> {
  final _propertyIdController = TextEditingController();

  bool? _loggedIn;
  String? _userId;
  String? _pendingAction;
  Map<String, dynamic>? _result;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadUser();
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

  Future<void> _request(String action) async {
    final propertyId = _propertyIdController.text.trim();
    if (_userId == null || propertyId.isEmpty) return;
    final t = AppLocalizations.of(context)!;
    setState(() {
      _pendingAction = action;
      _error = null;
      _result = null;
    });
    try {
      final params =
          'property_id=${Uri.encodeComponent(propertyId)}&user_id=${Uri.encodeComponent(_userId!)}';
      final data = await ApiClient.post('/diaspora/$action?$params', {});
      setState(() => _result = data as Map<String, dynamic>);
    } catch (_) {
      setState(() => _error = t.diasporaError);
    } finally {
      setState(() => _pendingAction = null);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    if (_loggedIn == null) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (_loggedIn == false) {
      return Scaffold(
        appBar: AppBar(title: Text(t.diasporaTitle)),
        body: Padding(
          padding: const EdgeInsets.all(16),
          child: Center(child: Text(t.diasporaNeedLogin, textAlign: TextAlign.center)),
        ),
      );
    }

    final propertyId = _propertyIdController.text.trim();
    final actions = <(String, String, String)>[
      ('virtual-tour', t.diasporaVirtualTour, 'virtual-tour'),
      ('video-inspection', t.diasporaVideoInspection, 'video-inspection'),
      ('sign', t.diasporaRemoteSigning, 'sign'),
    ];

    return Scaffold(
      appBar: AppBar(title: Text(t.diasporaTitle)),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(t.diasporaIntro, style: const TextStyle(color: Colors.black54)),
            const SizedBox(height: 16),
            TextField(
              controller: _propertyIdController,
              decoration: InputDecoration(
                labelText: t.diasporaPropertyId,
                hintText: t.diasporaPropertyIdHint,
                border: const OutlineInputBorder(),
              ),
              onChanged: (_) => setState(() {}),
            ),
            const SizedBox(height: 16),
            for (final action in actions) ...[
              ElevatedButton(
                onPressed: (propertyId.isEmpty || _pendingAction != null)
                    ? null
                    : () => _request(action.$1),
                child: Text(_pendingAction == action.$1 ? t.diasporaRequesting : action.$2),
              ),
              const SizedBox(height: 8),
            ],
            if (_error != null) Padding(
              padding: const EdgeInsets.only(top: 8),
              child: Text(_error!, style: const TextStyle(color: Colors.red)),
            ),
            if (_result != null)
              Card(
                margin: const EdgeInsets.only(top: 8),
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(t.diasporaRequestedTitle, style: const TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 4),
                      Text(t.diasporaRequestedBody(
                        '${_result!['booking_id'] ?? _result!['id'] ?? ''}',
                        '${_result!['status'] ?? ''}',
                      )),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

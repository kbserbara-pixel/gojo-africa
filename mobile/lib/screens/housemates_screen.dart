import 'package:flutter/material.dart';
import '../services/api_client.dart';
import '../l10n/app_localizations.dart';

class HousematesScreen extends StatefulWidget {
  const HousematesScreen({super.key});

  @override
  State<HousematesScreen> createState() => _HousematesScreenState();
}

class _HousematesScreenState extends State<HousematesScreen> {
  final _formKey = GlobalKey<FormState>();
  final _budgetMinController = TextEditingController();
  final _budgetMaxController = TextEditingController();
  final _lifestyleController = TextEditingController();

  bool? _loggedIn;
  String? _userId;
  bool _saving = false;
  bool _saved = false;
  String? _error;

  bool _finding = false;
  List<dynamic>? _matches;

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

  Future<void> _save() async {
    if (!(_formKey.currentState?.validate() ?? false) || _userId == null) return;
    final t = AppLocalizations.of(context)!;
    setState(() {
      _saving = true;
      _error = null;
      _saved = false;
    });
    try {
      await ApiClient.post('/housemates/profile', {
        'user_id': _userId,
        'budget_min': double.tryParse(_budgetMinController.text) ?? 0,
        'budget_max': double.tryParse(_budgetMaxController.text) ?? 0,
        'lifestyle': {'notes': _lifestyleController.text},
      });
      setState(() => _saved = true);
    } catch (_) {
      setState(() => _error = t.housematesError);
    } finally {
      setState(() => _saving = false);
    }
  }

  Future<void> _findMatches() async {
    if (_userId == null) return;
    setState(() {
      _finding = true;
      _matches = null;
    });
    try {
      final data = await ApiClient.get('/housemates/matches/$_userId');
      setState(() => _matches = (data['matches'] as List<dynamic>?) ?? []);
    } catch (_) {
      setState(() => _matches = []);
    } finally {
      setState(() => _finding = false);
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
        appBar: AppBar(title: Text(t.housematesTitle)),
        body: Padding(
          padding: const EdgeInsets.all(16),
          child: Center(child: Text(t.housematesNeedLogin, textAlign: TextAlign.center)),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text(t.housematesTitle)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(t.housematesIntro, style: const TextStyle(color: Colors.black54)),
            const SizedBox(height: 16),
            Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: TextFormField(
                          controller: _budgetMinController,
                          decoration: InputDecoration(labelText: t.housematesBudgetMin, border: const OutlineInputBorder()),
                          keyboardType: TextInputType.number,
                          validator: (v) => (v == null || v.isEmpty) ? t.requiredError : null,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: TextFormField(
                          controller: _budgetMaxController,
                          decoration: InputDecoration(labelText: t.housematesBudgetMax, border: const OutlineInputBorder()),
                          keyboardType: TextInputType.number,
                          validator: (v) => (v == null || v.isEmpty) ? t.requiredError : null,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _lifestyleController,
                    decoration: InputDecoration(
                      labelText: t.housematesLifestyle,
                      hintText: t.housematesLifestyleHint,
                      border: const OutlineInputBorder(),
                    ),
                    maxLines: 3,
                  ),
                  const SizedBox(height: 16),
                  if (_error != null) Text(_error!, style: const TextStyle(color: Colors.red)),
                  if (_saved) Text(t.housematesSaved, style: const TextStyle(color: Colors.green)),
                  const SizedBox(height: 8),
                  ElevatedButton(
                    onPressed: _saving ? null : _save,
                    child: Text(_saving ? t.housematesSaving : t.housematesSave),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            OutlinedButton(
              onPressed: _finding ? null : _findMatches,
              child: Text(_finding ? t.housematesFinding : t.housematesFindMatches),
            ),
            if (_matches != null) ...[
              const SizedBox(height: 20),
              Text(t.housematesMatchesTitle, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              if (_matches!.isEmpty)
                Text(t.housematesNoMatches, style: const TextStyle(color: Colors.black54))
              else
                ..._matches!.map((m) => Card(
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        title: Text('${m['user_id']}'),
                        trailing: Chip(
                          label: Text(t.housematesCompatibility(
                              '${(m['compatibility_score'] as num?)?.round() ?? 0}')),
                          backgroundColor: Colors.green.shade50,
                          labelStyle: TextStyle(color: Colors.green.shade800, fontWeight: FontWeight.w600),
                        ),
                      ),
                    )),
            ],
          ],
        ),
      ),
    );
  }
}

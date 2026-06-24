import 'package:flutter/material.dart';
import '../services/api_client.dart';
import '../l10n/app_localizations.dart';

class AiHunterScreen extends StatefulWidget {
  const AiHunterScreen({super.key});

  @override
  State<AiHunterScreen> createState() => _AiHunterScreenState();
}

class _AiHunterScreenState extends State<AiHunterScreen> {
  final TextEditingController _controller = TextEditingController();
  List<dynamic> results = [];
  bool loading = false;
  String? error;

  Future<void> search() async {
    final query = _controller.text.trim();
    if (query.isEmpty) return;
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final data = await ApiClient.post('/ai/search', {'query': query});
      setState(() {
        results = (data['results'] as List<dynamic>?) ?? [];
        loading = false;
      });
    } catch (e) {
      setState(() {
        error = AppLocalizations.of(context)!.aiHunterError;
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(t.aiHunterTitle)),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _controller,
              decoration: InputDecoration(
                border: const OutlineInputBorder(),
                hintText: t.aiHunterHint,
              ),
              onSubmitted: (_) => search(),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: loading ? null : search,
              child: Text(loading ? t.aiHunterSearching : t.aiHunterSearch),
            ),
            const SizedBox(height: 16),
            if (error != null) Text(error!, style: const TextStyle(color: Colors.red)),
            Expanded(
              child: ListView.builder(
                itemCount: results.length,
                itemBuilder: (context, index) {
                  final r = results[index];
                  return Card(
                    child: ListTile(
                      title: Text(r['title'] ?? ''),
                      subtitle: Text(r['explanation'] ?? ''),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

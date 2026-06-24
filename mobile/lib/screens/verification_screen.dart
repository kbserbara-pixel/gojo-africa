import 'package:flutter/material.dart';
import '../services/api_client.dart';
import '../l10n/app_localizations.dart';

class VerificationScreen extends StatefulWidget {
  const VerificationScreen({super.key});

  @override
  State<VerificationScreen> createState() => _VerificationScreenState();
}

class _VerificationScreenState extends State<VerificationScreen> {
  List<dynamic> _queue = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchQueue();
  }

  Future<void> _fetchQueue() async {
    setState(() => _loading = true);
    try {
      final data = await ApiClient.get('/verification/queue');
      setState(() {
        _queue = data as List<dynamic>;
        _loading = false;
      });
    } catch (_) {
      setState(() {
        _queue = [];
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(t.verificationTitle)),
      body: RefreshIndicator(
        onRefresh: _fetchQueue,
        child: _loading
            ? const Center(child: CircularProgressIndicator())
            : _queue.isEmpty
                ? Center(child: Text(t.verificationEmpty))
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _queue.length,
                    itemBuilder: (context, index) {
                      final item = _queue[index];
                      return Card(
                        margin: const EdgeInsets.only(bottom: 12),
                        child: ListTile(
                          title: Text('${t.verificationTarget}: ${item['target_type']} · ${item['target_id']}'),
                          subtitle: Text('${t.verificationStage}: ${item['stage']}'),
                          trailing: Chip(
                            label: Text(t.verificationPending),
                            backgroundColor: Colors.amber.shade100,
                            labelStyle: TextStyle(color: Colors.amber.shade900, fontWeight: FontWeight.w600),
                          ),
                        ),
                      );
                    },
                  ),
      ),
    );
  }
}

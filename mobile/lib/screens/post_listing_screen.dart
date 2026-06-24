import 'package:flutter/material.dart';
import '../services/api_client.dart';
import '../l10n/app_localizations.dart';

class PostListingScreen extends StatefulWidget {
  const PostListingScreen({super.key});

  @override
  State<PostListingScreen> createState() => _PostListingScreenState();
}

class _PostListingScreenState extends State<PostListingScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _priceController = TextEditingController();
  final _bedroomsController = TextEditingController();
  final _bathroomsController = TextEditingController();
  final _addressController = TextEditingController();

  String _listingType = 'rental';
  String _currency = 'ETB';
  bool _submitting = false;
  String? _statusMessage;
  bool? _loggedIn;

  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    final token = await ApiClient.getToken();
    setState(() => _loggedIn = token != null);
  }

  Future<void> _submit() async {
    if (!(_formKey.currentState?.validate() ?? false)) return;
    final t = AppLocalizations.of(context)!;
    setState(() {
      _submitting = true;
      _statusMessage = null;
    });
    try {
      final payload = {
        'listing_type': _listingType,
        'title': _titleController.text,
        'description': _descriptionController.text.isEmpty ? null : _descriptionController.text,
        'price': double.tryParse(_priceController.text) ?? 0,
        'currency': _currency,
        'bedrooms': int.tryParse(_bedroomsController.text),
        'bathrooms': int.tryParse(_bathroomsController.text),
        'address': _addressController.text.isEmpty ? null : _addressController.text,
      };
      await ApiClient.post('/properties', payload, auth: true);
      setState(() => _statusMessage = t.listingSubmitted);
      _formKey.currentState?.reset();
      _titleController.clear();
      _descriptionController.clear();
      _priceController.clear();
      _bedroomsController.clear();
      _bathroomsController.clear();
      _addressController.clear();
    } catch (e) {
      setState(() => _statusMessage = t.listingSubmitError);
    } finally {
      setState(() => _submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final listingTypes = [
      {'value': 'rental', 'label': t.listingTypeRental},
      {'value': 'sale', 'label': t.listingTypeSale},
      {'value': 'commercial', 'label': t.listingTypeCommercial},
      {'value': 'student_housing', 'label': t.listingTypeStudentHousing},
      {'value': 'shared_accommodation', 'label': t.listingTypeSharedAccommodation},
    ];

    if (_loggedIn == null) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (_loggedIn == false) {
      return Scaffold(
        appBar: AppBar(title: Text(t.postListingTitle)),
        body: Padding(
          padding: const EdgeInsets.all(16),
          child: Center(
            child: Text(
              t.postListingNeedLogin,
              textAlign: TextAlign.center,
            ),
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text(t.postListingTitle)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              DropdownButtonFormField<String>(
                value: _listingType,
                decoration: InputDecoration(labelText: t.listingTypeLabel, border: const OutlineInputBorder()),
                items: listingTypes
                    .map((lt) => DropdownMenuItem(value: lt['value'], child: Text(lt['label']!)))
                    .toList(),
                onChanged: (v) => setState(() => _listingType = v ?? 'rental'),
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _titleController,
                decoration: InputDecoration(labelText: t.titleLabel, border: const OutlineInputBorder()),
                validator: (v) => (v == null || v.isEmpty) ? t.requiredError : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _descriptionController,
                decoration: InputDecoration(labelText: t.descriptionLabel, border: const OutlineInputBorder()),
                maxLines: 3,
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _priceController,
                      decoration: InputDecoration(labelText: t.priceLabel, border: const OutlineInputBorder()),
                      keyboardType: TextInputType.number,
                      validator: (v) => (v == null || v.isEmpty) ? t.requiredError : null,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: DropdownButtonFormField<String>(
                      value: _currency,
                      decoration: InputDecoration(labelText: t.currencyLabel, border: const OutlineInputBorder()),
                      items: const [
                        DropdownMenuItem(value: 'ETB', child: Text('ETB')),
                        DropdownMenuItem(value: 'USD', child: Text('USD')),
                      ],
                      onChanged: (v) => setState(() => _currency = v ?? 'ETB'),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _bedroomsController,
                      decoration: InputDecoration(labelText: t.bedroomsLabel, border: const OutlineInputBorder()),
                      keyboardType: TextInputType.number,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: TextFormField(
                      controller: _bathroomsController,
                      decoration: InputDecoration(labelText: t.bathroomsLabel, border: const OutlineInputBorder()),
                      keyboardType: TextInputType.number,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _addressController,
                decoration: InputDecoration(labelText: t.addressLabel, border: const OutlineInputBorder()),
              ),
              const SizedBox(height: 20),
              if (_statusMessage != null) Text(_statusMessage!),
              const SizedBox(height: 8),
              ElevatedButton(
                onPressed: _submitting ? null : _submit,
                child: Text(_submitting ? t.submitting : t.submit),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:provider/provider.dart';

import '../models/airdrop.dart';
import '../providers/language_provider.dart';
import 'package:airdropapp/l10n/app_localizations.dart';

class AirdropDetailsScreen extends StatelessWidget {
  final Airdrop airdrop;

  const AirdropDetailsScreen({super.key, required this.airdrop});

  @override
  Widget build(BuildContext context) {
    final languageProvider = Provider.of<LanguageProvider>(context);
    final locale = languageProvider.currentLocale.languageCode;
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: Text(airdrop.getName(locale)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: CachedNetworkImage(
                imageUrl: airdrop.logo,
                width: 100,
                height: 100,
                placeholder: (context, url) => const CircularProgressIndicator(),
                errorWidget: (context, url, error) => const Icon(Icons.error, size: 50),
              ),
            ),
            const SizedBox(height: 16),
            _buildInfoRow(l10n.value, airdrop.value),
            _buildInfoRow(l10n.statusActive, airdrop.status), // Using statusActive as label for Status
            _buildInfoRow('Type', airdrop.type),
            const SizedBox(height: 16),
            Text(
              'Description',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 8),
            Text(
              airdrop.getDescription(locale),
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 24),
            // Add buttons for external links if available (assuming they might be added to model later or just generic placeholder)
            // For now, just a placeholder button
            Center(
              child: ElevatedButton(
                onPressed: () {
                  // Implement claim action or open website
                },
                child: const Text('Go to Airdrop'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          Text(value),
        ],
      ),
    );
  }
}

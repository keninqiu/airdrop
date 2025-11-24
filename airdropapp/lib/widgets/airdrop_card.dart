import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:provider/provider.dart';
import '../models/airdrop.dart';
import '../providers/language_provider.dart';
import 'package:airdropapp/l10n/app_localizations.dart';

import '../screens/airdrop_details_screen.dart';

class AirdropCard extends StatelessWidget {
  final Airdrop airdrop;

  const AirdropCard({super.key, required this.airdrop});

  @override
  Widget build(BuildContext context) {
    final languageProvider = Provider.of<LanguageProvider>(context);
    final locale = languageProvider.currentLocale.languageCode;
    final l10n = AppLocalizations.of(context)!;

    return Card(
      margin: const EdgeInsets.all(8.0),
      child: ListTile(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AirdropDetailsScreen(airdrop: airdrop),
            ),
          );
        },
        leading: CachedNetworkImage(
          imageUrl: airdrop.logo,
          width: 50,
          height: 50,
          placeholder: (context, url) => const CircularProgressIndicator(),
          errorWidget: (context, url, error) => const Icon(Icons.error),
        ),
        title: Text(airdrop.getName(locale)),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(airdrop.getDescription(locale), maxLines: 2, overflow: TextOverflow.ellipsis),
            const SizedBox(height: 4),
            Row(
              children: [
                Chip(label: Text(airdrop.status), backgroundColor: _getStatusColor(airdrop.status)),
                const SizedBox(width: 8),
                Text('${l10n.value}: ${airdrop.value}'),
              ],
            ),
          ],
        ),
        isThreeLine: true,
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'active':
        return Colors.green.shade100;
      case 'upcoming':
        return Colors.blue.shade100;
      case 'ended':
        return Colors.red.shade100;
      default:
        return Colors.grey.shade100;
    }
  }
}

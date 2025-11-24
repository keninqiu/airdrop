class Airdrop {
  final int id;
  final String logo;
  final String value;
  final String status;
  final String type;
  final List<AirdropTranslation> translations;

  Airdrop({
    required this.id,
    required this.logo,
    required this.value,
    required this.status,
    required this.type,
    required this.translations,
  });

  factory Airdrop.fromJson(Map<String, dynamic> json) {
    return Airdrop(
      id: json['id'],
      logo: json['logo'] ?? '',
      value: json['value'] ?? '',
      status: json['status'] ?? '',
      type: json['type'] ?? '',
      translations: (json['translations'] as List<dynamic>?)
              ?.map((e) => AirdropTranslation.fromJson(e))
              .toList() ??
          [],
    );
  }

  String getName(String locale) {
    final translation = translations.firstWhere(
      (t) => t.locale == locale,
      orElse: () => translations.firstWhere(
        (t) => t.locale == 'en',
        orElse: () => translations.isNotEmpty
            ? translations.first
            : AirdropTranslation(locale: '', name: 'Unknown', description: ''),
      ),
    );
    return translation.name;
  }

  String getDescription(String locale) {
    final translation = translations.firstWhere(
      (t) => t.locale == locale,
      orElse: () => translations.firstWhere(
        (t) => t.locale == 'en',
        orElse: () => translations.isNotEmpty
            ? translations.first
            : AirdropTranslation(locale: '', name: '', description: ''),
      ),
    );
    return translation.description;
  }
}

class AirdropTranslation {
  final String locale;
  final String name;
  final String description;

  AirdropTranslation({
    required this.locale,
    required this.name,
    required this.description,
  });

  factory AirdropTranslation.fromJson(Map<String, dynamic> json) {
    return AirdropTranslation(
      locale: json['locale'] ?? '',
      name: json['name'] ?? '',
      description: json['description'] ?? '',
    );
  }
}

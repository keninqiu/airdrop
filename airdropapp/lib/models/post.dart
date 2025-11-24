class Post {
  final int id;
  final String image;
  final String link;
  final DateTime createdAt;
  final List<PostTranslation> translations;

  Post({
    required this.id,
    required this.image,
    required this.link,
    required this.createdAt,
    required this.translations,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'],
      image: json['image'] ?? '',
      link: json['link'] ?? '',
      createdAt: DateTime.tryParse(json['createdAt'] ?? '') ?? DateTime.now(),
      translations: (json['translations'] as List<dynamic>?)
              ?.map((e) => PostTranslation.fromJson(e))
              .toList() ??
          [],
    );
  }

  String getTitle(String locale) {
    final translation = translations.firstWhere(
      (t) => t.locale == locale,
      orElse: () => translations.firstWhere(
        (t) => t.locale == 'en',
        orElse: () => translations.isNotEmpty
            ? translations.first
            : PostTranslation(locale: '', title: 'Untitled', description: ''),
      ),
    );
    return translation.title;
  }

  String getDescription(String locale) {
    final translation = translations.firstWhere(
      (t) => t.locale == locale,
      orElse: () => translations.firstWhere(
        (t) => t.locale == 'en',
        orElse: () => translations.isNotEmpty
            ? translations.first
            : PostTranslation(locale: '', title: '', description: ''),
      ),
    );
    return translation.description;
  }
}

class PostTranslation {
  final String locale;
  final String title;
  final String description;

  PostTranslation({
    required this.locale,
    required this.title,
    required this.description,
  });

  factory PostTranslation.fromJson(Map<String, dynamic> json) {
    return PostTranslation(
      locale: json['locale'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
    );
  }
}

// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Japanese (`ja`).
class AppLocalizationsJa extends AppLocalizations {
  AppLocalizationsJa([String locale = 'ja']) : super(locale);

  @override
  String get appTitle => 'エアドロップアプリ';

  @override
  String get airdrops => 'エアドロップ';

  @override
  String get posts => '投稿';

  @override
  String get settings => '設定';

  @override
  String get language => '言語';

  @override
  String get loading => '読み込み中...';

  @override
  String get error => 'データの読み込みエラー';

  @override
  String get statusActive => 'アクティブ';

  @override
  String get statusUpcoming => '近日公開';

  @override
  String get statusEnded => '終了';

  @override
  String get value => '価値';

  @override
  String get platform => 'プラットフォーム';
}

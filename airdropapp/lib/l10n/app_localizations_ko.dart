// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Korean (`ko`).
class AppLocalizationsKo extends AppLocalizations {
  AppLocalizationsKo([String locale = 'ko']) : super(locale);

  @override
  String get appTitle => '에어드랍 앱';

  @override
  String get airdrops => '에어드랍';

  @override
  String get posts => '게시물';

  @override
  String get settings => '설정';

  @override
  String get language => '언어';

  @override
  String get loading => '로딩 중...';

  @override
  String get error => '데이터 로드 오류';

  @override
  String get statusActive => '진행 중';

  @override
  String get statusUpcoming => '예정';

  @override
  String get statusEnded => '종료됨';

  @override
  String get value => '가치';

  @override
  String get platform => '플랫폼';
}

// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Chinese (`zh`).
class AppLocalizationsZh extends AppLocalizations {
  AppLocalizationsZh([String locale = 'zh']) : super(locale);

  @override
  String get appTitle => '空投应用';

  @override
  String get airdrops => '空投';

  @override
  String get posts => '文章';

  @override
  String get settings => '设置';

  @override
  String get language => '语言';

  @override
  String get loading => '加载中...';

  @override
  String get error => '加载数据出错';

  @override
  String get statusActive => '进行中';

  @override
  String get statusUpcoming => '即将开始';

  @override
  String get statusEnded => '已结束';

  @override
  String get value => '价值';

  @override
  String get platform => '平台';
}

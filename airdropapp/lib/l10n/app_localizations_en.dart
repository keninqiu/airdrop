// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appTitle => 'Airdrop App';

  @override
  String get airdrops => 'Airdrops';

  @override
  String get posts => 'Posts';

  @override
  String get settings => 'Settings';

  @override
  String get language => 'Language';

  @override
  String get loading => 'Loading...';

  @override
  String get error => 'Error loading data';

  @override
  String get statusActive => 'Active';

  @override
  String get statusUpcoming => 'Upcoming';

  @override
  String get statusEnded => 'Ended';

  @override
  String get value => 'Value';

  @override
  String get platform => 'Platform';
}

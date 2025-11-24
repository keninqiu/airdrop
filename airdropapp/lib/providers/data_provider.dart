import 'package:flutter/material.dart';
import '../models/airdrop.dart';
import '../models/post.dart';
import '../services/api_service.dart';

class DataProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  
  List<Airdrop> _airdrops = [];
  List<Post> _posts = [];
  bool _isLoading = false;
  String? _error;

  List<Airdrop> get airdrops => _airdrops;
  List<Post> get posts => _posts;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchData() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final results = await Future.wait([
        _apiService.getAirdrops(),
        _apiService.getPosts(),
      ]);

      _airdrops = results[0] as List<Airdrop>;
      _posts = results[1] as List<Post>;
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}

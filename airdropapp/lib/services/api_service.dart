import 'package:flutter/foundation.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/airdrop.dart';
import '../models/post.dart';

class ApiService {
  // Replace with your actual API URL. 
  // For Android Emulator use 10.0.2.2, for iOS Simulator use localhost
  static const String hostUrl = 'http://10.0.2.2:3000';
  static const String baseUrl = '$hostUrl/api';

  Future<List<Airdrop>> getAirdrops() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/airdrops'));
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) {
          json['logo'] = _fixImageUrl(json['logo']);
          return Airdrop.fromJson(json);
        }).toList();
      } else {
        debugPrint('Failed to load airdrops: ${response.statusCode}');
        return [];
      }
    } catch (e) {
      debugPrint('Error fetching airdrops: $e');
      return [];
    }
  }

  Future<Airdrop?> getAirdrop(int id) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/airdrops/$id'));
      if (response.statusCode == 200) {
        final jsonMap = json.decode(response.body);
        jsonMap['logo'] = _fixImageUrl(jsonMap['logo']);
        return Airdrop.fromJson(jsonMap);
      } else {
        debugPrint('Failed to load airdrop $id: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      debugPrint('Error fetching airdrop $id: $e');
      return null;
    }
  }

  Future<List<Post>> getPosts() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/posts'));
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) {
          json['image'] = _fixImageUrl(json['image']);
          return Post.fromJson(json);
        }).toList();
      } else {
        debugPrint('Failed to load posts: ${response.statusCode}');
        return [];
      }
    } catch (e) {
      debugPrint('Error fetching posts: $e');
      return [];
    }
  }

  Future<Post?> getPost(int id) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/posts/$id'));
      if (response.statusCode == 200) {
        final jsonMap = json.decode(response.body);
        jsonMap['image'] = _fixImageUrl(jsonMap['image']);
        return Post.fromJson(jsonMap);
      } else {
        debugPrint('Failed to load post $id: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      debugPrint('Error fetching post $id: $e');
      return null;
    }
  }

  String _fixImageUrl(String? url) {
    if (url == null || url.isEmpty) return '';
    if (url.startsWith('/')) {
      return '$hostUrl$url';
    }
    return url;
  }


}

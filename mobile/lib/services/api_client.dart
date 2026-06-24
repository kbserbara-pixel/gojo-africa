import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

/// Thin REST client for the Gojo Africa FastAPI backend. Persists the JWT
/// in SharedPreferences so a logged-in session survives app restarts.
class ApiClient {
  static const String baseUrl = "http://localhost:8000";
  static const String _tokenKey = "gojoafrica_token";

  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  static Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  static Future<void> clearToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
  }

  static Future<dynamic> get(String path, {bool auth = false}) async {
    final headers = <String, String>{};
    if (auth) {
      final token = await getToken();
      if (token != null) headers['Authorization'] = 'Bearer $token';
    }
    final res = await http.get(Uri.parse('$baseUrl$path'), headers: headers);
    return _handle(res);
  }

  static Future<dynamic> post(String path, Map<String, dynamic> body, {bool auth = false}) async {
    final headers = <String, String>{'Content-Type': 'application/json'};
    if (auth) {
      final token = await getToken();
      if (token != null) headers['Authorization'] = 'Bearer $token';
    }
    final res = await http.post(Uri.parse('$baseUrl$path'), headers: headers, body: jsonEncode(body));
    return _handle(res);
  }

  static dynamic _handle(http.Response res) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty) return null;
      return jsonDecode(res.body);
    }
    String detail = res.body;
    try {
      final parsed = jsonDecode(res.body);
      if (parsed is Map && parsed['detail'] != null) detail = parsed['detail'].toString();
    } catch (_) {
      // leave detail as the raw body
    }
    throw Exception('API error ${res.statusCode}: $detail');
  }
}

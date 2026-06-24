import 'package:flutter/material.dart';
import '../data/daily_quotes.dart';

/// Minimalist "digital companion" card for the login/signup screen: one
/// curated quote per day, the same for every user, shown in English and
/// Amharic together -- mirrors the web app's bilingual hero/quote treatment,
/// using the same emerald + gold accent palette.
class DailyQuoteCard extends StatelessWidget {
  final String heading;

  /// When true (default), renders its own bordered/tinted card shell --
  /// the original standalone look. When false, renders just the gold-accent
  /// bar + text, with no outer background/border, so it can be embedded
  /// inside something that already provides its own card chrome (e.g. the
  /// pop-out dialog in account_screen.dart).
  final bool showContainer;

  const DailyQuoteCard({super.key, required this.heading, this.showContainer = true});

  @override
  Widget build(BuildContext context) {
    final quote = getQuoteOfTheDay();

    final content = Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 4,
          margin: const EdgeInsets.only(right: 12, top: 2, bottom: 2),
          decoration: BoxDecoration(
            color: const Color(0xFFE8B84B), // gold-400, matches web accent
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                heading.toUpperCase(),
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 0.6,
                  color: Color(0xFFB8842A), // gold-600
                ),
              ),
              const SizedBox(height: 6),
              Text(
                '"${quote.en}"',
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w500,
                  height: 1.4,
                  color: Color(0xFF064E3B), // emerald-900
                ),
              ),
              const SizedBox(height: 6),
              Text(
                quote.am,
                style: const TextStyle(
                  fontSize: 13,
                  fontStyle: FontStyle.italic,
                  height: 1.3,
                  color: Color(0xFF047857), // emerald-700
                ),
              ),
            ],
          ),
        ),
      ],
    );

    if (!showContainer) return content;

    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.7),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFD1FAE5)), // emerald-100
      ),
      child: content,
    );
  }
}

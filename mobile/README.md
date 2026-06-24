# Gojo Africa Mobile (Flutter)

Flutter app with four tabs wired to the FastAPI backend:

- **Marketplace** -- browse active listings.
- **AI Hunter** -- conversational search against `/ai/search`.
- **Post** -- create a listing (requires login).
- **Account** -- log in, sign up, and view your profile/trust score.

Run:

```bash
flutter pub get
flutter run
```

Set the API base URL in `lib/services/api_client.dart` (`ApiClient.baseUrl`)
to your backend host -- `http://localhost:8000` won't resolve from a physical
device or some emulators; use your machine's LAN IP or `10.0.2.2` for the
Android emulator.

This covers the core flows (auth, search, listing creation). Neighborhood
Intelligence, Housemate Matching, Diaspora Concierge, Home Services, and
Analytics still need dedicated screens -- see
NestAfrica_Technical_Architecture.md for the module breakdown; the
corresponding backend endpoints already exist under `backend/app/routers/`.

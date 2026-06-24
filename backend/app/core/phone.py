"""
Lightweight phone number normalization for login/registration.

Gojo Africa lets people sign up and log in with either an email address or
a phone number -- no SMS/OTP verification step. For phone numbers to match
reliably regardless of how someone types them ("0911223344", "+251 91 122
3344", "011 911223344", a diaspora user's US/UK number, etc.), every phone
number is normalized to E.164 (e.g. "+251911223344") before it's stored or
looked up. Default region is Ethiopia since that's the home market, but any
explicit country code (e.g. "+1...", "+44...") is respected as typed.
"""
import phonenumbers

DEFAULT_REGION = "ET"


def normalize_phone(raw: str, default_region: str = DEFAULT_REGION) -> str:
    raw = raw.strip()
    if not raw:
        return raw
    try:
        parsed = phonenumbers.parse(raw, default_region)
        if phonenumbers.is_valid_number(parsed):
            return phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)
    except phonenumbers.NumberParseException:
        pass
    # Couldn't confidently parse it (e.g. a malformed or unusual number) --
    # fall back to a lightly cleaned version rather than rejecting sign-up
    # outright. This keeps the "no verification needed" requirement intact.
    return raw.replace(" ", "")

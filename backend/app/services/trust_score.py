"""
Trust score and compatibility scoring.

See NestAfrica_Technical_Architecture.md, Section 6, for the full
verification pipeline this feeds into.
"""


def compute_property_trust_score(prop) -> float:
    score = 40.0  # baseline for a newly submitted, unverified listing
    if getattr(prop, "description", None) and len(prop.description) > 50:
        score += 10
    if getattr(prop, "price", 0) > 0:
        score += 10
    return min(score, 100.0)


def compute_user_trust_score(user) -> float:
    score = 30.0
    if user.verification_status == "verified":
        score += 50
    if user.email:
        score += 10
    return min(score, 100.0)


def compute_compatibility_score(profile_a, profile_b) -> float:
    """Simple overlap-based compatibility score across lifestyle attributes."""
    if not profile_a.lifestyle or not profile_b.lifestyle:
        return 50.0

    keys = ["schedule", "cleanliness", "noise_tolerance", "smoking", "pets"]
    matches = sum(
        1 for k in keys if profile_a.lifestyle.get(k) == profile_b.lifestyle.get(k)
    )
    budget_overlap = not (profile_a.budget_max < profile_b.budget_min or profile_b.budget_max < profile_a.budget_min)

    score = (matches / len(keys)) * 80
    if budget_overlap:
        score += 20
    return round(min(score, 100.0), 2)

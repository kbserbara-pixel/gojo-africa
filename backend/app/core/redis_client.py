import redis
from app.core.config import settings

try:
    redis_client = redis.from_url(settings.redis_url, decode_responses=True)
    redis_client.ping()
except Exception:
    # Redis is optional for local dev; fall back to a no-op stub so the
    # app still boots without a running Redis instance.
    class _NoOpRedis:
        def get(self, *a, **k):
            return None

        def set(self, *a, **k):
            return None

        def setex(self, *a, **k):
            return None

    redis_client = _NoOpRedis()

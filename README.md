# URL Shortener Backend

## Redis cache

Redirect reads use Redis as an optional read-through cache.

Add these values to `.env`:

```bash
DB_URI=mongodb://localhost:27017/url-shortner
REDIS_URL=redis://UserName:MyPassword@PublicEndpoint
REDIRECT_CACHE_TTL_SECONDS=86400
```

If `REDIS_URL` is not configured, the app still runs and falls back to MongoDB.

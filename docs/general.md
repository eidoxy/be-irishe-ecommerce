# General API Spec

## API Health Check

Endpoint  : GET /api/health

Response Success (200)  :

```json
{
  "status": "success",
  "message": "API is running",
  "timestamp": string
}
```
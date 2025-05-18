# Admin API Specs

## Get Admin Profile

Endpoint  : GET /api/admin/profile

Headers : Authorization: Bearer {token}

Response Success (200)  :

```json
{
  "status": "success",
  "data": {
    "id": integer,
    "username": string,
    "name": string,
    "email": string
  }
}
```

## Update Admin Profile

Endpoint  : PUT /api/admin/profile

Headers : Authorization: Bearer {token}

Request Body  :

```json
{
  "name": string,
  "email": string
}
```

Response Success (200)  :

```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "id": integer,
    "username": string,
    "name": string,
    "email": string
  }
}
```
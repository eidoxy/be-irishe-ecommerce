# Auth API Spec for Admin

## Register Admin

Endpoint  : POST /api/auth/register

Request Body  :

```json
{
  "username": string,
  "name": string,
  "email": string,
  "password": string
}
```

Response Success (200)  :

```json
{
  "status": "success",
  "message": "Admin registered successfully",
  "data": {
    "id": integer,
    "username": string,
    "name": string,
    "email": string
  }
}
```

Response Error (400)  :

```json
{
  "status": "error",
  "message": "Username/email already exists"
}
```

## Login Admin

Endpoint  : POST /api/auth/login

Request Body  :

```json
{
  "username": string,
  "password": string
}
```

Response Success (200)  :

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": string,
    "admin": {
      "id": integer,
      "username": string,
      "name": string,
      "email": string
    }
  }
}
```

Response Error (400)  :

```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

## Logout

Endpoint  : POST  /api/auth/logout

Headers : Authorization: Bearer {token}

Response Success (200)  :

```json
{
  "status": "success",
  "message": "Logout successful"
}
```
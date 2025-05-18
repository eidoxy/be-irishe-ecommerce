# Category API Specs

## Create Category

Endpoint  : POST /api/categories

Headers : Authorization: Bearer {token}

Request Body  :

```json
{
  "name": string,
  "description": string
}
```

Response Success (200)  :

```json
{
  "status": "success",
  "message": "Category created successfully",
  "data": {
    "id": integer,
    "name": string,
    "description": string
  }
}
```

## Get All Categories

Endpoint  : GET /api/categories

Query Parameters (optional) :
- page    : integer (default: 1)
- limit   : integer (default: 10)
- search  : string

Response Success (200)  :

```json
{
  "status": "success",
  "data": [
    {
      "id": integer,
      "name": string,
      "description": string
    },
    ...
  ],
  "pagination": {
    "total": integer,
    "pages": integer,
    "page": integer,
    "limit": integer
  }
}
```

## Get Category by ID

Endpoint  : GET /api/categories/{id}

Response Success (200)  :

```json
{
  "status": "success",
  "data": {
    "id": integer,
    "name": string,
    "description": string
  }
}
```

Response Error (404)  :

```json
{
  "status": "error",
  "message": "Category not found"
}
```

## Update Category

Endpoint  : PUT /api/categories/{id}

Headers : Authorization: Bearer {token}

Request Body  :

```json
{
  "name": string,
  "description": string
}
```

Response Success (200)  :

```json
{
  "status": "success",
  "message": "Category updated successfully",
  "data": {
    "id": integer,
    "name": string,
    "description": string
  }
}
```

Error Response (404)  :

```json
{
  "status": "error",
  "message": "Category not found"
}
```

## Delete Category

Endpoint  : DELETE /api/categories/{id}

Headers : Authorization: Bearer {token}

Response Success (200)  :

```json
{
  "status": "success",
  "message": "Category deleted successfully"
}
```

Response Error (404)  :

```json
{
  "status": "error",
  "message": "Category not found"
}
```

Response Error (400)  :

```json
{
  "status": "error",
  "message": "Cannot delete category with associated products"
}
```
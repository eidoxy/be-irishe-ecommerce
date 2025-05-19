# Category API Specs

## Create Product

Endpoint  : POST /api/products

Headers : Authorization: Bearer {token}

Request Body (multipart/form-data)  :

```json
{
  "category_id": integer,
  "name": string,
  "description": string,
  "stock": integer,
  "price": float,
  "image": file
}
```

Response Success (201)  :

```json
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": integer,
    "category_id": integer,
    "name": string,
    "description": string,
    "stock": integer,
    "price": float,
    "image_url": string
  }
}
```

## Get All Products

Endpoint  : GET /api/products

Query Parameters (optional):
- page: integer (default: 1)
- limit: integer (default: 10)
- search: string
- category_id: integer
- min_price: float
- max_price: float
- sort_by: string (name, price)
- sort_order: string (asc, desc)

Response Success (200)  :

```json
{
  "status": "success",
  "data": [
    {
      "id": integer,
      "category_id": integer,
      "category_name": string,
      "name": string,
      "description": string,
      "stock": integer,
      "price": float,
      "image_url": string
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

## Get Product by ID

Endpoint  : GET /api/products/{id}

Response Success (200)  :

```json
{
  "status": "success",
  "data": {
    "id": integer,
    "category_id": integer,
    "category_name": string,
    "name": string,
    "description": string,
    "stock": integer,
    "price": float,
    "image_url": string
  }
}
```

Response Error (404)  :

```json
{
  "status": "error",
  "message": "Product not found"
}
```

## Get Products by Category

Endpoint  : GET /api/categories/{id}/products

Query Parameters (optional):
- page: integer (default: 1)
- limit: integer (default: 10)
- sort_by: string (name, price)
- sort_order: string (asc, desc)

Response Success (200)  :

```json
{
  "status": "success",
  "data": [
    {
      "id": integer,
      "name": string,
      "description": string,
      "stock": integer,
      "price": float,
      "image_url": string
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

## Update Product

Endpoint  : PUT /api/products/{id}

Headers : Authorization: Bearer {token}

Request Body (multipart/form-data)  :

```json
{
  "category_id": integer,
  "name": string,
  "description": string,
  "stock": integer,
  "price": float,
  "image": file (optional)
}
```

Response Success (200)  :

```json
{
  "status": "success",
  "message": "Product updated successfully",
  "data": {
    "id": integer,
    "category_id": integer,
    "name": string,
    "description": string,
    "stock": integer,
    "price": float,
    "image_url": string
  }
}
```

Response Error (404)  :

```json
{
  "status": "error",
  "message": "Product not found"
}
```

## Update Product Stock

Endpoint  : PATCH /api/products/{id}/stock

Headers : Authorization: Bearer {token}

Request Body  :

```json
{
  "stock": integer
}
```

Response Success (200)  :

```json
{
  "status": "success",
  "message": "Product stock updated successfully",
  "data": {
    "id": integer,
    "stock": integer
  }
}
```

## Delete Product

Endpoint  : DELETE /api/products/{id}

Headers : Authorization: Bearer {token}

Response Success (200)  :

```json
{
  "status": "success",
  "message": "Product deleted successfully"
}
```

Error Response (404)  :

```json
{
  "status": "error",
  "message": "Product not found"
}
```
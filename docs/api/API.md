# API Documentation

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://api.manglamtechnicalagency.com/api`

## Endpoints

### Health Check

```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-04-06T12:00:00.000Z"
}
```

---

### Contact

#### Submit Contact Form

```
POST /api/contact
```

Request Body:
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (optional)",
  "company": "string (optional)",
  "service": "string (optional)",
  "message": "string (required)"
}
```

Response (201):
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": { ... }
}
```

---

### Quote

#### Request Quote

```
POST /api/quote
```

Request Body:
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (optional)",
  "company": "string (optional)",
  "services": ["array of strings"],
  "budget": "string (optional)",
  "timeline": "string (optional)",
  "description": "string (required)"
}
```

Response (201):
```json
{
  "success": true,
  "message": "Quote request submitted successfully",
  "data": { ... }
}
```

---

### Newsletter

#### Subscribe

```
POST /api/newsletter/subscribe
```

Request Body:
```json
{
  "email": "string (required)",
  "name": "string (optional)"
}
```

Response (201):
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

#### Unsubscribe

```
DELETE /api/newsletter/unsubscribe
```

Request Body:
```json
{
  "email": "string (required)"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

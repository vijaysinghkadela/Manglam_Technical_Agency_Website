# Create API Endpoint

Create a new REST API endpoint with full stack integration.

## Usage
/create-api <resource> [operations]

## Process
1. Create/update model
2. Create controller
3. Create routes
4. Add validation middleware
5. Create tests
6. Create frontend service

## Output
Complete API endpoint with backend and frontend integration.

---

$ARGUMENTS

Create the API endpoint specified above.

### Backend Structure
```
backend/src/
├── models/{resource}.model.js       # Mongoose schema
├── controllers/{resource}.controller.js  # Request handlers
├── routes/{resource}.routes.js      # Express routes
├── services/{resource}.service.js   # Business logic
└── middleware/validators.js         # Input validation
```

### Route Pattern
```javascript
// {resource}.routes.js
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate, controller.create);
router.put('/:id', validate, controller.update);
router.delete('/:id', controller.delete);
```

### Response Format
```javascript
// Success
{ success: true, data: {...} }

// Error
{ success: false, error: 'message', details: [...] }
```

### Frontend Service
```typescript
// frontend/src/services/{resource}.service.ts
export const {resource}Service = {
  getAll: () => api.get('/{resource}'),
  getById: (id) => api.get(`/{resource}/${id}`),
  create: (data) => api.post('/{resource}', data),
  update: (id, data) => api.put(`/{resource}/${id}`, data),
  delete: (id) => api.delete(`/{resource}/${id}`),
};
```

### Requirements
- [ ] Model with proper schema
- [ ] Controller with error handling
- [ ] Routes with validation
- [ ] Backend tests
- [ ] Frontend service
- [ ] TypeScript types

Create the endpoint now.

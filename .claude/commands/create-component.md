# Create Component

Create a new React component following MTA design standards.

## Usage
/create-component <ComponentName> [description]

## Process
1. Create component file with proper structure
2. Add TypeScript types
3. Implement with MTA styling
4. Create test file
5. Export from index

## Output
Complete component with types and tests.

---

$ARGUMENTS

Create the React component specified above.

Use the `frontend-design` and `ui-ux-pro-max` skills:

### Component Structure
```
frontend/src/components/{ComponentName}/
├── {ComponentName}.tsx      # Main component
├── {ComponentName}.test.tsx # Tests
├── types.ts                 # TypeScript types
└── index.ts                 # Barrel export
```

### Component Template
```tsx
import { FC } from 'react';
import { ComponentNameProps } from './types';

export const ComponentName: FC<ComponentNameProps> = ({ 
  // props 
}) => {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
};
```

### MTA Styling
- Primary color: `#6B1A1A`
- Use Tailwind utilities
- Mobile-first responsive
- Proper hover/focus states
- Accessible (ARIA, semantic HTML)

### Requirements
- [ ] TypeScript types defined
- [ ] Props documented with JSDoc
- [ ] Responsive design
- [ ] Accessible
- [ ] Basic test coverage
- [ ] Exported from index

Create the component now.

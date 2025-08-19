# Components Documentation - ATD Briques

This document provides detailed information about all React components used in the ATD Briques website.

## Overview

The ATD Briques website is built with reusable React components using TypeScript and CSS Modules. All components are documented with JSDoc comments and follow modern React patterns.

## Component Architecture

```
src/components/
├── Contact.tsx              # Contact form with social media links
├── EstimateModal.tsx        # Modal for estimate requests
├── Footer.tsx               # Site footer with social links
├── Navbar.tsx               # Navigation with language toggle
├── PageTransition.tsx       # Page transition animations
├── Reviews.tsx              # Client testimonials display
└── UnderConstructIcon.tsx   # Construction icon component
```

---

## Core Components

### Navbar

**File:** `src/components/Navbar.tsx`

Main navigation component with bilingual support and responsive design.

#### Features
- Bilingual navigation (French/English)
- Active link highlighting based on current route
- Language toggle functionality
- Shopping cart with under-construction notification
- Responsive design with mobile-friendly layout
- Company logo with home link

#### Props
No props required - uses global translation context.

#### Usage
```tsx
// Used in layout.tsx
<Navbar />
```

#### Dependencies
- `useTranslation`: Custom hook for internationalization
- `usePathname`: Next.js hook for current route detection
- `React Icons`: For shopping cart icon
- `CSS Modules`: For component-scoped styling

---

### Contact

**File:** `src/components/Contact.tsx`

Full-featured contact section with form submission and company information.

#### Features
- Contact form with validation and submission
- Social media links (configurable via environment variables)
- Company information display (address, phone, email)
- Form state management with loading and error states
- Responsive two-column layout
- Internationalization support

#### Props
No props required - standalone component.

#### Usage
```tsx
// Used in About page or as standalone contact section
<Contact />
```

#### Form Fields
- **Name** (required): Contact person's full name
- **Email** (required): Contact person's email address
- **Message** (required): Message content

#### Environment Variables
```env
NEXT_PUBLIC_COMPANY_ADDRESS="Your Company Address"
NEXT_PUBLIC_COMPANY_PHONE="+XX XXX XXX XX"
NEXT_PUBLIC_COMPANY_EMAIL="contact@yourcompany.com"
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/yourpage"
NEXT_PUBLIC_X_URL="https://x.com/yourhandle"
NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/company/yourcompany"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/yourhandle"
```

#### API Integration
Submits to `/api/contact` endpoint with form data.

---

### EstimateModal

**File:** `src/components/EstimateModal.tsx`

Modal dialog for collecting project estimate requests with comprehensive form validation.

#### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| open | boolean | Yes | Whether the modal is open/visible |
| onClose | () => void | Yes | Callback function to close the modal |

#### Features
- Modal overlay with click-outside-to-close functionality
- Comprehensive form with client and project information
- Real-time form validation with error display
- API integration for estimate submission
- Loading states and success/error feedback
- Internationalization support
- Responsive design for mobile devices

#### Usage
```tsx
const [modalOpen, setModalOpen] = useState(false);

<EstimateModal 
  open={modalOpen} 
  onClose={() => setModalOpen(false)} 
/>
```

#### Form Fields
- **Name** (required): Client's full name
- **Email** (required): Client's email address
- **Description** (required): Project description and requirements
- **Phone** (optional): Client's phone number
- **Company** (optional): Client's company name

#### API Integration
Submits to `/api/estimate` endpoint with form data.

---

### Reviews

**File:** `src/components/Reviews.tsx`

Client testimonials display with company logos and review cards.

#### Features
- Display client testimonials with star ratings
- Company logos grid
- Responsive design
- Internationalization support
- Star rating display

#### Props
No props required - uses translation data.

#### Usage
```tsx
// Used in About page
<Reviews />
```

#### Data Sources
- Testimonials: From translation files (`t.reviews.testimonials`)
- Company logos: From `src/data/reviews.json`

#### Data Structure
```json
{
  "companyLogos": [
    {
      "id": 1,
      "name": "Company Name",
      "logo": "/logos/company.svg"
    }
  ]
}
```

---

### Footer

**File:** `src/components/Footer.tsx`

Simple site footer with social media links and copyright information.

#### Features
- Social media icons and links
- Copyright and developer information
- Responsive design

#### Props
No props required.

#### Usage
```tsx
// Used in layout.tsx
<Footer />
```

#### Social Links
- X (Twitter)
- Instagram
- LinkedIn

---

### PageTransition

**File:** `src/components/PageTransition.tsx`

Page transition animations wrapper component.

#### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | Yes | Child components to wrap with transitions |

#### Features
- Smooth page transitions
- Animation effects between route changes
- Wrapper for page content

#### Usage
```tsx
// Used in layout.tsx
<PageTransition>
  {children}
</PageTransition>
```

---

### UnderConstructIcon

**File:** `src/components/UnderConstructIcon.tsx`

Construction icon component for indicating features under development.

#### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| style | CSSProperties | No | Custom styles for the icon |
| aria-label | string | No | Accessibility label |

#### Features
- SVG construction icon
- Customizable styling
- Accessibility support

#### Usage
```tsx
<UnderConstructIcon 
  style={{ width: 20, height: 20, color: 'orange' }}
  aria-label="Under construction"
/>
```

---

## Page Components

### Home Page

**File:** `src/app/page.tsx`

Main homepage component with hero section, features grid, and call-to-action.

#### Features
- Hero section with company branding
- Services features grid (6 services)
- Three-column bottom section
- Estimate modal integration

#### Services Displayed
1. Building Construction
2. Repairs
3. Demolition
4. Foundation
5. Painting & Exterior
6. Site Management

---

### About Page

**File:** `src/app/about/page.tsx`

About page with company information, FAQ accordion, and contact integration.

#### Features
- Company description and branding
- FAQ accordion with expandable items
- Reviews component integration
- Contact component integration

#### FAQ Topics
- Types of construction projects
- Free quotes availability
- Response times
- Eco-friendly materials
- Insurance coverage

---

### Projects Page

**File:** `src/app/projects/page.tsx`

Projects showcase page with portfolio and project information.

#### Sub-components
- `TitleProjet`: Page title and hero
- `ProjectsHeader`: Call-to-action header
- `ProjectFeatureSection`: Project features and statistics
- `ProjectsLatest`: Latest projects gallery

---

## Styling

### CSS Modules

Each component uses CSS Modules for scoped styling:

```tsx
import styles from './Component.module.css';

export default function Component() {
  return <div className={styles.container}>Content</div>;
}
```

### Style Patterns

- **Responsive Design**: Mobile-first approach
- **Color Scheme**: Professional construction industry colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: CSS Grid and Flexbox for modern layouts

---

## State Management

### Translation Context

All components use the translation context for internationalization:

```tsx
const { t, language, setLanguage } = useTranslation();
```

### Form State

Form components use local state with TypeScript interfaces:

```tsx
interface FormData {
  name: string;
  email: string;
  message: string;
}

const [formData, setFormData] = useState<FormData>({
  name: '',
  email: '',
  message: ''
});
```

---

## Error Handling

### Form Validation

- Client-side validation with TypeScript
- Server-side validation in API routes
- User-friendly error messages
- Accessibility support with ARIA attributes

### Error States

```tsx
const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
const [errorMessage, setErrorMessage] = useState('');
```

---

## Accessibility

### ARIA Support

- Proper ARIA labels for interactive elements
- Form field associations with error messages
- Semantic HTML structure
- Keyboard navigation support

### Screen Reader Support

- Alt text for images
- Descriptive button labels
- Form field descriptions
- Skip navigation links

---

## Performance

### Optimization Techniques

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **CSS Modules**: Scoped styles prevent conflicts
- **TypeScript**: Compile-time error checking

### Loading States

- Form submission loading indicators
- Skeleton screens for content loading
- Error boundaries for component failures

---

## Testing

### Component Testing

```tsx
// Example test structure
import { render, screen } from '@testing-library/react';
import Component from './Component';

test('renders component correctly', () => {
  render(<Component />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### Integration Testing

- Form submission testing
- API endpoint testing
- User interaction testing
- Accessibility testing

---

## Development Guidelines

### Component Creation

1. Use TypeScript for all components
2. Add JSDoc documentation
3. Implement proper prop interfaces
4. Include error handling
5. Add accessibility features
6. Create corresponding CSS module

### Code Style

- Use functional components with hooks
- Follow React best practices
- Implement proper error boundaries
- Use semantic HTML elements
- Include proper TypeScript types

---

## Troubleshooting

### Common Issues

**Component not rendering:**
- Check if wrapped in TranslationProvider
- Verify all required props are passed
- Check for JavaScript errors in console

**Styling not applying:**
- Verify CSS module import syntax
- Check class name spelling
- Ensure CSS file exists

**Form submission failing:**
- Check API endpoint configuration
- Verify form validation logic
- Check network requests in dev tools

---

## Future Enhancements

### Planned Components

- Shopping cart functionality
- User authentication
- Project gallery
- Blog system
- Search functionality

### Performance Improvements

- Lazy loading for images
- Component code splitting
- State management optimization
- Bundle size reduction

---

**Last Updated:** January 2025  
**Components Version:** 1.0.0 
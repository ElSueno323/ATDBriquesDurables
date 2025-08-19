# ATD Briques - Sustainable Construction Company Website

A modern, bilingual (French/English) website for ATD Briques, a sustainable construction company. Built with Next.js 15, React 19, and TypeScript.

## 🏗️ Project Overview

ATD Briques is a professional website showcasing construction services including building construction, repairs, demolition, foundations, exterior painting, and site management. The website emphasizes sustainable and eco-friendly construction practices. Acces on https://atd-briques-durables.vercel.app .

### Key Features

- **Bilingual Support**: Full French and English translations
- **Responsive Design**: Mobile-first approach with modern CSS modules
- **Contact Forms**: Multiple contact forms with email integration
- **Service Showcase**: Detailed presentation of construction services
- **Project Portfolio**: Gallery of completed projects
- **Client Testimonials**: Reviews and company partnerships
- **Estimate Requests**: Online quote request system

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Frontend**: React 19.0.0, TypeScript 5
- **Styling**: CSS Modules for component-scoped styling
- **Icons**: React Icons (5.5.0)
- **Email**: Nodemailer for SMTP email sending
- **Development**: ESLint, Turbopack for fast development

## 📁 Project Structure

```
atd-briques-durables/
├── public/                     # Static assets
│   ├── icons/                  # Service icons (SVG)
│   ├── logos/                  # Company logos
│   ├── *.jpg                   # Hero and background images
│   └── logo.png                # Company logo
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About page with FAQ
│   │   ├── api/                # API routes
│   │   │   ├── contact/        # Contact form handler
│   │   │   ├── estimate/       # Estimate request handler
│   │   │   └── send-quote/     # Quote sending handler
│   │   ├── projects/           # Projects showcase page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout with navigation
│   │   └── page.tsx            # Homepage
│   ├── components/             # Reusable React components
│   │   ├── Contact.tsx         # Contact form component
│   │   ├── EstimateModal.tsx   # Estimate request modal
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Navbar.tsx          # Navigation with language toggle
│   │   ├── PageTransition.tsx  # Page transition animations
│   │   ├── Reviews.tsx         # Client testimonials
│   │   └── UnderConstructIcon.tsx # Construction icon
│   ├── data/                   # Static data files
│   │   └── reviews.json        # Company logos and review data
│   ├── locales/                # Internationalization
│   │   ├── en.json             # English translations
│   │   └── fr.json             # French translations
│   ├── services/               # Business logic
│   │   └── emailService.ts     # Email sending service
│   └── utils/                  # Utility functions
│       └── useTranslation.tsx  # Translation hook and context
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
└── eslint.config.mjs          # ESLint configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd atd-briques-durables
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   
   Create a `.env.local` file in the root directory:
   ```env
   # SMTP Configuration for email sending
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-email@domain.com
   SMTP_PASSWORD=your-email-password
   
   # Company Information (displayed on contact page)
   NEXT_PUBLIC_COMPANY_ADDRESS="Your Company Address"
   NEXT_PUBLIC_COMPANY_PHONE="+XX XXX XXX XX"
   NEXT_PUBLIC_COMPANY_EMAIL="contact@yourcompany.com"
   
   # Social Media Links
   NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/yourpage"
   NEXT_PUBLIC_X_URL="https://x.com/yourhandle"
   NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/company/yourcompany"
   NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/yourhandle"
   
   # Email Recipients
   NEXT_PUBLIC_QUOTE_EMAIL="quotes@yourcompany.com"
   NEXT_PUBLIC_QUOTE_SUBJECT="New Quote Request - ATD Briques"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Navigation

- **Home** (`/`): Hero section, services overview, company highlights
- **Projects** (`/projects`): Portfolio of completed projects
- **About** (`/about`): Company information, FAQ, client testimonials

### Language Toggle

The website supports bilingual content:
- Click the language toggle button (FR/EN) in the navigation
- All content automatically switches between French and English
- Language preference is maintained during the session

### Contact Forms

**Main Contact Form** (Contact page):
- Name, email, and message fields
- Sends email to configured SMTP recipient

**Estimate Request Modal** (triggered from homepage):
- Detailed form for project quotes
- Includes company, phone, and project description
- Modal overlay with form validation

## 🔧 Development

### Available Scripts

```bash
# Development with Turbopack (faster)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Key Development Features

- **Hot Reload**: Instant updates during development
- **TypeScript**: Full type safety across the codebase
- **CSS Modules**: Scoped styling prevents conflicts
- **ESLint**: Code quality and consistency
- **Turbopack**: Fast development bundling

### Adding New Translations

1. Update `src/locales/fr.json` and `src/locales/en.json`
2. Use the translation in components via `useTranslation()` hook:
   ```tsx
   const { t } = useTranslation();
   return <h1>{t.your.new.key}</h1>;
   ```

### Email Configuration

The project uses Nodemailer for email functionality:
- Configure SMTP settings in `.env.local`
- Email templates are in `src/services/emailService.ts`
- Three email types: contact, estimate, and quote requests

## 🎨 Styling

- **CSS Modules**: Each component has its own `.module.css` file
- **Global Styles**: `src/app/globals.css` for site-wide styles
- **Responsive Design**: Mobile-first approach
- **Color Scheme**: Professional construction industry colors

### CSS Module Example

```tsx
// Component
import styles from './Component.module.css';

export default function Component() {
  return <div className={styles.container}>Content</div>;
}
```

## 📧 Email Integration

### SMTP Setup

The website sends emails through SMTP for:
- Contact form submissions
- Estimate requests
- Quote requests

Configure your SMTP provider (Gmail, SendGrid, etc.) in environment variables.

### Email Templates

Located in `src/services/emailService.ts`:
- `sendContactEmail()`: Basic contact form
- `sendEstimateEmail()`: Detailed project estimates
- `sendQuoteEmail()`: Quote requests with project details

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project to Vercel
   - Connect your Git repository

2. **Environment Variables**
   - Add all `.env.local` variables to Vercel dashboard
   - Ensure SMTP credentials are secure

3. **Deploy**
   - Automatic deployments on Git push
   - Preview deployments for pull requests

### Other Platforms

The project works on any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Docker containers

## 🔒 Security Considerations

- **Environment Variables**: Never commit sensitive data
- **SMTP Credentials**: Use app-specific passwords
- **Form Validation**: Server-side validation in API routes
- **CORS**: API routes are configured for same-origin requests

## 🐛 Troubleshooting

### Common Issues

**Email not sending:**
- Verify SMTP credentials in `.env.local`
- Check if your email provider requires app-specific passwords
- Ensure SMTP_PORT matches your provider's requirements

**Translations not working:**
- Check JSON syntax in locale files
- Verify translation keys exist in both `fr.json` and `en.json`
- Ensure `useTranslation()` is used within `TranslationProvider`

**Build errors:**
- Run `npm run lint` to check for code issues
- Verify all imports and file paths are correct
- Check TypeScript errors with `tsc --noEmit`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style

- Use TypeScript for all new files
- Follow existing CSS Module patterns
- Add translations for any new text content
- Include proper error handling in API routes

## 📄 License

This project is developed by Gabriel Espinosa - 2025 © All rights reserved.

## 🆘 Support

For technical support or questions about the codebase:
1. Check this documentation first
2. Review the troubleshooting section
3. Create an issue in the repository
4. Contact the development team

---

**Last Updated**: January 2025  
**Version**: 0.1.0  
**Next.js Version**: 15.3.3

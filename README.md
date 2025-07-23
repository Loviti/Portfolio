# Chase Pelky - Portfolio Website

A modern, responsive portfolio website showcasing AI-focused software development projects. Built with Next.js 14, TypeScript, Tailwind CSS, and featuring an AI chatbot assistant powered by the "Builder Beaver" mascot.

## 🚀 Features

- **Modern Design**: Clean, professional design following comprehensive UX research
- **Responsive**: Mobile-first approach with seamless adaptation across all devices
- **AI Chatbot**: Interactive Builder Beaver assistant to answer questions about projects and skills
- **Smooth Animations**: Framer Motion animations with respect for reduced motion preferences
- **Accessibility**: WCAG AA compliant with proper ARIA labels and keyboard navigation
- **Performance**: Optimized with Next.js 14 App Router and edge functions

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **UI Components**: shadcn/ui + Radix primitives
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections (Hero, About, etc.)
│   ├── shared/            # Shared components
│   └── chatbot/           # AI chatbot components
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── styles/                # Additional styles
```

## 🎨 Design System

The project follows a comprehensive design system with:

- **Colors**: Cream background (#FFFDD0), Teal accent (#2A9D8F), Dark blue-black text (#1D1E22)
- **Typography**: Poppins for headings, Inter for body text, Fira Code for code
- **Spacing**: 8px base grid system
- **Components**: Consistent button styles, cards, forms, and animations

## 🔧 Setup & Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for contact forms and chat logs)
- OpenAI API key (for chatbot functionality)

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd portfolio
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   # Copy the example file and fill in your credentials
   cp .env.example .env.local
   ```

   Required environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **Set up Supabase database**:
   Create the following tables in your Supabase project:

   ```sql
   -- Contact messages table
   CREATE TABLE contact_messages (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     company TEXT,
     message TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Chat logs table
   CREATE TABLE chat_logs (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_message TEXT NOT NULL,
     bot_response TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Content Management

### Projects
Update project data in `lib/constants.ts`:
- Add project screenshots to `public/images/projects/`
- Update project details, technologies, and outcomes
- Add GitHub and live demo URLs

### Personal Information
Modify personal details in `lib/constants.ts`:
- Developer name, title, bio
- Skills and technologies
- Social media links
- Contact information

### AI Chatbot
Update chatbot responses in `lib/constants.ts`:
- Pre-seeded Q&A pairs in `CHATBOT_QA`
- Customize responses about projects and skills

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`

3. **Configure custom domain** (optional):
   - Add your domain in Vercel dashboard
   - Update `metadata.openGraph.url` in `app/layout.tsx`

### Alternative Deployments

The app can also be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- Any platform supporting Next.js

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🎯 Features Roadmap

- [ ] Complete project showcase with detailed case studies
- [ ] Enhanced AI chatbot with context awareness
- [ ] Blog section for technical articles
- [ ] Dark mode toggle
- [ ] Advanced animations and micro-interactions
- [ ] Contact form with email notifications
- [ ] Analytics and performance monitoring

## 📊 Performance

The site is optimized for:
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Lighthouse Score**: 90+ across all categories
- **Bundle Size**: Optimized with code splitting and tree shaking
- **SEO**: Comprehensive meta tags and structured data

## 🔒 Security

- CSRF protection with Next.js built-in features
- Environment variable validation
- Sanitized user inputs
- HTTPS enforcement
- Secure headers configuration

## 📄 License

This project is private and proprietary to Chase Pelky. All rights reserved.

## 📬 Contact

For questions about this portfolio or potential collaborations:

- **Email**: chaselawrence06@gmail.com
- **LinkedIn**: [linkedin.com/in/chasepelky](https://linkedin.com/in/chasepelky)
- **GitHub**: [github.com/loviti](https://github.com/loviti)

---

Built with ❤️ by Chase Pelky using modern web technologies. 
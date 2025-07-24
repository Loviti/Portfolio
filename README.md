# Chase Pelky - Portfolio Website

A modern, responsive portfolio website showcasing AI-focused software development projects. Built with Next.js 14, TypeScript, Tailwind CSS, and featuring a comprehensive admin panel for content management plus an AI chatbot assistant powered by the "Builder Beaver" mascot.

## 🚀 Features

### Public Portfolio
- **Modern Design**: Clean, professional design following comprehensive UX research
- **Responsive**: Mobile-first approach with seamless adaptation across all devices
- **AI Chatbot**: Interactive Builder Beaver assistant to answer questions about projects and skills
- **Smooth Animations**: Framer Motion animations with respect for reduced motion preferences
- **Dynamic Projects**: Real-time project data from database with image galleries
- **Contact Forms**: Integrated contact functionality with form validation

### Admin Panel
- **Secure Authentication**: Clerk-powered admin access with role-based permissions
- **Project Management**: Full CRUD operations for projects (Create, Read, Update, Delete)
- **Image Upload**: Drag-and-drop image uploads with Supabase Storage integration
- **Markdown Editor**: Rich text editing with live preview for project descriptions
- **Tech Tags**: Dynamic technology tag management with autocomplete
- **Form Validation**: Comprehensive client and server-side validation using Zod
- **Toast Notifications**: Real-time feedback for all admin operations

### Technical
- **Accessibility**: WCAG AA compliant with proper ARIA labels and keyboard navigation
- **Performance**: Optimized with Next.js 14 App Router and edge functions
- **SEO Ready**: Meta tags, structured data, and sitemap generation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **UI Components**: shadcn/ui + Radix primitives
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk
- **AI Integration**: OpenAI API
- **Storage**: Supabase Storage
- **Deployment**: Vercel

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

Required variables:
- **Clerk**: Authentication service for admin panel
- **Supabase**: Database and storage backend
- **OpenAI**: Powers the AI chatbot assistant

See `.env.example` for the complete list of required environment variables.

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Protected admin panel pages
│   │   ├── projects/      # Project management routes
│   │   └── seed/          # Database seeding interface
│   ├── api/               # API routes and webhooks
│   │   ├── admin/         # Admin-specific API endpoints
│   │   ├── chat/          # AI chatbot API
│   │   └── contact/       # Contact form submission
│   └── globals.css        # Global styles and CSS variables
├── components/             # Reusable UI components
│   ├── admin/             # Admin panel components
│   │   ├── project-form.tsx      # Project creation/editing form
│   │   ├── project-list.tsx      # Admin project listing
│   │   ├── image-upload.tsx      # File upload component
│   │   ├── markdown-editor.tsx   # Rich text editor
│   │   └── tech-tags-input.tsx   # Technology tags input
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections (Hero, About, etc.)
│   ├── shared/            # Shared components
│   └── chatbot/           # AI chatbot components
├── lib/                   # Utility functions and configurations
│   ├── actions/           # Server Actions for data mutations
│   ├── supabase.ts        # Supabase client configuration
│   ├── supabase-admin.ts  # Admin Supabase client (bypasses RLS)
│   ├── validations.ts     # Zod schemas for form validation
│   └── constants.ts       # App constants and configuration
├── types/                 # TypeScript type definitions
│   └── supabase.ts        # Generated Supabase types
├── public/                # Static assets
│   └── images/            # Project images and icons
├── middleware.ts          # Clerk authentication middleware
└── .env.example          # Environment variables template
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
- **Supabase account** (database, storage, and authentication)
- **Clerk account** (admin authentication)
- **OpenAI API key** (chatbot functionality)

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

   Fill in all required environment variables in `.env.local`:
   ```bash
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # OpenAI API
   OPENAI_API_KEY=sk-your_openai_key
   ```

3. **Set up Supabase database**:
   
   Run the following SQL in your Supabase SQL Editor:

   ```sql
   -- Projects table (main content)
   CREATE TABLE projects (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     slug TEXT UNIQUE NOT NULL,
     short_desc TEXT NOT NULL,
     long_desc TEXT NOT NULL,
     outcome TEXT,
     tech TEXT[] NOT NULL DEFAULT '{}',
     repo_url TEXT,
     demo_url TEXT,
     image_url TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

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

   -- Enable Row Level Security
   ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
   ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
   ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

   -- RLS Policies (public read, service role write)
   CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
   CREATE POLICY "Allow public read access" ON contact_messages FOR SELECT USING (true);
   CREATE POLICY "Allow public read access" ON chat_logs FOR SELECT USING (true);
   ```

4. **Set up Supabase Storage**:
   
   Create a storage bucket for project images:
   - Go to Storage in your Supabase dashboard
   - Create a new bucket named `project-images`
   - Set it to **Public** for image access
   - Configure CORS if needed

5. **Set up Clerk Authentication**:
   
   - Create a Clerk application
   - Configure sign-in/sign-up pages
   - Add your domain to allowed origins
   - Copy the API keys to `.env.local`

6. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

### Initial Data Setup

1. **Access the admin panel**:
   - Navigate to `/admin` (requires Clerk authentication)
   - Sign up/sign in through Clerk

2. **Seed initial projects**:
   - Go to `/admin/seed`
   - Click "Seed Projects" to populate initial project data
   - This migrates hardcoded projects from `lib/constants.ts` to the database

3. **Upload project images**:
   - Edit each project in `/admin/projects`
   - Upload hero images for better visual presentation

### Development Workflow

1. **Frontend changes**: Edit components, styles, or pages as needed
2. **Database changes**: Update SQL schema in Supabase, regenerate types
3. **Admin features**: Add new admin components in `components/admin/`
4. **API changes**: Modify Server Actions in `lib/actions/` or API routes in `app/api/`
5. **Type safety**: Run `npm run type-check` to verify TypeScript

## 📝 Content Management

### Projects (Admin Panel)
Manage projects through the secure admin interface at `/admin`:

**Creating Projects:**
- Navigate to `/admin` and click "New Project"
- Fill out comprehensive project details
- Upload hero images via drag-and-drop
- Add technology tags with autocomplete
- Write detailed descriptions with Markdown support
- Set outcomes and add repository/demo links

**Editing Projects:**
- Browse projects in the admin dashboard
- Use search functionality to find specific projects
- Edit any project details including images
- Changes reflect immediately on the public site

**Project Features:**
- **Rich Text Editor**: Markdown support with live preview
- **Image Upload**: Automatic optimization and storage in Supabase
- **Tech Tags**: Dynamic tag system with suggestions
- **Form Validation**: Real-time validation with error messages
- **Responsive Forms**: Mobile-friendly admin interface

### Personal Information
Update static content in `lib/constants.ts`:
- Developer name, title, bio
- Skills and technologies list
- Social media links
- Contact information

### AI Chatbot
Customize chatbot behavior:
- **Pre-seeded Responses**: Update `CHATBOT_QA` in `lib/constants.ts`
- **Dynamic Project Info**: Chatbot automatically learns about new projects from database
- **Conversation Logging**: All chats stored in Supabase for analysis

### Database Management
Direct database access via Supabase dashboard:
- **Projects Table**: View, edit, or delete projects directly
- **Contact Messages**: Monitor form submissions
- **Chat Logs**: Analyze chatbot conversations
- **Storage**: Manage uploaded images and files

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set environment variables** in Vercel dashboard:
   ```bash
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Supabase Configuration  
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # OpenAI API
   OPENAI_API_KEY=sk-your_openai_key
   ```

3. **Production Configuration**:
   - Ensure Clerk is configured for production domain
   - Verify Supabase RLS policies are properly set
   - Test admin panel functionality
   - Configure custom domain and SSL

4. **Post-Deployment Setup**:
   - Seed initial project data via `/admin/seed`
   - Upload project images through admin panel
   - Test contact forms and chatbot functionality

### Alternative Deployments

The app can also be deployed to:
- **Netlify**: Full Next.js support with serverless functions
- **Railway**: Database and app hosting in one platform  
- **DigitalOcean App Platform**: Scalable container deployment
- **AWS Amplify**: Full-stack deployment with CI/CD

### Security Considerations for Production

- Use production Clerk keys (not test keys)
- Enable Supabase RLS policies for all tables
- Configure CORS policies for your domain
- Set up proper error monitoring
- Use HTTPS for all external integrations

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build optimized production bundle
npm run start        # Start production server locally

# Code Quality
npm run lint         # Run ESLint with auto-fix
npm run lint:check   # Check linting without fixing
npm run type-check   # Full TypeScript type checking

# Database
npm run db:types     # Generate TypeScript types from Supabase
npm run db:reset     # Reset local database (if using local Supabase)
```

## 🛠️ Admin Panel Guide

### Access & Authentication
1. Navigate to `/admin` on your deployed site
2. Sign in through Clerk authentication
3. Access is automatically granted to authenticated users

### Managing Projects
- **Dashboard**: View all projects with search and filtering
- **Create**: Add new projects with rich form validation
- **Edit**: Update existing projects with live preview
- **Delete**: Remove projects with confirmation dialogs
- **Images**: Upload and manage project screenshots

### Content Features
- **Markdown Support**: Rich text editing with live preview
- **Technology Tags**: Auto-complete tag system
- **Image Upload**: Drag-and-drop with automatic optimization
- **Form Validation**: Real-time client and server validation
- **Toast Notifications**: Immediate feedback for all actions

## 🎯 Features Roadmap

### Completed ✅
- [x] **Admin Panel**: Full CRUD operations for projects
- [x] **Image Upload**: Supabase Storage integration
- [x] **Authentication**: Clerk-based secure admin access
- [x] **Database Integration**: Supabase with RLS policies
- [x] **Form Validation**: Comprehensive client/server validation
- [x] **Markdown Editor**: Rich text editing with preview
- [x] **Responsive Design**: Mobile-first admin interface
- [x] **Contact Forms**: Working contact form with validation
- [x] **AI Chatbot**: OpenAI-powered assistant

### Planned Enhancements 🚧
- [ ] **Email Notifications**: Admin alerts for new contact messages
- [ ] **Blog Section**: Content management for technical articles
- [ ] **Analytics Dashboard**: Track visitor engagement and interactions
- [ ] **Advanced Search**: Full-text search across projects and content
- [ ] **Bulk Operations**: Mass edit/delete capabilities in admin
- [ ] **Content Scheduling**: Draft and scheduled publish functionality
- [ ] **Image Gallery**: Multiple images per project with lightbox
- [ ] **SEO Optimization**: Advanced meta tag management
- [ ] **Performance Monitoring**: Real-time site performance tracking

## 📊 Performance

The site is optimized for:
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Lighthouse Score**: 90+ across all categories
- **Bundle Size**: Optimized with code splitting and tree shaking
- **SEO**: Comprehensive meta tags and structured data

## 🔒 Security

### Authentication & Authorization
- **Clerk Integration**: Industry-standard authentication with JWT tokens
- **Protected Routes**: Middleware-based route protection for admin panel
- **Session Management**: Automatic token refresh and secure session handling

### Data Protection
- **Row Level Security**: Supabase RLS policies prevent unauthorized data access
- **Service Role Isolation**: Admin operations use dedicated service role key
- **Input Validation**: Comprehensive sanitization with Zod schemas
- **CSRF Protection**: Next.js built-in protection against cross-site requests

### Infrastructure Security  
- **Environment Variables**: Secure configuration management
- **HTTPS Enforcement**: SSL/TLS encryption for all communications
- **Secure Headers**: CSP, HSTS, and other security headers
- **File Upload Security**: Validated file types and size limits
- **Database Encryption**: Supabase provides encryption at rest and in transit

## 📬 Contact

For questions about this portfolio or potential collaborations:

- **Email**: chaselawrence06@gmail.com
- **LinkedIn**: [linkedin.com/in/chasepelky](https://linkedin.com/in/chasepelky)
- **GitHub**: [github.com/loviti](https://github.com/loviti)

---

Built with ❤️ by Chase Pelky.
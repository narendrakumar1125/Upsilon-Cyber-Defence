# CyberNexGen Website

A modern, responsive website for CyberNexGen Solutions - a cybersecurity training and services company.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Features

- Responsive design for all device sizes
- Dynamic page routing
- Animated UI components
- Dark/Light mode toggle
- SEO optimized

## Project Structure

```
cybernexgen-website/
├── app/                           # Next.js app directory
│   ├── about/                     # About page
│   │   └── page.tsx               
│   ├── contact/                   # Contact page
│   │   └── page.tsx
│   ├── courses/                   # Courses pages
│   │   ├── [id]/                  # Dynamic course detail pages
│   │   │   └── page.tsx
│   │   └── page.tsx               # Main courses listing page
│   ├── instructor/                # Become an instructor page
│   │   └── page.tsx
│   ├── privacy-policy/            # Privacy policy page
│   │   └── page.tsx
│   ├── services/                  # Services pages
│   │   ├── [id]/                  # Dynamic service detail pages
│   │   │   └── page.tsx
│   │   └── page.tsx               # Main services listing page
│   ├── layout.tsx                 # Root layout with ThemeProvider
│   ├── page.tsx                   # Homepage
│   └── globals.css                # Global CSS styles
│
├── components/                    # Reusable components
│   ├── motion/                    # Animation components
│   │   ├── animations.ts          # Animation variants
│   │   └── MotionComponents.tsx   # Reusable animated components
│   ├── AboutSection.tsx           # About section component
│   ├── ContactAndFooter.tsx       # Contact form and footer components
│   ├── HeroSection.tsx            # Hero section component
│   ├── Navbar.tsx                 # Navigation component
│   └── ThemeToggle.tsx            # Theme toggle component
│
├── context/                       # Context providers
│   └── ThemeContext.tsx           # Theme context provider
│
├── public/                        # Static assets
│   ├── favicon.ico                # Site favicon
│   ├── logo.png                   # Site logo
│   └── images/                    # Image assets
│
├── utils/                         # Utility functions
│   └── metadata.ts                # SEO metadata configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cybernexgen-website.git
   ```

2. Navigate to the project directory:
   ```
   cd cybernexgen-website
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Future Enhancements

- Authentication system
- Payment integration
- Course content system
- Admin dashboard
- Blog section

## License

This project is licensed under the ISC License.
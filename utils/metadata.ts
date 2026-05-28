import { Metadata } from 'next';

const baseMetadata: Metadata = {
  title: {
    default: 'Upsilon Cyber Defence - Advanced Cybersecurity & Cloud Solutions',
    template: '%s | Upsilon Cyber Defence'
  },
  description: 'Transform your career with Upsilon Cyber Defence\'s expert-led courses in DevOps, Cloud Computing, Cybersecurity, and more. Join thousands of professionals advancing their tech careers.',
  keywords: ['cybersecurity', 'cloud computing', 'DevOps', 'AWS', 'Azure', 'training', 'certification', 'online courses'],
  authors: [{ name: 'Upsilon Cyber Defence' }],
  creator: 'Upsilon Cyber Defence',
  publisher: 'Upsilon Cyber Defence',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://upsilon.com'),
  openGraph: {
    title: 'Upsilon Cyber Defence - Advanced Cybersecurity & Cloud Solutions',
    description: 'Transform your career with expert-led courses in DevOps, Cloud Computing, and Cybersecurity',
    url: 'https://upsilon.com',
    siteName: 'Upsilon Cyber Defence',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Upsilon Cyber Defence - Cybersecurity & Cloud Solutions',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upsilon Cyber Defence - Advanced Cybersecurity & Cloud Solutions',
    description: 'Transform your career with expert-led courses in DevOps, Cloud Computing, and Cybersecurity',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default baseMetadata;
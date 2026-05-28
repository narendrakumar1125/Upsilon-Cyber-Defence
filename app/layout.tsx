import { Analytics } from '@/components/Analytics';
import CustomCursor from '@/components/CustomCursor';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import baseMetadata from '@/utils/metadata';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans min-h-screen transition-colors duration-300`}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <AuthProvider>
            <ThemeProvider>
              {children}
              <CustomCursor />
              <Analytics />
            </ThemeProvider>
          </AuthProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

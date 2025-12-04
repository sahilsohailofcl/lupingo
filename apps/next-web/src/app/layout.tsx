import './globals.css'; // Your global styles
import type { Metadata } from 'next';
import { MainLayout } from './components/MainLayout'; // Import your new layout component
import { Providers } from './components/providers/Providers';

export const metadata: Metadata = {
  title: 'Foclupus - The Focused Wolf',
  description: 'Gamified productivity and dopamine detox app.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* We apply the client providers here */}
      <body>
        <Providers>
          {/* MainLayout wraps all your content */}
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  );
}
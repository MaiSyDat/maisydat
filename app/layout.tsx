import type { Metadata, Viewport } from 'next';
import './globals.css';
import SoundManager from "@/components/SoundManager";

export const metadata: Metadata = {
  title: 'Mai Sỹ Đạt | Developer',
  description: 'Interactive 3D Portfolio featuring orbital navigation, WebGL experiences, and full-stack expertise.',
  authors: [{ name: 'Mai Sỹ Đạt' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SoundManager />
        {children}
      </body>
    </html>
  );
}


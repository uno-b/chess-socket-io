import type { Metadata } from 'next';
import '../styles/global.css';

export const metadata: Metadata = {
  title: 'CodeMe Assignment - Unumandakh Bayandelger',
  description: 'Implemented subscription using Socket.io',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}

import './globals.css';

export const metadata = {
  title: 'Happy Anniversary',
  description: '4th Anniversary',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: { default: 'TransferMVP — Трансферы по Югу России', template: '%s — TransferMVP' },
  description: 'Комфортные трансферы: Сочи, Краснодар, Минеральные Воды, Пятигорск, Ставрополь. Фиксированные цены, 24/7. Закажите прямо сейчас.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'TransferMVP — Комфортные трансферы',
    description: 'Быстрая подача, фиксированные тарифы, проверенные водители.',
    url: '/',
    siteName: 'TransferMVP',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

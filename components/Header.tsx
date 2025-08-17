'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/', label: 'Главная' },
  { href: '/#routes', label: 'Маршруты' },
  { href: '/#pricing', label: 'Тарифы' },
  { href: '/#contacts', label: 'Контакты' },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b border-slate-200">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={28} height={28} />
          <span className="font-semibold">TransferMVP</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(item => (
            <Link key={item.href} href={item.href} className={`text-sm hover:text-blue-600 ${pathname===item.href ? 'text-blue-700' : 'text-slate-600'}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="#order" className="btn btn-primary text-sm">Заказать трансфер</Link>
      </div>
    </header>
  );
}

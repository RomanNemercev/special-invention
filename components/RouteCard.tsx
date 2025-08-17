import Link from 'next/link';
import type { RouteItem } from '@/lib/routes';

export default function RouteCard({ r }: { r: RouteItem }) {
  return (
    <Link href={`/${r.slugFrom}/${r.slugTo}`} className="card hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{r.from} → {r.to}</div>
          {r.distanceKm && <div className="text-slate-500 text-sm">{r.distanceKm} км</div>}
        </div>
        <div className="text-right">
          <div className="text-slate-500 text-xs">от</div>
          <div className="text-2xl font-bold mono">{r.basePrice.toLocaleString('ru-RU')} ₽</div>
        </div>
      </div>
    </Link>
  );
}

import type { Metadata } from 'next';
import { findRoute } from '@/lib/routes';
import OrderForm from '@/components/OrderForm';

type Props = { params: { from: string; to: string } };

export function generateMetadata({ params }: Props): Metadata {
  const r = findRoute(params.from, params.to);
  const title = r ? `Трансфер ${r.from} — ${r.to}. Цена от ${r.basePrice} ₽` : `Трансфер ${params.from} — ${params.to}`;
  const desc = r ? `Комфортный трансфер ${r.from} — ${r.to}. Фиксированная цена от ${r.basePrice} ₽. Закажите онлайн.` :
    `Комфортный трансфер ${params.from} — ${params.to}. Закажите онлайн.`;
  return { title, description: desc, alternates: { canonical: `/${params.from}/${params.to}` } };
}

export default function RoutePage({ params }: Props) {
  const r = findRoute(params.from, params.to);

  if (!r) {
    return (
      <div className="space-y-6 py-10">
        <h1 className="h1">Трансфер {params.from} → {params.to}</h1>
        <p className="text-slate-600">Уточните детали поездки в форме ниже — мы подскажем стоимость и назначим водителя.</p>
        <OrderForm defaults={{ from: params.from, to: params.to }} />
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Трансфер ${r.from} — ${r.to}`,
    "description": `Поездка ${r.from} — ${r.to} с фиксированной ценой.`,
    "offers": {
      "@type": "Offer",
      "price": r.basePrice,
      "priceCurrency": "RUB",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="space-y-6 py-10">
      <h1 className="h1">Трансфер {r.from} → {r.to}</h1>
      <p className="text-slate-600">Ориентировочная стоимость от <b>{r.basePrice.toLocaleString('ru-RU')} ₽</b>{r.distanceKm ? ` · ${r.distanceKm} км` : ''}.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card space-y-3">
          <div className="font-semibold">Преимущества</div>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>Фиксированная цена, без скрытых платежей</li>
            <li>Опытные водители, подача 24/7</li>
            <li>Детское кресло и ожидание по договоренности</li>
          </ul>
        </div>
        <OrderForm defaults={{ from: r.from, to: r.to }} />
      </div>
    </div>
  );
}

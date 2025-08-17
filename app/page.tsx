import RouteCard from '@/components/RouteCard';
import OrderForm from '@/components/OrderForm';
import { popularRoutes } from '@/lib/routes';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="mt-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="h1">Закажи трансфер легко</h1>
          <p className="mt-4 text-slate-600">
            Комфортные поездки по ЮФО и СКФО. Фиксированные цены, опытные водители, поддержка 24/7.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#order" className="btn btn-primary">Оформить заявку</a>
            <a href="tel:+79064123036" className="btn btn-outline">Позвонить</a>
          </div>
        </div>
        <div>
          <OrderForm />
        </div>
      </section>

      <section id="routes">
        <h2 className="h2 mb-6">Популярные направления</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularRoutes.map(r => <RouteCard key={r.slugFrom + r.slugTo} r={r} />)}
        </div>
      </section>

      <section id="pricing">
        <h2 className="h2 mb-4">Тарифы</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <div className="font-semibold mb-2">Эконом</div>
            <div className="text-slate-600 text-sm">от 25 ₽/км</div>
          </div>
          <div className="card">
            <div className="font-semibold mb-2">Комфорт</div>
            <div className="text-slate-600 text-sm">от 30 ₽/км</div>
          </div>
          <div className="card">
            <div className="font-semibold mb-2">Бизнес</div>
            <div className="text-slate-600 text-sm">от 35 ₽/км</div>
          </div>
          <div className="card">
            <div className="font-semibold mb-2">Минивэн</div>
            <div className="text-slate-600 text-sm">от 40 ₽/км</div>
          </div>
        </div>
      </section>
    </div>
  );
}

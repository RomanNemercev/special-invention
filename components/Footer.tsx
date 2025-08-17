export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200" id="contacts">
      <div className="container py-10 text-sm text-slate-600">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold text-slate-900 mb-2">TransferMVP</div>
            <p>Комфортные поездки по ЮФО и СКФО. Работаем 24/7.</p>
          </div>
          <div>
            <div className="font-semibold text-slate-900 mb-2">Контакты</div>
            <ul className="space-y-1">
              <li>Тел.: <a className="underline" href="tel:+79064123036">+7 906 412 30 36</a></li>
              <li>Email: <a className="underline" href="mailto:nemercevroman@gmail.com">nemercevroman@gmail.com</a></li>
              <li>Telegram: <a className="underline" href="https://t.me/nemercevroman">@nemercevroman</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-900 mb-2">Навигация</div>
            <ul className="space-y-1">
              <li><a href="/#routes" className="underline">Маршруты</a></li>
              <li><a href="/#pricing" className="underline">Тарифы</a></li>
              <li><a href="/#order" className="underline">Оформить заказ</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-xs text-slate-500">© 2025 TransferMVP</div>
      </div>
    </footer>
  );
}

'use client';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Укажите имя'),
  phone: z.string().min(7, 'Укажите телефон'),
  from: z.string().min(2, 'Пункт отправления обязателен'),
  to: z.string().min(2, 'Пункт назначения обязателен'),
  date: z.string().min(2, 'Дата обязательна'),
  passengers: z.string().optional(),
  comment: z.string().optional(),
});

export default function OrderForm({ defaults } : { defaults?: Partial<z.infer<typeof schema>>}) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOk(null); setErr(null);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setErr(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Ошибка отправки');
      setOk('Заявка отправлена! Мы свяжемся с вами.');
      (e.currentTarget as HTMLFormElement).reset();
    } catch (e:any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-4" id="order">
      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" defaultValue={defaults?.name} placeholder="Ваше имя" className="rounded-xl border px-4 py-3" />
        <input name="phone" defaultValue={defaults?.phone} placeholder="Телефон" className="rounded-xl border px-4 py-3" />
        <input name="from" defaultValue={defaults?.from} placeholder="Откуда" className="rounded-xl border px-4 py-3" />
        <input name="to" defaultValue={defaults?.to} placeholder="Куда" className="rounded-xl border px-4 py-3" />
        <input type="datetime-local" name="date" defaultValue={defaults?.date as any} className="rounded-xl border px-4 py-3" />
        <input name="passengers" defaultValue={defaults?.passengers} placeholder="Пассажиров (например, 3)" className="rounded-xl border px-4 py-3" />
        <textarea name="comment" defaultValue={defaults?.comment} placeholder="Комментарий" className="rounded-xl border px-4 py-3 md:col-span-2" />
      </div>
      <button disabled={loading} className="btn btn-primary w-full md:w-auto">{loading ? 'Отправка…' : 'Отправить заявку'}</button>
      {ok && <div className="text-green-700">{ok}</div>}
      {err && <div className="text-red-700">{err}</div>}
    </form>
  );
}

import { useState, useEffect, type FormEvent } from 'react';
import { Phone, MapPin, Mail, Clock, Send, CircleCheck as CheckCircle2, ShoppingCart, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRANDS, VEHICLES } from '@/data/vehicles';
import { useBooking } from '@/context/BookingContext';

const PHONE = '(404) 567-6287';
const PHONE_HREF = 'tel:+14045676287';
const EMAIL = 'contact@dashforge.com';
const EMAIL_HREF = 'mailto:contact@dashforge.com';

const PURCHASABLE: { id: string; label: string; price: number }[] = [
  { id: 'cluster', label: 'Digital Cluster Only — $799', price: 799 },
  { id: 'carplay', label: 'Apple CarPlay Only — $399', price: 399 },
  { id: 'bundle', label: 'Cluster + CarPlay — $999', price: 999 },
];

export function Contact() {
  const { selection, clearSelection } = useBooking();
  const [submitted, setSubmitted] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [purchased, setPurchased] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', brand: '', model: '', service: '', message: '' });

  useEffect(() => {
    if (selection && Object.keys(selection).length > 0) {
      setForm((f) => ({
        ...f,
        brand: selection.brand ?? f.brand,
        model: selection.model ?? f.model,
        service: selection.service ?? f.service,
      }));
    }
  }, [selection]);

  const isCustomQuote = form.service === 'mfsw' || form.service === 'bundle-mfsw' || form.service === 'full';

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };
  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handlePurchase = (pkgId: string) => {
    setPurchaseOpen(false);
    setPurchased(pkgId);
    setTimeout(() => setPurchased(null), 4000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ name: '', email: '', phone: '', brand: '', model: '', service: '', message: '' });
    clearSelection();
  };

  const selectionBanner = selection && Object.keys(selection).length > 0 && !submitted;

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="container-edge section-pad-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Contact / Book</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Book your mobile install.</h2>
          <p className="mt-4 text-lg text-neutral-400">Tell us about your vehicle and we'll confirm availability, timeline, and a quote. Steering wheel MFSW quotes come back within 24 hours.</p>
        </div>

        {/* Contact methods — compact row */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
          <a href={PHONE_HREF} className="flex items-center gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-4 transition-colors hover:border-accent-500/50">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400"><Phone className="h-5 w-5" /></span>
            <div className="min-w-0"><p className="text-xs text-neutral-500">Call or Text</p><p className="truncate text-sm font-semibold text-white">{PHONE}</p></div>
          </a>
          <a href={EMAIL_HREF} className="flex items-center gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-4 transition-colors hover:border-accent-500/50">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400"><Mail className="h-5 w-5" /></span>
            <div className="min-w-0"><p className="text-xs text-neutral-500">Email</p><p className="truncate text-sm font-semibold text-white">{EMAIL}</p></div>
          </a>
          <div className="flex items-center gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400"><Clock className="h-5 w-5" /></span>
            <div className="min-w-0"><p className="text-xs text-neutral-500">Response</p><p className="truncate text-sm font-semibold text-white">Within 24 hrs</p></div>
          </div>
        </div>

        {/* Selection carry-over banner */}
        {selectionBanner && (
          <div className="mx-auto mt-6 flex max-w-2xl items-center justify-between gap-3 rounded-2xl border border-accent-500/40 bg-accent-500/10 px-5 py-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-accent-300">
              <span className="font-semibold">Your selection:</span>
              {selection.brand && <span>{selection.brand}</span>}
              {selection.model && <span>· {selection.model}</span>}
              {selection.packageName && <span>· {selection.packageName}</span>}
            </div>
            <button type="button" onClick={clearSelection} className="shrink-0 text-accent-400 hover:text-accent-200" aria-label="Clear selection"><X className="h-4 w-4" /></button>
          </div>
        )}

        {/* Booking form */}
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-neutral-800/80 bg-neutral-900/50 p-6 sm:p-8">
          {submitted ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="h-8 w-8" /></span>
              <h3 className="mt-5 font-display text-xl font-bold text-white">Request received</h3>
              <p className="mt-2 max-w-xs text-sm text-neutral-400">Thanks, {form.name || 'there'}. We'll review your vehicle and reply within 24 hours with availability and a quote.</p>
              <button type="button" onClick={resetForm} className="btn-secondary mt-6">Send another request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} name="quote-request" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="space-y-4">
              <input type="hidden" name="form-name" value="quote-request" />
              <input type="hidden" name="bot-field" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name"><input required type="text" name="name" value={form.name} onChange={(e) => update('name', e.target.value)} className="input-field" placeholder="Your name" /></Field>
                <Field label="Phone"><input required type="tel" name="phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input-field" placeholder="(404) 567-6287" /></Field>
              </div>
              <Field label="Email"><input type="email" name="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="input-field" placeholder="you@email.com" /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Brand"><select name="brand" value={form.brand} onChange={(e) => update('brand', e.target.value)} className="input-field"><option value="">Select brand</option>{BRANDS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}</select></Field>
                <Field label="Model & year"><select name="model" value={form.model} onChange={(e) => update('model', e.target.value)} className="input-field" disabled={!form.brand}><option value="">{form.brand ? 'Select model' : 'Select brand first'}</option>{form.brand && VEHICLES[form.brand as keyof typeof VEHICLES].map((m) => <option key={m.name} value={`${m.name} (${m.years})`}>{m.name} · {m.years}</option>)}</select></Field>
              </div>
              <Field label="Package interested in"><select name="service" value={form.service} onChange={(e) => update('service', e.target.value)} className="input-field"><option value="">Select a package</option><option value="cluster">Digital Cluster Only — from $799</option><option value="carplay">Apple CarPlay Only — from $399</option><option value="bundle">Cluster + CarPlay — from $999</option><option value="mfsw">Steering Wheel (MFSW) — Custom quote</option><option value="full">Full bundle (Cluster + CarPlay + MFSW)</option></select></Field>
              <Field label="Message (optional)"><textarea name="message" value={form.message} onChange={(e) => update('message', e.target.value)} rows={3} className="input-field resize-none" placeholder="Anything we should know?" /></Field>

              {/* Buy now for non-custom packages */}
              {!isCustomQuote && form.service && PURCHASABLE.find((p) => p.id === form.service) && (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Ready to buy?</p>
                      <p className="text-xs text-neutral-400">Skip the quote — purchase now and we'll schedule your install.</p>
                    </div>
                    <button type="button" onClick={() => setPurchaseOpen(true)} className="btn-primary !py-2.5 !text-sm"><ShoppingCart className="h-4 w-4" />Buy Now</button>
                  </div>
                </div>
              )}

              <button type="submit" className="btn-primary w-full"><Send className="h-4 w-4" />Request Quote</button>
              <p className="text-center text-xs text-neutral-500">We'll reply within 24 hours. No deposit required to get a quote.</p>
            </form>
          )}
        </div>

        {/* Purchase modal */}
        {purchaseOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setPurchaseOpen(false)}>
            <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-white">Complete Purchase</h3>
                <button type="button" onClick={() => setPurchaseOpen(false)} className="text-neutral-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <p className="mt-2 text-sm text-neutral-400">You're purchasing the <span className="font-semibold text-accent-400">{PURCHASABLE.find((p) => p.id === form.service)?.label}</span> package. We'll collect payment details and schedule your mobile install.</p>
              <div className="mt-4 rounded-2xl bg-neutral-800/50 p-4">
                <div className="flex items-center justify-between text-sm"><span className="text-neutral-400">Package</span><span className="font-medium text-white">{PURCHASABLE.find((p) => p.id === form.service)?.label.split('—')[0]}</span></div>
                <div className="mt-2 flex items-center justify-between text-sm"><span className="text-neutral-400">Vehicle</span><span className="font-medium text-white">{form.brand ? `${form.brand} ${form.model}` : 'Not specified'}</span></div>
                <div className="mt-3 border-t border-neutral-700 pt-3 flex items-center justify-between"><span className="text-sm text-neutral-400">Total</span><span className="font-display text-2xl font-extrabold text-accent-400">${PURCHASABLE.find((p) => p.id === form.service)?.price.toLocaleString()}</span></div>
              </div>
              <button type="button" onClick={() => handlePurchase(form.service)} className="btn-primary mt-4 w-full"><ShoppingCart className="h-4 w-4" />Pay & Schedule Install</button>
              <p className="mt-2 text-center text-xs text-neutral-500">Secure checkout · 30-day warranty included</p>
            </div>
          </div>
        )}

        {/* Purchase confirmation toast */}
        {purchased && (
          <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 animate-fade-up rounded-2xl border border-emerald-500/40 bg-neutral-900 px-5 py-3 shadow-2xl">
            <div className="flex items-center gap-3 text-sm text-white"><CheckCircle2 className="h-5 w-5 text-emerald-400" />Purchase received — we'll contact you within 24 hours to schedule.</div>
          </div>
        )}

        <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2 text-sm text-neutral-500">
          <MapPin className="h-4 w-4 text-accent-400" />
          <span>Based in Cumberland, Atlanta, GA · Serving the greater Atlanta area · First 20 miles free</span>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<label className="block"><span className="mb-1.5 block text-xs font-semibold text-neutral-400">{label}</span>{children}</label>);
}

export function Footer() {
  return (
    <footer className="border-t border-neutral-800/80 py-12">
      <div className="container-edge section-pad-x">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-extrabold tracking-tight text-white">Dash<span className="text-accent-400">Forge</span></p>
            <p className="mt-1 text-sm text-neutral-500">Mobile automotive specialist · Cumberland, Atlanta, GA</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/services" className="text-neutral-500 hover:text-accent-400">Services</Link>
            <Link to="/vehicles" className="text-neutral-500 hover:text-accent-400">Compatibility</Link>
            <Link to="/gallery" className="text-neutral-500 hover:text-accent-400">Gallery</Link>
            <Link to="/pricing" className="text-neutral-500 hover:text-accent-400">Pricing</Link>
            <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-accent-400"><Phone className="h-3.5 w-3.5" /> {PHONE}</a>
            <a href={EMAIL_HREF} className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-accent-400"><Mail className="h-3.5 w-3.5" /> {EMAIL}</a>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-900 pt-6 text-center text-xs text-neutral-600">© {new Date().getFullYear()} DashForge. Digital cluster upgrades for Volkswagen & Audi. 30-day warranty on all work.</div>
      </div>
    </footer>
  );
}

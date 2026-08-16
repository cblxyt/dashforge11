import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRICING_TIERS } from '@/data/vehicles';
import { Contact, Footer } from '@/components/Contact';
import { useBooking } from '@/context/BookingContext';

const MOBILE_FEES = [
  { value: 'Free', label: 'First 20 miles from Cumberland — covers most of Atlanta.' },
  { value: '$50', label: 'Flat fee for installs beyond 20 miles.' },
  { value: '30 days', label: 'Warranty on all parts and labor, every install.' },
];

export default function PricingPage() {
  const { setSelection } = useBooking();

  const handleBook = (tier: typeof PRICING_TIERS[number]) => {
    const serviceMap: Record<string, string> = {
      'cluster': 'cluster',
      'carplay': 'carplay',
      'bundle': 'bundle',
    };
    setSelection({
      packageName: tier.name,
      service: serviceMap[tier.id] ?? tier.id,
    });
  };

  return (
    <main className="pt-20">
      <section className="py-16 lg:py-24">
        <div className="container-edge section-pad-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Pricing</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Clear, straightforward pricing</h1>
            <p className="mt-4 text-lg text-neutral-400">No hidden fees. Choose a package or bundle — mobile install and VIN programming included. Atlanta's best dashboard work for VAG vehicles.</p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING_TIERS.map((t) => (
              <div key={t.id} className={`relative flex flex-col rounded-3xl border p-6 transition-all ${t.popular ? 'border-accent-500 bg-neutral-900/60 shadow-2xl shadow-accent-500/10 lg:-mt-4 lg:mb-4' : 'border-neutral-800/80 bg-neutral-900/50'}`}>
                {t.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">Most Popular</span>}
                <h3 className="font-display text-base font-bold text-white">{t.name}</h3>
                <p className="mt-1 text-xs text-neutral-500">{t.tagline}</p>
                {/* Price aligned in a consistent-height row */}
                <div className="mt-4 flex min-h-[44px] items-baseline gap-1.5">
                  {t.oldPrice && <span className="text-lg text-neutral-500 line-through">{t.oldPrice}</span>}
                  <span className="font-display text-3xl font-extrabold text-white">{t.price}</span>
                  {t.priceNote && <span className="text-xs text-neutral-500">{t.priceNote}</span>}
                </div>
                <ul className="mt-5 space-y-2.5">
                  {t.features.map((f) => <li key={f} className="flex items-start gap-2.5 text-xs text-neutral-300"><span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-500/20 text-accent-400"><Check className="h-3 w-3" /></span>{f}</li>)}
                </ul>
                <Link to="/#contact" onClick={() => handleBook(t)} className={`mt-6 ${t.popular ? 'btn-primary' : 'btn-secondary'} !py-2.5 !text-sm`}>{t.cta}<ArrowRight className="h-4 w-4" /></Link>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-neutral-800/40 p-5 text-sm text-neutral-400">
            <p className="font-semibold text-neutral-200">Steering wheel = add-on only</p>
            <p className="mt-1">Multifunction steering wheel upgrades are offered as an add-on to a CarPlay or cluster package — not as a standalone service. Pricing is custom per vehicle and wheel option. We respond within 24 hours.</p>
          </div>
        </div>
      </section>

      {/* Mobile Service Fees */}
      <section className="py-20 lg:py-28">
        <div className="container-edge section-pad-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Mobile Service Fees</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">We come to you</h2>
            <p className="mt-4 text-lg text-neutral-400">Based in Cumberland, Atlanta, GA. Simple distance-based travel pricing.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {MOBILE_FEES.map((f) => (
              <div key={f.value} className="rounded-3xl border border-neutral-800/80 bg-neutral-900/50 p-6 text-center">
                <p className="font-display text-3xl font-extrabold text-accent-400">{f.value}</p>
                <p className="mt-2 text-sm text-neutral-400">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}

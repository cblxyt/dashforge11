import { ArrowRight, Check, Gauge, Smartphone, Package, CircleDot, PackageCheck, BadgeCheck, Car, ShieldCheck, CarFront, ClipboardList, Wrench, Rocket, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Contact, Footer } from '@/components/Contact';
import { useBooking } from '@/context/BookingContext';

const CLUSTER_BEFORE = 'https://images.pexels.com/photos/226457/pexels-photo-226457.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2';
const CLUSTER_AFTER = 'https://images.pexels.com/photos/28743959/pexels-photo-28743959.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2';
const CARPLAY_IMG = 'https://images.pexels.com/photos/15394303/pexels-photo-15394303.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2';
const BUNDLE_IMG = 'https://images.pexels.com/photos/4227723/pexels-photo-4227723.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2';
const MFSW_IMG = 'https://images.pexels.com/photos/28743952/pexels-photo-28743952.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2';

const SERVICES = [
  {
    icon: Gauge, title: 'Digital Cluster Upgrade', tag: 'Analog to full digital instrument cluster',
    desc: 'Replace your analog gauges with a fully digital, VW/Audi OEM-spec Active Info Display. VIN-specific programming for perfect integration.',
    features: ['Full Active Info Display', 'VIN-specific programming', 'OEM wiring & coding', 'Multiple display themes', '2–3 day turnaround'],
    price: '$799', priceTag: 'cluster only', badge: 'Flagship', badgeStyle: 'bg-accent-600 text-white', btn: 'Book Install', serviceId: 'cluster',
    images: [CLUSTER_BEFORE, CLUSTER_AFTER], imageLabels: ['Before — MK6 GTI analog cluster', 'After — MK7 Golf R digital cluster'],
  },
  {
    icon: Smartphone, title: 'Apple CarPlay', tag: 'Wireless CarPlay integration',
    desc: 'Full Apple CarPlay and Android Auto capability added to your factory infotainment. Retains OEM steering wheel controls.',
    features: ['Wireless CarPlay', 'Android Auto included', 'OEM steering controls retained', 'No dash modifications', 'Most VW & Audi 2012+'],
    price: '$399', priceTag: 'starting', btn: 'Book Install', serviceId: 'carplay',
    images: [CARPLAY_IMG], imageLabels: ['Apple CarPlay on infotainment screen'],
  },
  {
    icon: Package, title: 'Cluster + CarPlay Bundle', tag: 'Digital cluster + wireless CarPlay together',
    desc: 'Our most popular package — a full digital cluster upgrade bundled with wireless Apple CarPlay and Android Auto. Save $300 versus purchasing each separately.',
    features: ['Full Active Info Display', 'VIN-specific programming', 'Wireless CarPlay + Android Auto', 'OEM coding & controls retained', '2–3 day turnaround'],
    price: '$999', oldPrice: '$1299', priceTag: 'save $300', priceTagColor: 'text-emerald-400', badge: 'Most Popular', badgeStyle: 'bg-accent-600 text-white', btn: 'Book Install', serviceId: 'bundle',
    images: [BUNDLE_IMG], imageLabels: ['Digital cluster + CarPlay screen side by side'],
  },
  {
    icon: CircleDot, title: 'Steering Wheel + MFSW', tag: 'Multifunction steering wheel upgrade',
    desc: 'Upgrade to a multifunction steering wheel with working buttons — fully coded to your vehicle. Available as an add-on to any cluster or CarPlay package.',
    features: ['OEM multifunction wheel', 'Buttons coded to vehicle', 'Cruise control enabled', 'Professional install', 'Add-on only'],
    price: 'Custom', priceTag: 'response within 24 hrs', badge: 'Add-On', badgeStyle: 'bg-neutral-700 text-neutral-200', btn: 'Get Quote', serviceId: 'mfsw',
    note: 'Steering wheels are an add-on, not a standalone service. Multifunction steering wheel upgrades are offered alongside a cluster or CarPlay package. Pricing varies by model and wheel option — submit the booking form and we respond within 24 hours with a custom quote.',
    images: [MFSW_IMG], imageLabels: ['GTI MK7 multifunction steering wheel buttons'],
  },
];

const INCLUDED = [
  { icon: PackageCheck, title: 'New Digital Cluster', desc: 'OEM-spec Active Info Display, fully replacing your analog gauges.' },
  { icon: BadgeCheck, title: 'VIN-Specific Programming', desc: 'Coded to your exact vehicle so everything works as factory.' },
  { icon: Car, title: 'Professional Mobile Install', desc: 'We come to you. Clean, careful, done right the first time.' },
  { icon: ShieldCheck, title: '30-Day Warranty', desc: 'Full coverage on parts and labor. Peace of mind included.' },
];

const STEPS = [
  { step: '01', icon: CarFront, title: 'Choose Your Vehicle', desc: 'Select VW or Audi, then your exact model and year.' },
  { step: '02', icon: ClipboardList, title: 'Select Your Package', desc: 'Digital cluster, CarPlay, or the full bundle with steering wheel.' },
  { step: '03', icon: Wrench, title: 'We Come To You', desc: 'Mobile install at your home or office. First 20 miles free.' },
  { step: '04', icon: Rocket, title: 'Drive Away Upgraded', desc: 'Fully coded, warranted, and ready to go in 2–3 days.' },
];

const PURCHASABLE: Record<string, number> = { cluster: 799, carplay: 399, bundle: 999 };

export default function ServicesPage() {
  const { setSelection } = useBooking();

  const handleBook = (s: typeof SERVICES[number]) => {
    setSelection({
      packageName: s.title,
      service: s.serviceId,
    });
  };

  return (
    <main className="pt-20">
      <section className="py-16 lg:py-24">
        <div className="container-edge section-pad-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our Services</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Precision upgrades for your cockpit</h1>
            <p className="mt-4 text-lg text-neutral-400">Atlanta's best dashboard work for VAG vehicles. From CarPlay to full digital cluster conversions and multifunction steering wheels — everything we do is OEM-spec and mobile-installed.</p>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-edge section-pad-x">
          <div className="grid gap-5 lg:grid-cols-2">
            {SERVICES.map((s) => { const Icon = s.icon; const canBuy = PURCHASABLE[s.serviceId] != null; return (
              <div key={s.title} className="relative flex flex-col rounded-3xl border border-neutral-800/80 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-neutral-700/80 sm:p-8">
                {s.badge && <span className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold shadow-lg ${s.badgeStyle}`}>{s.badge}</span>}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-400"><Icon className="h-6 w-6" strokeWidth={2} /></div>
                <h2 className="font-display text-xl font-bold text-white">{s.title}</h2>
                <p className="mt-1 text-sm text-accent-400">{s.tag}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{s.desc}</p>
                {s.images.length === 2 ? (
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <div className="relative overflow-hidden rounded-2xl border border-neutral-800">
                      <img src={s.images[0]} alt={s.imageLabels[0]} className="aspect-[3/2] w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                      <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">Before</span>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl border border-neutral-800">
                      <img src={s.images[1]} alt={s.imageLabels[1]} className="aspect-[3/2] w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                      <span className="absolute left-2 top-2 rounded-full bg-accent-600/80 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">After</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-800">
                    <img src={s.images[0]} alt={s.imageLabels[0]} className="aspect-[3/2] w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  </div>
                )}
                <ul className="mt-5 space-y-2.5">{s.features.map((f) => <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-300"><Check className="h-4 w-4 shrink-0 text-accent-400" />{f}</li>)}</ul>

                {/* Price row — consistent height and alignment across all cards */}
                <div className="mt-6 flex min-h-[48px] items-baseline gap-2">
                  {s.oldPrice && <span className="text-lg text-neutral-500 line-through">{s.oldPrice}</span>}
                  <span className="font-display text-3xl font-extrabold text-white">{s.price}</span>
                  <span className={`text-xs ${s.priceTagColor ?? 'text-neutral-500'}`}>{s.priceTag}</span>
                </div>

                {/* Buttons aligned in a row */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link to="/#contact" onClick={() => handleBook(s)} className="btn-primary !py-2.5 !text-sm">{s.btn}<ArrowRight className="h-4 w-4" /></Link>
                  {canBuy && (
                    <Link to="/#contact" onClick={() => handleBook(s)} className="btn-secondary !py-2.5 !text-sm"><ShoppingCart className="h-4 w-4" />Buy {s.price}</Link>
                  )}
                </div>

                {s.note && <p className="mt-4 rounded-2xl bg-neutral-800/50 p-4 text-xs leading-relaxed text-neutral-400">{s.note}</p>}
              </div>
            ); })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-edge section-pad-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Every Install</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">What's included</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((it) => { const Icon = it.icon; return (
              <div key={it.title} className="rounded-3xl border border-neutral-800/80 bg-neutral-900/50 p-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-400"><Icon className="h-6 w-6" /></div>
                <h3 className="font-display text-base font-bold text-white">{it.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{it.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-edge section-pad-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">The Process</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Simple, end to end</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => { const Icon = s.icon; return (
              <div key={s.step} className="group relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/50 p-6 transition-all hover:border-accent-500/50">
                <span className="font-display text-4xl font-extrabold text-accent-500/30">{s.step}</span>
                <div className="mt-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-400 transition-all group-hover:scale-110 group-hover:bg-accent-500/20"><Icon className="h-5 w-5" strokeWidth={2} /></div>
                <h3 className="mt-3 font-display text-base font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{s.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}

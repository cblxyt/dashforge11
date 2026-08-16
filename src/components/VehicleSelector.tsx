import { useMemo, useState } from 'react';
import { Check, ChevronDown, Clock, ArrowRight, X, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Gauge, Smartphone, Disc3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRANDS, VEHICLES, getVehicleData, type BrandId, type VehicleModel } from '@/data/vehicles';
import { useBooking } from '@/context/BookingContext';

type PackageId = 'cluster' | 'carplay' | 'bundle' | 'bundle-mfsw';

const PACKAGES: { id: PackageId; label: string; icon: typeof Gauge; price: string }[] = [
  { id: 'cluster', label: 'Cluster Only', icon: Gauge, price: '$799' },
  { id: 'carplay', label: 'CarPlay Only', icon: Smartphone, price: '$399' },
  { id: 'bundle', label: 'Cluster + CarPlay', icon: Check, price: '$999' },
  { id: 'bundle-mfsw', label: 'Bundle + Steering Wheel', icon: Disc3, price: 'Custom' },
];

function VWLogo({ className = '' }: { className?: string }) {
  // Official VW 2020 flat emblem — traced from volkswagen.de source (Wikimedia Commons)
  // Path data extracted from the official SVG, viewBox 0 0 1024 1024
  return (
    <svg viewBox="0 0 1024 1024" className={className} aria-label="Volkswagen" role="img" fill="currentColor">
      <g transform="matrix(10.188387870788574, 0, 0, 10.188387870788574, -251.519936680809, -252.79260253906244)">
        <path d="M75,120.4c-24.9,0-45.3-20.5-45.3-45.4c0-5.6,1-10.9,2.9-15.9l26.5,53.3c0.3,0.7,0.8,1.3,1.6,1.3c0.8,0,1.3-0.6,1.6-1.3l12.2-27.3c0.1-0.3,0.3-0.6,0.6-0.6s0.4,0.3,0.6,0.6l12.2,27.3c0.3,0.7,0.8,1.3,1.6,1.3c0.8,0,1.3-0.6,1.6-1.3l26.5-53.3c1.9,5,2.9,10.3,2.9,15.9C120.3,99.9,99.9,120.4,75,120.4z M75,64.7c-0.3,0-0.4-0.3-0.6-0.6l-14.2-32c4.6-1.7,9.6-2.6,14.8-2.6c5.2,0,10.2,0.9,14.8,2.6l-14.2,32C75.4,64.5,75.3,64.7,75,64.7z M60.5,97.6c-0.3,0-0.4-0.3-0.6-0.6l-23-46.4c4.1-6.3,9.6-11.6,16.3-15.3l16.6,36.9C70,72.8,70.5,73,71,73h8c0.6,0,1-0.1,1.3-0.8l16.6-36.9c6.6,3.7,12.2,9,16.3,15.3L90,97c-0.1,0.3-0.3,0.6-0.6,0.6c-0.3,0-0.4-0.3-0.6-0.6l-8.7-19.8c-0.3-0.7-0.7-0.8-1.3-0.8h-8c-0.6,0-1,0.1-1.3,0.8L61.1,97C61,97.3,60.8,97.6,60.5,97.6z M75,125c27.7,0,50-22.3,50-50c0-27.7-22.3-50-50-50c-27.7,0-50,22.3-50,50C25,102.7,47.3,125,75,125z" />
      </g>
    </svg>
  );
}

function AudiLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-label="Audi" role="img" fill="none" stroke="currentColor" strokeWidth="3.5">
      <circle cx="18" cy="30" r="14" />
      <circle cx="42" cy="30" r="14" />
      <circle cx="66" cy="30" r="14" />
      <circle cx="90" cy="30" r="14" />
    </svg>
  );
}

function BrandMark({ brand, className = '' }: { brand: BrandId; className?: string }) {
  return brand === 'volkswagen' ? <VWLogo className={className} /> : <AudiLogo className={className} />;
}

export function VehicleSelector() {
  const { setSelection } = useBooking();
  const [brand, setBrand] = useState<BrandId | null>(null);
  const [model, setModel] = useState<VehicleModel | null>(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [pkg, setPkg] = useState<PackageId | null>(null);

  const models = useMemo(() => (brand ? VEHICLES[brand] : []), [brand]);
  const result = useMemo(() => (brand && model ? getVehicleData(brand, model) : null), [brand, model]);

  const reset = () => { setBrand(null); setModel(null); setModelOpen(false); setPkg(null); };

  const handleGetQuote = () => {
    if (!brand || !model || !pkg) return;
    const brandName = BRANDS.find((b) => b.id === brand)?.name ?? brand;
    const pkgLabel = PACKAGES.find((p) => p.id === pkg)?.label ?? '';
    setSelection({
      brand: brandName,
      model: `${model.name} (${model.years})`,
      packageName: pkgLabel,
      service: pkg,
    });
  };

  return (
    <section id="vehicles" className="py-20 lg:py-28">
      <div className="container-edge section-pad-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Compatibility</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Find your vehicle</h2>
          <p className="mt-4 text-lg text-neutral-400">Atlanta's best dashboard work for VAG vehicles. Select your brand and model to see stock status, timeline, and choose your package.</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-xl gap-3 sm:grid-cols-2 sm:gap-4">
          {BRANDS.map((b) => {
            const active = brand === b.id;
            return (
              <button key={b.id} type="button" onClick={() => { setBrand(b.id); setModel(null); setModelOpen(true); }}
                className={`group relative flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-300 ${active ? 'border-accent-500 bg-accent-500/10 shadow-lg shadow-accent-500/10' : 'border-neutral-800/80 bg-neutral-900/50 hover:border-neutral-700'}`}>
                <BrandMark brand={b.id} className={`h-10 w-10 shrink-0 transition-colors ${active ? 'text-accent-400' : 'text-neutral-500 group-hover:text-accent-400'}`} />
                <span className={`text-base font-semibold ${active ? 'text-accent-300' : 'text-white'}`}>{b.name}</span>
                {active && <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-accent-600 text-white"><Check className="h-3 w-3" /></span>}
              </button>
            );
          })}
        </div>

        {brand && (
          <div className="mt-8 animate-fade-up">
            <div className="relative">
              <button type="button" onClick={() => setModelOpen((v) => !v)} className="flex w-full items-center justify-between rounded-2xl border border-neutral-700 bg-neutral-900/60 px-5 py-4 text-left transition-colors hover:border-neutral-600">
                <span className="text-sm font-medium text-neutral-400">{model ? `${model.name} · ${model.years}` : 'Select model & year'}</span>
                <ChevronDown className={`h-5 w-5 text-neutral-400 transition-transform ${modelOpen ? 'rotate-180' : ''}`} />
              </button>

              {modelOpen && (
                <div className="absolute z-20 mt-2 max-h-80 w-full overflow-auto rounded-2xl border border-neutral-800 bg-neutral-900 p-2 shadow-2xl">
                  <div className="mb-1 px-3 py-2"><span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">In stock</span></div>
                  {models.filter((m) => m.status === 'in-stock').map((m) => <ModelRow key={m.name} model={m} selected={model?.name === m.name} onSelect={() => { setModel(m); setModelOpen(false); }} />)}
                  <div className="mb-1 mt-2 px-3 py-2"><span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Special order</span></div>
                  {models.filter((m) => m.status === 'special-order').map((m) => <ModelRow key={m.name} model={m} selected={model?.name === m.name} onSelect={() => { setModel(m); setModelOpen(false); }} />)}
                </div>
              )}
            </div>

            {result && (
              <div className="mt-6 animate-scale-in overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/50">
                <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-bold text-white">{result.model}</h3>
                      <span className="text-sm text-neutral-500">· {result.years}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.status === 'in-stock' ? <span className="chip bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="h-3.5 w-3.5" /> In Stock</span> : <span className="chip bg-amber-500/10 text-amber-400"><AlertCircle className="h-3.5 w-3.5" /> Special Order</span>}
                      <span className="chip bg-neutral-800 text-neutral-300"><Clock className="h-3.5 w-3.5" /> {result.timeline}</span>
                    </div>
                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Choose your package</p>
                      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {PACKAGES.map((p) => { const Icon = p.icon; const active = pkg === p.id; return (
                          <button key={p.id} type="button" onClick={() => setPkg(p.id)} className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${active ? 'border-accent-500 bg-accent-500/10' : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'}`}>
                            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${active ? 'bg-accent-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}><Icon className="h-4 w-4" strokeWidth={2} /></span>
                            <div className="flex-1"><p className={`text-sm font-semibold ${active ? 'text-accent-300' : 'text-neutral-200'}`}>{p.label}</p><p className="text-xs text-neutral-500">{p.price}</p></div>
                            {active && <Check className="h-4 w-4 shrink-0 text-accent-400" />}
                          </button>
                        ); })}
                      </div>
                    </div>
                    {result.note && <p className="mt-4 text-sm text-neutral-500">{result.note}</p>}
                  </div>
                  <div className="shrink-0 lg:text-right">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Starting at</p>
                    <p className="font-display text-3xl font-extrabold text-white">{result.startingPrice ? `$${result.startingPrice.toLocaleString()}` : 'Custom'}</p>
                    <div className="mt-4 flex gap-2 lg:justify-end">
                      <Link to="/#contact" onClick={handleGetQuote} className={`btn-primary !py-3 ${!pkg ? 'pointer-events-none opacity-50' : ''}`}>{pkg ? 'Get Quote' : 'Select a Package'}<ArrowRight className="h-4 w-4" /></Link>
                    </div>
                  </div>
                </div>
                <button type="button" onClick={reset} className="flex w-full items-center justify-center gap-1.5 border-t border-neutral-800 py-3 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-200"><X className="h-3.5 w-3.5" /> Reset selection</button>
              </div>
            )}
          </div>
        )}

        <p className="mt-8 text-center text-sm text-neutral-500">Apple CarPlay is available for most Volkswagen and Audi models from <span className="font-semibold text-neutral-300">2012 and newer</span>.</p>
      </div>
    </section>
  );
}

function ModelRow({ model, selected, onSelect }: { model: VehicleModel; selected: boolean; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors ${selected ? 'bg-accent-500/10 text-accent-300' : 'hover:bg-neutral-800'}`}>
      <span className="text-sm font-medium text-neutral-200">{model.name}</span>
      <span className="text-xs text-neutral-500">{model.years}</span>
    </button>
  );
}

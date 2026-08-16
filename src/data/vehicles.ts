export type StockStatus = 'in-stock' | 'special-order';

export interface VehicleModel {
  name: string;
  years: string;
  status: StockStatus;
}

export interface VehicleData {
  model: string;
  years: string;
  status: StockStatus;
  timeline: string;
  services: string[];
  startingPrice: number | null;
  note?: string;
}

export const BRANDS = [
  { id: 'volkswagen', name: 'Volkswagen' },
  { id: 'audi', name: 'Audi' },
] as const;

export type BrandId = (typeof BRANDS)[number]['id'];

export const VEHICLES: Record<BrandId, VehicleModel[]> = {
  volkswagen: [
    { name: 'Golf MK6', years: '2010–2014', status: 'in-stock' },
    { name: 'Golf MK7', years: '2015–2021', status: 'in-stock' },
    { name: 'GTI MK6', years: '2010–2014', status: 'in-stock' },
    { name: 'GTI MK7', years: '2015–2021', status: 'in-stock' },
    { name: 'Golf R MK7', years: '2015–2019', status: 'in-stock' },
    { name: 'Golf Sportwagen', years: '2015–2020', status: 'in-stock' },
    { name: 'Jetta Sportwagen', years: '2011–2014', status: 'in-stock' },
    { name: 'Golf MK5', years: '2006–2009', status: 'special-order' },
    { name: 'Golf MK4', years: '1999–2005', status: 'special-order' },
    { name: 'Tiguan', years: '2018–2024', status: 'special-order' },
    { name: 'Atlas', years: '2018–2024', status: 'special-order' },
    { name: 'Jetta', years: '2019–2024', status: 'special-order' },
    { name: 'Taos', years: '2022–2024', status: 'special-order' },
    { name: 'Passat', years: '2012–2022', status: 'special-order' },
  ],
  audi: [
    { name: 'A3', years: '2014–2020', status: 'in-stock' },
    { name: 'A4', years: '2014–2020', status: 'in-stock' },
    { name: 'Q5', years: '2014–2020', status: 'in-stock' },
    { name: 'A3 (older)', years: '2006–2013', status: 'special-order' },
    { name: 'A4 (older)', years: '2009–2013', status: 'special-order' },
    { name: 'Q5 (older)', years: '2009–2013', status: 'special-order' },
    { name: 'A5', years: '2018–2024', status: 'special-order' },
    { name: 'Q3', years: '2019–2024', status: 'special-order' },
    { name: 'Q7', years: '2017–2024', status: 'special-order' },
  ],
};

const IN_STOCK_SERVICES = ['Digital Cluster', 'Apple CarPlay', 'Steering Wheel (MFSW)'];
const SPECIAL_ORDER_SERVICES = ['Digital Cluster', 'Apple CarPlay'];

export function getVehicleData(brand: BrandId, model: VehicleModel): VehicleData {
  const inStock = model.status === 'in-stock';
  return {
    model: `${brand === 'volkswagen' ? 'VW' : 'Audi'} ${model.name}`,
    years: model.years,
    status: model.status,
    timeline: inStock ? '2–4 days (VIN programming)' : '1–2 weeks (special order)',
    services: inStock ? IN_STOCK_SERVICES : SPECIAL_ORDER_SERVICES,
    startingPrice: inStock ? 799 : null,
    note: inStock
      ? 'Cluster in stock — programming takes a couple of days with your VIN.'
      : 'Special order required. CarPlay widely available for 2012+ models.',
  };
}

export interface DisplayTheme {
  name: string;
  desc: string;
  brand: string;
}

export const DISPLAY_THEMES: DisplayTheme[] = [
  { name: 'Classic', desc: 'Clean analog-style gauges, digitized for clarity.', brand: 'VW & Audi' },
  { name: 'Sport', desc: 'Bold central tachometer with performance-focused layout.', brand: 'VW & Audi' },
  { name: 'Dynamic / S-Line', desc: 'Navigation-integrated view with turn-by-turn and media.', brand: 'Audi S-Line' },
  { name: 'RS', desc: 'RS-specific layout with shift lights and lap data.', brand: 'Audi RS' },
  { name: 'Sport Rainbow', desc: 'Audi-exclusive rainbow tachometer — vibrant multi-color RPM sweep.', brand: 'Audi' },
  { name: 'Off-Road', desc: 'Rugged layout with compass, altitude, and pitch for SUV and crossover models.', brand: 'VW & Audi' },
];

export interface RecentInstall {
  vehicle: string;
  service: string;
  category: 'Digital Cluster' | 'CarPlay' | 'Steering Wheel' | 'Bundle';
  date: string;
  image: string;
}

export const RECENT_INSTALLS: RecentInstall[] = [
  { vehicle: 'VW Golf R MK7', service: 'Digital Cluster + CarPlay', category: 'Bundle', date: 'Aug 2025', image: 'https://images.pexels.com/photos/28743959/pexels-photo-28743959.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2' },
  { vehicle: 'Audi R8', service: 'Digital Cluster', category: 'Digital Cluster', date: 'Aug 2025', image: 'https://images.pexels.com/photos/10475771/pexels-photo-10475771.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2' },
  { vehicle: 'VW GTI MK7', service: 'Apple CarPlay', category: 'CarPlay', date: 'Jul 2025', image: 'https://images.pexels.com/photos/29293963/pexels-photo-29293963.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2' },
  { vehicle: 'Audi Q5', service: 'Digital Cluster', category: 'Digital Cluster', date: 'Jul 2025', image: 'https://images.pexels.com/photos/11526276/pexels-photo-11526276.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2' },
  { vehicle: 'VW Golf MK7', service: 'Cluster + MFSW', category: 'Bundle', date: 'Jun 2025', image: 'https://images.pexels.com/photos/37685712/pexels-photo-37685712.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2' },
  { vehicle: 'Audi A4', service: 'Digital Cluster', category: 'Digital Cluster', date: 'Jun 2025', image: 'https://images.pexels.com/photos/4227723/pexels-photo-4227723.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2' },
];

export interface Review {
  name: string;
  vehicle: string;
  rating: number;
  text: string;
  service: string;
}

export const REVIEWS: Review[] = [
  { name: 'Marcus T.', vehicle: 'VW Golf R MK7', rating: 5, service: 'Cluster + CarPlay', text: 'Absolutely flawless. The digital cluster looks factory — every gauge, every warning works. They came to my office in Marietta and had it done in a day.' },
  { name: 'Sarah L.', vehicle: 'Audi A4', rating: 5, service: 'Digital Cluster', text: 'I was nervous about messing with my dash but the install was clean and professional. The Virtual Cockpit is incredible. Worth every penny.' },
  { name: 'David K.', vehicle: 'VW GTI MK7', rating: 5, service: 'CarPlay Only', text: 'Wireless CarPlay in my GTI for $399? Unreal. Retained all my steering wheel buttons. Highly recommend DashForge.' },
  { name: 'Jasmine R.', vehicle: 'VW Golf Sportwagen', rating: 5, service: 'Bundle + MFSW', text: 'Full bundle — cluster, CarPlay, and multifunction steering wheel. The MFSW buttons make it feel like a new car. Mobile service was super convenient.' },
  { name: 'Chris P.', vehicle: 'Audi Q5', rating: 5, service: 'Cluster + CarPlay', text: 'Saved $300 going with the bundle. The RS theme on my cluster is aggressive and beautiful. VIN programming took 2 days exactly as promised.' },
  { name: 'Tyler M.', vehicle: 'VW Golf MK6', rating: 5, service: 'Digital Cluster', text: 'My 2012 Golf feels like a 2024 model now. The Classic theme is clean and the install was done at my house. 30-day warranty gave me peace of mind.' },
];

export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  { q: 'How long does a digital cluster install take?', a: 'In-stock vehicles (MK6/MK7 Golf family, Audi A3/A4/Q5 2014–2020) take 2–3 days for VIN programming. The on-site install at your location is done in a few hours. Special order vehicles take 1–2 weeks.' },
  { q: 'Do you come to me?', a: 'Yes — we are a mobile service based in Cumberland, Atlanta, GA. We come to your home or office across the Atlanta area. The first 20 miles are free, and it is a flat $50 fee beyond that.' },
  { q: 'Is my vehicle compatible?', a: 'MK6 and MK7 Golf, GTI, Golf R, Golf Sportwagen, and Jetta Sportwagen are all in stock. Audi A3, A4, and Q5 (2014–2020) are also in stock. Most other VW and Audi models from 2012+ are available as special orders. Use our compatibility checker to confirm.' },
  { q: 'What warranty do you offer?', a: 'Every install is backed by a 30-day warranty on all parts and labor. If something fails within 30 days, we return and fix it free of charge.' },
  { q: 'Why is VIN programming needed?', a: 'Volkswagen and Audi clusters are coded to the vehicle identification number. Generic screens will not display correct mileage, warnings, or data. We program each cluster to your exact VIN so everything works as factory — no shortcuts.' },
  { q: 'How do I get a steering wheel quote?', a: 'Steering wheel multifunction (MFSW) upgrades are add-ons to a cluster or CarPlay package — not a standalone service. Pricing varies by model and wheel option. Submit the booking form and we respond within 24 hours with a custom quote.' },
];

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  oldPrice?: string;
  priceNote: string;
  features: string[];
  popular?: boolean;
  addon?: boolean;
  cta: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'cluster',
    name: 'Digital Cluster Only',
    tagline: 'Our flagship upgrade — a full digital instrument cluster.',
    price: '$799',
    priceNote: 'installed',
    features: ['Full digital cluster', 'VIN programming', 'OEM coding', 'Multiple display themes'],
    cta: 'Book Install',
  },
  {
    id: 'carplay',
    name: 'CarPlay Only',
    tagline: 'Wireless CarPlay + Android Auto for your factory screen.',
    price: '$399',
    priceNote: 'installed',
    features: ['Apple CarPlay', 'Android Auto', 'OEM controls retained'],
    cta: 'Book Install',
  },
  {
    id: 'bundle',
    name: 'Cluster + CarPlay',
    tagline: 'The full digital dash upgrade.',
    price: '$999',
    oldPrice: '$1299',
    priceNote: 'installed',
    features: ['Full digital cluster', 'VIN programming', 'Apple CarPlay + Android Auto', 'OEM coding', 'Save $300 vs separate'],
    popular: true,
    cta: 'Book Install',
  },
  {
    id: 'full',
    name: 'Full Bundle',
    tagline: 'Cluster + CarPlay + Steering Wheel.',
    price: 'Custom Quote',
    priceNote: '',
    features: ['Digital cluster', 'CarPlay', 'Steering wheel + MFSW', 'Full professional install'],
    addon: true,
    cta: 'Get Quote',
  },
];

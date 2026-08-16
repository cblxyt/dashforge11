import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { Contact, Footer } from '@/components/Contact';

const BEFORE_VW = 'https://images.pexels.com/photos/226457/pexels-photo-226457.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2';
const AFTER_VW = 'https://images.pexels.com/photos/28743959/pexels-photo-28743959.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2';
const BEFORE_AUDI = 'https://images.pexels.com/photos/16520978/pexels-photo-16520978.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2';
const AFTER_AUDI = 'https://images.pexels.com/photos/10475771/pexels-photo-10475771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2';

export default function GalleryPage() {
  return (
    <main className="pt-20">
      <section className="py-16 lg:py-24">
        <div className="container-edge section-pad-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Gallery</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Before &amp; after</h1>
            <p className="mt-4 text-lg text-neutral-400">Drag the sliders to see the transformation from analog to digital.</p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <BeforeAfterSlider beforeSrc={BEFORE_VW} afterSrc={AFTER_VW} beforeAlt="VW Golf MK6 analog instrument cluster" afterAlt="MK7 Golf R digital cluster installed" label="MK6 Golf — Analog → MK7 Golf R Digital Cluster" />
            <BeforeAfterSlider beforeSrc={BEFORE_AUDI} afterSrc={AFTER_AUDI} beforeAlt="Audi analog instrument cluster" afterAlt="Audi premium digital cockpit" label="Audi A4 — Analog → Virtual Cockpit" />
          </div>
        </div>
      </section>
      <Contact />
      <Footer />
    </main>
  );
}

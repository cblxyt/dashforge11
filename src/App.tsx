import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { ChatButton } from '@/components/ChatButton';
import { ScrollToTop } from '@/components/ScrollToTop';
import { PageTransition } from '@/components/PageTransition';
import { AmbientBackground } from '@/components/AmbientBackground';
import { BookingProvider } from '@/context/BookingContext';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import VehiclesPage from '@/pages/VehiclesPage';
import GalleryPage from '@/pages/GalleryPage';
import PricingPage from '@/pages/PricingPage';

export default function App() {
  return (
    <BookingProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="relative min-h-screen text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
            <AmbientBackground />
            <Navbar />
            <PageTransition>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/pricing" element={<PricingPage />} />
              </Routes>
            </PageTransition>
            <ChatButton />
          </div>
        </BrowserRouter>
      </BookingProvider>
  );
}

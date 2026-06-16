import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import PromotionalBanners from "@/components/sections/PromotionalBanners";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <PromotionalBanners />
      <HeroSection />
      <TrustStrip />
      <ServicesGrid />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}

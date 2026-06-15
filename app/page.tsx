import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import HowItWorks from "@/components/sections/HowItWorks";
import ServicesGrid from "@/components/sections/ServicesGrid";
import KundliGenerator from "@/components/sections/KundliGenerator";
import AstrologerProfiles from "@/components/sections/AstrologerProfiles";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <HowItWorks />
      <ServicesGrid />
      <KundliGenerator />
      <AstrologerProfiles />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

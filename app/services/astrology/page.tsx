import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Astrology Services | Vedic Destiny",
  description: "Detailed Vedic Astrology services for Career, Marriage, Medical, Property, and more.",
};

const ASTROLOGY_SERVICES = [
  {
    id: "children",
    title: "Children Section",
    description: "Our astrological analysis provides deep insights into progeny prospects, timing of childbirth, and the overall well-being and future of your children. We look at specific houses and planetary combinations to guide you on matters of family expansion and child health.",
  },
  {
    id: "career",
    title: "Career Section",
    description: "Navigate your professional path with confidence. We analyze your birth chart to determine the most favorable career paths, timing for job changes or promotions, and strategies to overcome workplace challenges and maximize your professional growth.",
  },
  {
    id: "property",
    title: "Property & Business Section",
    description: "Whether you are looking to buy a new home, invest in real estate, or start a new business venture, astrology can pinpoint the most auspicious timing. We help you avoid bad investments and find the right alignment for long-term business success and property acquisition.",
  },
  {
    id: "medical",
    title: "Medical Section",
    description: "Medical astrology (Ayurjyotisha) offers insights into potential health vulnerabilities based on your cosmic blueprint. We can identify periods of physical stress and suggest preventative astrological remedies to support your overall health and well-being.",
  },
  {
    id: "education",
    title: "Education Section",
    description: "Discover the educational fields where you or your child will naturally excel. We guide students and professionals on choosing the right streams, higher education prospects, and favorable periods for competitive exams and academic success.",
  },
  {
    id: "legal",
    title: "Court & Legal Issues",
    description: "Facing litigation can be stressful. Astrological analysis of the 6th house and relevant planetary dashas can provide clarity on the duration, potential outcomes, and most favorable periods to pursue or settle court cases and legal disputes.",
  },
  {
    id: "marriage",
    title: "Marriage Section",
    description: "Understand the timing, compatibility, and dynamics of your marital life. We offer detailed Kundli matching, insights into delays in marriage, and practical remedies to ensure a harmonious and prosperous relationship with your partner.",
  },
  {
    id: "foreign",
    title: "Foreign Visit & Settlement",
    description: "Wondering if you will travel or settle abroad? We analyze the 9th and 12th houses to determine your prospects for foreign travel, higher studies abroad, work visas, and the likelihood of permanent foreign settlement.",
  },
  {
    id: "debt",
    title: "Loan & Debt",
    description: "Astrology can reveal periods of financial vulnerability and debt accumulation. We provide guidance on when it is safe to take loans, periods of financial recovery, and remedies to help clear existing debts and achieve financial freedom.",
  },
  {
    id: "share-market",
    title: "Share Market Section",
    description: "Speculative investments require precise timing. By analyzing the 5th and 8th houses, we offer insights into your aptitude for share market trading, identifying periods of sudden gains, and warning against high-risk periods for investments.",
  },
];

export default function AstrologyServicesPage() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-bg-void pb-sp-10 pt-[140px] lg:pb-sp-16 lg:pt-[180px]">
        {/* Background ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-full max-w-[1200px] -translate-x-1/2 opacity-40"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(184,146,40,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-content px-sp-5 text-center">
          <SectionHeader
            eyebrow="Specialized Services"
            title="Vedic Astrology Deep Dive"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[700px] font-sans text-base leading-relaxed text-text-secondary">
            Every aspect of your life is influenced by cosmic rhythms. Explore our specialized astrological services designed to provide clarity, timing, and actionable remedies for the most important areas of your life.
          </p>
        </div>
      </section>

      {/* Services Content Section */}
      <section className="bg-bg-void pb-sp-16 lg:pb-24">
        <div className="mx-auto max-w-content px-sp-5">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-sp-8 lg:gap-sp-10">
            {ASTROLOGY_SERVICES.map((service) => (
              <StaggerItem key={service.id}>
                <div id={service.id} className="scroll-mt-32 h-full">
                  <Card interactive={true} className="p-sp-6 lg:p-sp-8 h-full flex flex-col">
                    <div className="mb-sp-5 flex items-center justify-between">
                      <h2 className="font-display text-xl font-bold text-text-primary">
                        {service.title}
                      </h2>
                      <div className="h-8 w-8 rounded-full bg-[rgba(184,146,40,0.08)] flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-gold-400" />
                      </div>
                    </div>
                    
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary flex-1">
                      {service.description}
                    </p>

                    <div className="mt-sp-6 pt-sp-4 border-t border-gold-400/10">
                      <a href="/#contact" className="font-sans text-[13px] font-bold text-gold-600 hover:text-gold-800 transition-colors inline-flex items-center gap-1">
                        Consult for {service.title.replace(' Section', '')} 
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    </div>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}

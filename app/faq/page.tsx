import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Accordion from "@/components/ui/Accordion";

const ASTROLOGY_FAQS = [
  { q: "What is Astrology?", a: "Astrology is the study of planetary movements and their influence on human life, personality, relationships, career, and future events." },
  { q: "How is a birth chart prepared in Astrology?", a: "A birth chart is created using your date of birth, exact birth time, and birthplace to analyze planetary positions at the time of your birth." },
  { q: "Can Astrology predict future events?", a: "Astrology provides guidance about possible future opportunities, challenges, and life trends based on planetary transits and horoscope analysis." },
  { q: "Which planet is responsible for career success?", a: "Planets like Saturn, Jupiter, Sun, and Mercury are often associated with career growth, authority, intelligence, and professional success." },
  { q: "What is the importance of zodiac signs in Astrology?", a: "Zodiac signs reveal personality traits, emotional patterns, strengths, weaknesses, and compatibility with others." },
  { q: "How does Astrology help in marriage compatibility?", a: "Astrology compares horoscopes of two individuals to check compatibility, emotional bonding, and long-term marital harmony." },
  { q: "What are planetary doshas in Astrology?", a: "Planetary doshas are unfavorable planetary combinations that may create obstacles in health, marriage, finances, or career." },
  { q: "Can gemstones strengthen weak planets?", a: "Yes, astrologers often recommend gemstones to balance and strengthen beneficial planetary energies." },
  { q: "What is the role of Saturn in Astrology?", a: "Saturn represents discipline, karma, hard work, delays, and long-term success through patience and persistence." },
  { q: "Is Astrology scientifically proven?", a: "Astrology is considered a spiritual and predictive science followed for centuries, though scientific opinions on it vary." }
];

const NUMEROLOGY_FAQS = [
  { q: "What is Numerology?", a: "Numerology is the study of numbers and their influence on a person’s life, personality, destiny, and future." },
  { q: "How is a Life Path Number calculated?", a: "The Life Path Number is calculated by adding the digits of your complete birth date until a single digit or master number is obtained." },
  { q: "What do master numbers mean in Numerology?", a: "Master numbers like 11, 22, and 33 carry higher spiritual energy and indicate strong potential and unique life missions." },
  { q: "Can Numerology predict career success?", a: "Numerology can indicate suitable career paths, leadership qualities, and financial opportunities based on personal numbers." },
  { q: "How does Numerology affect relationships?", a: "Numerology helps determine compatibility, emotional understanding, and relationship strengths between individuals." },
  { q: "What is the Destiny Number in Numerology?", a: "The Destiny Number is derived from your full birth name and reflects your life goals, talents, and purpose." },
  { q: "Can changing a name improve Numerology?", a: "Yes, many numerologists suggest name corrections to improve positive vibrations and reduce obstacles." },
  { q: "Which number is considered lucky in Numerology?", a: "Every number has unique energies, but lucky numbers vary depending on an individual’s birth chart and numerology profile." },
  { q: "How accurate is Numerology?", a: "Numerology provides guidance based on number vibrations and is widely used for personal growth and decision-making." },
  { q: "Can Numerology help in business success?", a: "Yes, numerology is often used to select business names, launch dates, and favorable numbers for growth and prosperity." }
];

const VASTU_FAQS = [
  { q: "What is Vastu Shastra?", a: "Vastu Shastra is an ancient Indian architectural science that balances natural energies in homes and workplaces." },
  { q: "Why is Vastu important for homes?", a: "Proper Vastu creates harmony, positivity, prosperity, good health, and peaceful relationships within the home." },
  { q: "Which direction is best for the main entrance?", a: "North, east, and northeast directions are generally considered highly auspicious for the main entrance." },
  { q: "Can Vastu defects affect finances?", a: "Yes, major Vastu imbalances may create financial instability, stress, and obstacles in growth." },
  { q: "Which direction is ideal for the kitchen?", a: "The southeast direction is considered best for kitchens according to Vastu principles." },
  { q: "Where should the bedroom be located as per Vastu?", a: "The southwest direction is usually recommended for the master bedroom to ensure stability and peace." },
  { q: "Can Vastu improve business growth?", a: "A Vastu-compliant office or shop can enhance productivity, customer attraction, and financial success." },
  { q: "What are the five elements in Vastu?", a: "The five elements are Earth, Water, Fire, Air, and Space, which must remain balanced for positive energy flow." },
  { q: "Are Vastu remedies effective without reconstruction?", a: "Yes, many simple Vastu remedies can reduce negative energy without major structural changes." },
  { q: "Is Vastu applicable to apartments?", a: "Yes, Vastu principles can be applied to apartments, flats, offices, and commercial spaces." }
];

const LAL_KITAB_FAQS = [
  { q: "What is Lal Kitab?", a: "Lal Kitab is a unique system of astrology known for its practical remedies and simplified horoscope analysis." },
  { q: "How is Lal Kitab different from traditional Astrology?", a: "Lal Kitab focuses on easy remedies and karmic influences rather than complex astrological calculations." },
  { q: "Are Lal Kitab remedies easy to perform?", a: "Yes, Lal Kitab remedies are simple, affordable, and designed for everyday people." },
  { q: "Can Lal Kitab remedies remove planetary doshas?", a: "Lal Kitab remedies are believed to reduce negative planetary effects and improve life conditions." },
  { q: "What types of remedies are suggested in Lal Kitab?", a: "Common remedies include donations, feeding animals, wearing specific items, and following lifestyle practices." },
  { q: "Is Lal Kitab useful for financial problems?", a: "Yes, many people consult Lal Kitab for remedies related to debt, financial instability, and business growth." },
  { q: "Can Lal Kitab help in marriage problems?", a: "Lal Kitab remedies are often recommended to improve relationships, reduce conflicts, and bring harmony in married life." },
  { q: "Is birth time necessary for Lal Kitab analysis?", a: "Accurate birth details improve the analysis, but some Lal Kitab methods can still work with limited information." },
  { q: "How long do Lal Kitab remedies take to show results?", a: "Results vary depending on the individual’s horoscope, karma, and consistency in following remedies." },
  { q: "Can Lal Kitab remedies be done at home?", a: "Yes, most Lal Kitab remedies are simple enough to be performed at home without elaborate rituals." }
];

export default function FaqPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-bg-void selection:bg-gold-100 selection:text-copper-800">
      <Navbar />
      
      <div className="pt-24 lg:pt-32 flex-1 pb-16 max-w-[800px] mx-auto px-sp-5 w-full">
        <header className="text-center mb-12">
          <span className="eyebrow text-gold-500 tracking-[0.2em] uppercase text-xs">Knowledge Base</span>
          <h1 className="font-display mt-sp-3 text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary">
            Frequently Asked Questions
          </h1>
          <p className="mt-sp-2 text-sm text-text-secondary max-w-[540px] mx-auto font-sans leading-relaxed">
            Find answers to commonly asked questions about Vedic Astrology, Numerology, Vastu Shastra, and Lal Kitab.
          </p>
        </header>

        <div className="space-y-16">
          {/* Astrology Section */}
          <section id="astrology-faqs" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-6 border-b border-gold-400/20 pb-2">
              Astrology FAQs
            </h2>
            <Accordion items={ASTROLOGY_FAQS} />
            <div className="mt-6 bg-bg-cosmos border border-gold-400/10 p-5 rounded-card shadow-sm font-sans text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary block font-display text-base mb-2">Conclusion – Astrology</strong>
              Astrology is a timeless science that helps individuals understand their life path, personality, relationships, and future possibilities. Through detailed horoscope analysis and planetary guidance, astrology provides clarity and direction for making better life decisions. Whether seeking solutions for career, marriage, finances, or health, astrology continues to guide millions toward a balanced and meaningful life.
            </div>
          </section>

          {/* Numerology Section */}
          <section id="numerology-faqs" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-6 border-b border-gold-400/20 pb-2">
              Numerology FAQs
            </h2>
            <Accordion items={NUMEROLOGY_FAQS} />
            <div className="mt-6 bg-bg-cosmos border border-gold-400/10 p-5 rounded-card shadow-sm font-sans text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary block font-display text-base mb-2">Conclusion – Numerology</strong>
              Numerology is a powerful metaphysical science that reveals hidden insights through numbers connected to your birth date and name. It helps individuals understand their strengths, challenges, and life purpose while guiding important decisions related to career, relationships, and finances. By aligning with positive number vibrations, numerology can support personal growth, success, and harmony in life.
            </div>
          </section>

          {/* Vastu Section */}
          <section id="vastu-faqs" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-6 border-b border-gold-400/20 pb-2">
              Vastu Shastra FAQs
            </h2>
            <Accordion items={VASTU_FAQS} />
            <div className="mt-6 bg-bg-cosmos border border-gold-400/10 p-5 rounded-card shadow-sm font-sans text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary block font-display text-base mb-2">Conclusion – Vastu Shastra</strong>
              Vastu Shastra is a valuable ancient science that promotes balance and positive energy in living and working spaces. By aligning structures with natural elements and directions, Vastu helps improve health, wealth, peace, and overall well-being. Whether for homes, offices, or businesses, proper Vastu planning can create an environment that supports success and happiness.
            </div>
          </section>

          {/* Lal Kitab Section */}
          <section id="lal-kitab-faqs" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-6 border-b border-gold-400/20 pb-2">
              Lal Kitab FAQs
            </h2>
            <Accordion items={LAL_KITAB_FAQS} />
            <div className="mt-6 bg-bg-cosmos border border-gold-400/10 p-5 rounded-card shadow-sm font-sans text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary block font-display text-base mb-2">Conclusion – Lal Kitab</strong>
              Lal Kitab is a practical and highly respected branch of astrology that offers simple remedies for complex life problems. Its unique approach focuses on balancing planetary energies through easy actions and behavioral changes. Whether dealing with career struggles, financial issues, health concerns, or relationship challenges, Lal Kitab provides accessible solutions that aim to bring positivity, stability, and success into life.
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

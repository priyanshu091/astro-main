import SectionHeader from "@/components/shared/SectionHeader";
import Accordion, { type AccordionItem } from "@/components/ui/Accordion";

const FAQS: AccordionItem[] = [
  {
    q: "How accurate is Vedic astrology?",
    a: "Vedic astrology is an interpretive tradition, not a guarantee of outcomes. A good reading gives you a structured way to think about timing, tendencies, and decisions — grounded in your exact birth chart. We're honest about what it can and can't tell you, and we never trade in fear or certainty about the future.",
  },
  {
    q: "What do I need for a consultation?",
    a: "Three things: your date of birth, your time of birth (as precise as possible), and your place of birth. Birth time matters most — even a few minutes changes house placements — so check a birth certificate or hospital record if you can.",
  },
  {
    q: "How are your astrologers certified?",
    a: "Every astrologer on the platform is vetted for formal training in their tradition (Parashari, KP, or Nadi), a minimum of several years of consulting experience, and verified client reviews. We onboard a small, curated panel rather than listing hundreds of profiles.",
  },
  {
    q: "Is my birth data private?",
    a: "Yes. Your birth details are encrypted and used only to generate your chart and brief your astrologer. We never sell or share your data, and you can request its deletion at any time.",
  },
  {
    q: "Can I reschedule or cancel?",
    a: "You can reschedule or cancel up to 12 hours before your session at no charge. Cancellations inside that window are eligible for a partial credit toward a future booking.",
  },
  {
    q: "What's the difference between D1 and D9 charts?",
    a: "The D1 (Rashi) chart is your main birth chart — the broad picture of your life. The D9 (Navamsa) is a divisional chart traditionally read for marriage, dharma, and the deeper strength of each planet. A full consultation reads both together for a more complete view.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-bg-void">
      <div className="mx-auto max-w-[720px] px-sp-5 py-sp-10 lg:py-sp-16">
        <SectionHeader eyebrow="FAQ" title="Common questions" align="center" />
        <div className="mt-sp-8 lg:mt-sp-10">
          <Accordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type Astrologer = {
  name: string;
  photo: string;
  specialization: string;
  experience: string;
  rating: string;
  languages: string[];
  price: string;
};

const ASTROLOGERS: Astrologer[] = [
  {
    name: "Acharya Vikram Sharma",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    specialization: "KP Astrology · Career & Finance",
    experience: "12 years · 800+ consultations",
    rating: "4.9★",
    languages: ["Hindi", "English", "Marathi"],
    price: "₹1,999",
  },
  {
    name: "Dr. Meera Iyer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    specialization: "Vedic & Nadi · Marriage & Family",
    experience: "15 years · 1,200+ consultations",
    rating: "4.9★",
    languages: ["English", "Hindi", "Tamil"],
    price: "₹2,499",
  },
  {
    name: "Pandit Raghav Joshi",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    specialization: "Parashari · Remedies & Muhurta",
    experience: "9 years · 600+ consultations",
    rating: "4.8★",
    languages: ["Hindi", "English", "Gujarati"],
    price: "₹1,799",
  },
];

export default function AstrologerProfiles() {
  return (
    <section id="astrologers" className="bg-bg-void">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <SectionHeader
          eyebrow="Our astrologers"
          title="Consult with certified Vedic experts"
        />

        <StaggerReveal
          stagger={0.1}
          amount={0.2}
          className="mt-sp-8 flex snap-x snap-mandatory gap-sp-5 overflow-x-auto pb-2 lg:mt-sp-10 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {ASTROLOGERS.map((a) => (
            <StaggerItem
              key={a.name}
              className="min-w-[80%] shrink-0 snap-start sm:min-w-[320px] lg:min-w-0 lg:shrink"
            >
              <Card interactive className="flex h-full flex-col items-center p-7 text-center">
                {/* Photo with gold ring */}
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-gold-400">
                  <Image
                    src={a.photo}
                    alt={`Portrait of ${a.name}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-sp-4 font-sans text-lg font-semibold text-text-primary">
                  {a.name}
                </h3>
                <p className="mt-sp-1 font-sans text-sm text-gold-200">
                  {a.specialization}
                </p>
                <p className="mt-sp-2 font-sans text-[13px] text-text-muted">
                  {a.experience}
                </p>
                <p className="mt-sp-1 font-sans text-[13px] font-medium text-saffron-400">
                  {a.rating}
                </p>

                {/* Language pills */}
                <ul className="mt-sp-4 flex flex-wrap justify-center gap-sp-2">
                  {a.languages.map((lang) => (
                    <li
                      key={lang}
                      className="rounded-full bg-bg-surface px-2.5 py-1 font-sans text-[11px] text-text-secondary"
                    >
                      {lang}
                    </li>
                  ))}
                </ul>

                <div className="mt-sp-5 w-full">
                  <Button
                    as="a"
                    href="#pricing"
                    variant="secondary"
                    size="md"
                    className="w-full !text-[13px]"
                  >
                    Book session · {a.price}
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

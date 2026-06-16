"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import bannerKundli from "@/public/banner_kundli.png";
import bannerVastu from "@/public/banner_vastu.png";
import bannerProblem from "@/public/banner_problem.png";

const BANNERS = [
  {
    title: "Know Your Kundli",
    image: bannerKundli,
    href: "#contact",
    alt: "Know Your Kundli - Get insights about your future, career, love and more.",
  },
  {
    title: "Know Your Vastu",
    image: bannerVastu,
    alt: "Premium Vastu Consultation - Align your space with positive energy and prosperity.",
    href: "#contact",
  },
  {
    title: "Problem Detection",
    image: bannerProblem,
    alt: "Problem Detection - Identify hidden challenges and find the right solutions.",
    href: "#contact",
  },
];

export default function PromotionalBanners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    }, 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isHovered, currentIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + BANNERS.length) % BANNERS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <section className="w-full bg-bg-void pt-[72px] md:pt-[88px]">
      {/* Locked aspect ratio matching the exact proportions of the new banner assets (1024x344) */}
      <div 
        className="relative w-full aspect-[1024/344] overflow-hidden bg-bg-cosmos shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides Container */}
        <div className="relative w-full h-full">
          <AnimatePresence initial={false}>
            <motion.a
              key={currentIndex}
              href={BANNERS[currentIndex].href}
              className="absolute inset-0 block w-full h-full cursor-pointer overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Banner Image */}
              <Image
                src={BANNERS[currentIndex].image}
                alt={BANNERS[currentIndex].alt}
                fill
                sizes="100vw"
                priority
                unoptimized
                className="object-cover transition-transform duration-700 hover:scale-[1.01]"
              />
              
              {/* Accessibility label */}
              <span className="sr-only">{BANNERS[currentIndex].title}</span>
            </motion.a>
          </AnimatePresence>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full border border-gold-400/25 bg-bg-void/80 text-text-primary hover:bg-gold-500 hover:text-text-on-gold hover:border-gold-500 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center z-20 cursor-pointer group"
          aria-label="Previous Slide"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full border border-gold-400/25 bg-bg-void/80 text-text-primary hover:bg-gold-500 hover:text-text-on-gold hover:border-gold-500 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center z-20 cursor-pointer group"
          aria-label="Next Slide"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom Dot Indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => handleDotClick(idx, e)}
              className={`transition-all duration-300 rounded-full cursor-pointer h-2.5 ${
                currentIndex === idx 
                  ? "w-8 bg-gold-500" 
                  : "w-2.5 bg-gold-400/50 hover:bg-gold-400/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

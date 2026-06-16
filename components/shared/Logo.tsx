import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center ${className}`} aria-label="Vedic Destiny — home">
      <Image
        src="/logo.png"
        alt="Vedic Destiny"
        width={130}
        height={80}
        className="h-11 w-auto object-contain transition-opacity duration-200 hover:opacity-90"
        priority
      />
    </a>
  );
}

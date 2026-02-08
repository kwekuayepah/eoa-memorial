"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Floral ornament SVG component
function FloralOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      opacity="0.15"
    >
      <path
        d="M60 20C50 20 40 25 35 35C30 45 30 55 35 65C40 75 50 80 60 80C70 80 80 75 85 65C90 55 90 45 85 35C80 25 70 20 60 20Z"
        fill="#D4736C"
      />
      <path
        d="M30 50C25 50 20 52 18 55C16 58 16 62 18 65C20 68 25 70 30 70C35 70 40 68 42 65C44 62 44 58 42 55C40 52 35 50 30 50Z"
        fill="#E8B4B0"
      />
      <path
        d="M90 50C85 50 80 52 78 55C76 58 76 62 78 65C80 68 85 70 90 70C95 70 100 68 102 65C104 62 104 58 102 55C100 52 95 50 90 50Z"
        fill="#E8B4B0"
      />
      <path
        d="M60 90C55 90 50 92 48 95C46 98 46 102 48 105C50 108 55 110 60 110C65 110 70 108 72 105C74 102 74 98 72 95C70 92 65 90 60 90Z"
        fill="#B83A3A"
      />
    </svg>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-4 pt-16">
      {/* Floral ornaments */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0">
          <FloralOrnament />
        </div>
        <div className="absolute bottom-0 right-0 rotate-180">
          <FloralOrnament />
        </div>
      </div>

      {/* Gold lines flanking content */}
      <div className="absolute left-1/2 top-1/2 hidden w-full -translate-x-1/2 -translate-y-1/2 md:block">
        <div className="container mx-auto">
          <div className="absolute left-0 top-1/2 h-px w-1/4 -translate-y-1/2 bg-gold-muted" />
          <div className="absolute right-0 top-1/2 h-px w-1/4 -translate-y-1/2 bg-gold-muted" />
        </div>
      </div>

      <motion.div
        variants={prefersReducedMotion ? {} : staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 flex flex-col items-center space-y-8 text-center"
      >
        {/* Celebration of Life label */}
        <motion.p
          variants={prefersReducedMotion ? {} : fadeUp}
          className="font-sans text-sm font-medium uppercase tracking-widest text-gold"
        >
          Celebration of Life
        </motion.p>

        {/* Portrait */}
        <motion.div
          variants={prefersReducedMotion ? {} : fadeUp}
          className="relative"
        >
          <div className="relative h-[220px] w-[220px] overflow-hidden rounded-full border-4 border-gold shadow-lg md:h-[300px] md:w-[300px]">
            <Image
              src={siteConfig.heroImage}
              alt={siteConfig.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={prefersReducedMotion ? {} : fadeUp}
          className="font-serif text-5xl font-bold text-text md:text-7xl"
        >
          {siteConfig.name}
        </motion.h1>

        {/* Dates */}
        <motion.p
          variants={prefersReducedMotion ? {} : fadeUp}
          className="font-sans text-lg text-text-muted"
        >
          {siteConfig.birthDateDisplay} — {siteConfig.deathDateDisplay}
        </motion.p>

        {/* Scripture */}
        <motion.div
          variants={prefersReducedMotion ? {} : fadeUp}
          className="max-w-2xl"
        >
          <blockquote className="font-serif text-base italic text-text-muted md:text-lg">
            "{siteConfig.scripture.text}"
          </blockquote>
          <cite className="mt-2 block font-sans text-sm not-italic text-text-light">
            — {siteConfig.scripture.reference}
          </cite>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2 text-text-light"
        >
          <span className="font-sans text-xs uppercase tracking-wider">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

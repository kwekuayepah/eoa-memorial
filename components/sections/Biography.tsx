"use client";

import {
  Leaf,
  Cross,
  Briefcase,
  GraduationCap,
  Heart,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { biography } from "@/lib/data/biography";
import type { BiographyEntry } from "@/lib/data/biography";

// Icon map for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Leaf,
  Cross,
  Briefcase,
  GraduationCap,
  Heart,
};

// Helper to get icon component dynamically
function getIcon(iconName: string) {
  return iconMap[iconName] || Heart;
}

function BiographyCard({
  entry,
  index,
  isEven,
}: {
  entry: BiographyEntry;
  index: number;
  isEven: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = getIcon(entry.icon);

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex gap-6 md:gap-8 ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Timeline dot and line */}
      <div className="relative flex flex-col items-center">
        <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-gold bg-bg shadow-sm">
          <Icon className="h-6 w-6 text-gold" />
        </div>
        {index < biography.length - 1 && (
          <div className="absolute top-12 h-full w-0.5 bg-gold-muted" />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 rounded-lg border-l-4 border-gold bg-bg-card p-6 shadow-sm">
        <h3 className="mb-3 font-serif text-xl font-semibold text-text dark:text-gold md:text-2xl">
          {entry.title}
        </h3>
        <p className="font-sans text-base leading-relaxed text-text-muted">
          {entry.content}
        </p>
      </div>
    </motion.div>
  );
}

export function Biography() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="biography" className="bg-bg-alt py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="A Life Well Lived"
            subtitle="Celebrating the journey of a beloved husband, father, grandfather, son, and brother"
          />

          <div className="space-y-8">
            {biography.map((entry, index) => (
              <BiographyCard
                key={entry.title}
                entry={entry}
                index={index}
                isEven={index % 2 === 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

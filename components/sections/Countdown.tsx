"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft | null {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

function CountdownBox({ label, value }: { label: string; value: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      key={value}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-gold bg-bg-card font-serif text-2xl font-bold text-gold md:h-20 md:w-20 md:text-3xl">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="mt-2 font-sans text-xs uppercase tracking-wider text-text-muted">
        {label}
      </span>
    </motion.div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [hasPassed, setHasPassed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Calculate initial time on client only
    const initialTimeLeft = calculateTimeLeft(siteConfig.serviceDate);
    if (initialTimeLeft === null) {
      setHasPassed(true);
    } else {
      setTimeLeft(initialTimeLeft);
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(siteConfig.serviceDate);
      if (newTimeLeft === null) {
        setHasPassed(true);
        setTimeLeft(null);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (hasPassed) {
    return (
      <section
        id="countdown"
        className="bg-bg-alt py-16 px-4"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-semibold text-text dark:text-gold md:text-4xl">
              The service has been held
            </h2>
            <p className="mt-4 font-sans text-base text-text-muted">
              Watch the recording below to pay your respects.
            </p>
            <a
              href={siteConfig.livestreamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-md bg-gold px-6 py-3 font-sans font-medium text-white transition-colors hover:bg-gold-dark"
            >
              Watch Recording
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  // Show placeholder during SSR to prevent hydration mismatch
  if (!mounted || !timeLeft) {
    return (
      <section id="countdown" className="bg-bg-alt py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-semibold text-text dark:text-gold md:text-4xl">
              Service Countdown
            </h2>
            <p className="mt-2 font-sans text-base text-text-muted">
              {siteConfig.serviceDateDisplay}
            </p>
            {/* Placeholder boxes */}
            <div className="mt-8 flex justify-center gap-4 md:gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-gold bg-bg-card font-serif text-2xl font-bold text-gold md:h-20 md:w-20 md:text-3xl">
                  --
                </div>
                <span className="mt-2 font-sans text-xs uppercase tracking-wider text-text-muted">
                  Days
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-gold bg-bg-card font-serif text-2xl font-bold text-gold md:h-20 md:w-20 md:text-3xl">
                  --
                </div>
                <span className="mt-2 font-sans text-xs uppercase tracking-wider text-text-muted">
                  Hours
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-gold bg-bg-card font-serif text-2xl font-bold text-gold md:h-20 md:w-20 md:text-3xl">
                  --
                </div>
                <span className="mt-2 font-sans text-xs uppercase tracking-wider text-text-muted">
                  Minutes
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-gold bg-bg-card font-serif text-2xl font-bold text-gold md:h-20 md:w-20 md:text-3xl">
                  --
                </div>
                <span className="mt-2 font-sans text-xs uppercase tracking-wider text-text-muted">
                  Seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="countdown" className="bg-bg-alt py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-semibold text-text dark:text-gold md:text-4xl">
            Service Countdown
          </h2>
          <p className="mt-2 font-sans text-base text-text-muted">
            {siteConfig.serviceDateDisplay}
          </p>

          {/* Countdown boxes */}
          <div className="mt-8 flex justify-center gap-4 md:gap-6">
            <CountdownBox label="Days" value={timeLeft.days} />
            <CountdownBox label="Hours" value={timeLeft.hours} />
            <CountdownBox label="Minutes" value={timeLeft.minutes} />
            <CountdownBox label="Seconds" value={timeLeft.seconds} />
          </div>

          {/* Venue info card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 rounded-lg border border-border-gold bg-bg-card p-6 text-left shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-gold" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-semibold text-text dark:text-gold">
                  {siteConfig.venue.name}
                </h3>
                <p className="mt-1 font-sans text-base text-text-muted">
                  {siteConfig.venue.address}
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm text-text-light">
                  <Calendar className="h-4 w-4" />
                  <span>{siteConfig.serviceDateDisplay}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

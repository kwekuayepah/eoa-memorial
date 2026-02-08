"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Order of Service", href: "#service" },
  { label: "Life & Legacy", href: "#biography" },
  { label: "Gallery", href: "#gallery" },
  { label: "Share a Tribute", href: "#tributes" },
] as const;

const modalLinks = [
  { label: "Directions", action: "directions" },
  { label: "Watch Live", action: "livestream" },
] as const;

interface NavbarProps {
  onDirectionsClick?: () => void;
  onLivestreamClick?: () => void;
}

export function Navbar({
  onDirectionsClick,
  onLivestreamClick,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-100px 0px -66%",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleModalClick = (action: string) => {
    if (action === "directions" && onDirectionsClick) {
      onDirectionsClick();
    } else if (action === "livestream" && onLivestreamClick) {
      onLivestreamClick();
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-bg-card dark:bg-bg-card border-b border-border dark:border-border shadow-sm"
          : "bg-transparent dark:bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:h-16 md:items-center md:justify-between">

          {/* Mobile Top Row: Theme Toggle (Right) */}
          <div className="flex h-16 items-center justify-between md:hidden">
            <div /> {/* Spacer */}
            <ThemeToggle />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={cn(
                  "font-sans text-sm font-medium transition-colors hover:text-gold",
                  activeSection === link.href.slice(1)
                    ? "text-gold"
                    : "text-text-muted"
                )}
              >
                {link.label}
              </button>
            ))}
            {modalLinks.map((link) => (
              <button
                key={link.action}
                onClick={() => handleModalClick(link.action)}
                className="font-sans text-sm font-medium text-text-muted transition-colors hover:text-gold"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Navigation (Exposed Scrollable Row) */}
          <div className="flex w-full items-center gap-6 overflow-x-auto pb-4 md:hidden no-scrollbar">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={cn(
                  "whitespace-nowrap font-sans text-sm font-medium transition-colors hover:text-gold",
                  activeSection === link.href.slice(1)
                    ? "text-gold"
                    : "text-text-muted"
                )}
              >
                {link.label}
              </button>
            ))}
            {modalLinks.map((link) => (
              <button
                key={link.action}
                onClick={() => handleModalClick(link.action)}
                className="whitespace-nowrap font-sans text-sm font-medium text-text-muted transition-colors hover:text-gold"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

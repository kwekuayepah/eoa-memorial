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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
    setIsMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleModalClick = (action: string) => {
    setIsMobileOpen(false);
    if (action === "directions" && onDirectionsClick) {
      onDirectionsClick();
    } else if (action === "livestream" && onLivestreamClick) {
      onLivestreamClick();
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-bg-card dark:bg-bg-card border-b border-border dark:border-border shadow-sm"
            : "bg-transparent dark:bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Menu Button (Left) */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <X className="h-6 w-6 text-text" />
              ) : (
                <Menu className="h-6 w-6 text-text" />
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8">
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
              <ThemeToggle />
            </div>

            {/* Mobile Theme Toggle (Right) */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-64 bg-bg-card border-l border-border shadow-xl md:hidden"
            >
              <div className="flex h-16 items-center justify-end px-4 border-b border-border">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-text" />
                </button>
              </div>
              <div className="flex flex-col gap-4 p-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={cn(
                      "text-left font-sans text-base font-medium transition-colors hover:text-gold border-l-4 pl-4 py-2",
                      activeSection === link.href.slice(1)
                        ? "text-gold border-gold"
                        : "text-text-muted border-transparent"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
                {modalLinks.map((link) => (
                  <button
                    key={link.action}
                    onClick={() => handleModalClick(link.action)}
                    className="text-left font-sans text-base font-medium text-text-muted transition-colors hover:text-gold border-l-4 border-transparent pl-4 py-2"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

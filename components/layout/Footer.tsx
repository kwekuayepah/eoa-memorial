import { siteConfig } from "@/lib/data/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-alt py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="font-serif text-2xl font-semibold text-text">
          Forever in our hearts
        </p>
        <p className="mt-2 font-serif text-xl text-gold">
          {siteConfig.name}
        </p>
        <p className="mt-2 font-sans text-sm text-text-muted">
          {siteConfig.birthDateDisplay} — {siteConfig.deathDateDisplay}
        </p>
        <p className="mt-4 font-serif text-sm italic text-text-light">
          &ldquo;{siteConfig.scripture.reference}&rdquo;
        </p>
      </div>
    </footer>
  );
}

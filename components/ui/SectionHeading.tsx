import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn("mb-12", { "text-center": align === "center" }, className)}
      {...props}
    >
      <h2 className="font-serif text-3xl font-semibold text-text dark:text-gold md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-sans text-base text-text-muted md:text-lg">
          {subtitle}
        </p>
      )}
      {/* Gold ornamental divider */}
      <div className="mt-6 flex items-center justify-center">
        <div className="h-px flex-1 bg-border-gold" />
        <div className="mx-3 h-2 w-2 rotate-45 bg-gold" />
        <div className="h-px flex-1 bg-border-gold" />
      </div>
    </div>
  );
}

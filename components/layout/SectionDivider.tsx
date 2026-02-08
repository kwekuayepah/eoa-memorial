import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SectionDividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "ornamental";
}

export function SectionDivider({
  className,
  variant = "ornamental",
  ...props
}: SectionDividerProps) {
  if (variant === "ornamental") {
    return (
      <div className={cn("my-16 flex items-center justify-center", className)} {...props}>
        <div className="h-px flex-1 bg-border-gold" />
        <div className="mx-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gold"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="h-px flex-1 bg-border-gold" />
      </div>
    );
  }

  return (
    <div className={cn("my-12 h-px bg-border", className)} {...props} />
  );
}

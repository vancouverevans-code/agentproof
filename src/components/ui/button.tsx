import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "quiet";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  primary: "bg-brass text-ink hover:bg-brass-bright",
  ghost: "border border-line bg-transparent text-paper hover:border-brass",
  quiet: "bg-inset text-paper hover:bg-line",
};

export function Button({ variant = "primary", className, type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export const fieldClass =
  "w-full rounded-lg border border-line bg-inset px-3 py-3 text-base text-paper placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass";

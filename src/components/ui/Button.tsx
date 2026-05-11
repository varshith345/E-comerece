import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly icon?: ReactNode;
  readonly trailing?: ReactNode;
  readonly fullWidth?: boolean;
}

const VARIANTS: Readonly<Record<ButtonVariant, string>> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

const SIZES: Readonly<Record<ButtonSize, string>> = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-14 px-8 text-[13px]",
};

export const Button = ({
  variant = "primary",
  size = "md",
  icon,
  trailing,
  fullWidth = false,
  className,
  type = "button",
  children,
  ...props
}: ButtonProps): JSX.Element => (
  <button
    type={type}
    className={cn(VARIANTS[variant], SIZES[size], fullWidth && "w-full", className)}
    {...props}
  >
    {icon ? <span aria-hidden>{icon}</span> : null}
    <span>{children}</span>
    {trailing ? <span aria-hidden>{trailing}</span> : null}
  </button>
);

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "light" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  ariaLabel?: string;
};

const variantClasses = {
  primary:
    "border-[#f28c28] bg-[#f28c28] text-[#182b3b] shadow-[0_8px_24px_rgba(242,140,40,0.2)] hover:border-[#de7815] hover:bg-[#de7815]",
  secondary:
    "border-[#123b5d] bg-[#123b5d] text-white shadow-[0_8px_24px_rgba(18,59,93,0.16)] hover:border-[#176b9c] hover:bg-[#176b9c]",
  outline:
    "border-slate-300 bg-white text-[#123b5d] hover:border-[#176b9c] hover:bg-sky-50",
  light:
    "border-white bg-white text-[#123b5d] shadow-[0_8px_24px_rgba(0,0,0,0.14)] hover:border-sky-50 hover:bg-sky-50",
  ghost:
    "border-transparent bg-transparent text-[#176b9c] hover:border-sky-100 hover:bg-sky-50",
};

const sizeClasses = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-6 py-3 text-[0.95rem]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  leadingIcon,
  trailingIcon,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-[10px] border font-bold leading-none transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b9c] focus-visible:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  const content = (
    <>
      {leadingIcon ? <span aria-hidden="true">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span aria-hidden="true">{trailingIcon}</span> : null}
    </>
  );

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a className={classes} href={href} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

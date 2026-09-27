import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "blue" | "orange" | "green" | "neutral" | "navy";
  className?: string;
};

const toneClasses = {
  blue: "border-sky-200 bg-sky-50 text-[#176b9c]",
  orange: "border-orange-200 bg-orange-50 text-orange-800",
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  neutral: "border-slate-200 bg-slate-50 text-slate-600",
  navy: "border-[#123b5d]/15 bg-[#123b5d]/[0.06] text-[#123b5d]",
};

export function Badge({ children, tone = "blue", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.69rem] font-bold uppercase tracking-[0.09em] ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

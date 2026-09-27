import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: ReactNode;
  className?: string;
  headingId?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  action,
  className = "",
  headingId,
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${
        action ? "md:flex md:max-w-none md:items-end md:justify-between md:gap-10" : ""
      } ${className}`}
    >
      <div className={action ? "max-w-3xl" : ""}>
        {eyebrow ? (
          <p
            className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${
              dark ? "text-[#8fd4f4]" : "text-[#176b9c]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`mr-2 inline-block h-px w-7 align-middle ${dark ? "bg-[#f28c28]" : "bg-[#f28c28]"}`}
            />
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className={`text-balance text-3xl font-bold leading-[1.16] tracking-[-0.03em] sm:text-4xl lg:text-[2.65rem] ${
            dark ? "text-white" : "text-[#123b5d]"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-4 text-base leading-7 sm:text-lg ${
              dark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="mt-6 shrink-0 md:mt-0">{action}</div> : null}
    </div>
  );
}

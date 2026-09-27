"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { localeHref } from "./routing";

export interface MobileNavItem {
  label: string;
  href: string;
  external?: boolean;
}

export type MobileMenuAction = MobileNavItem;

export interface MobileMenuProps {
  locale: string;
  items: readonly MobileNavItem[];
  menuLabel?: string;
  closeLabel?: string;
  navigationLabel?: string;
  cta?: MobileMenuAction;
  supportedLocales?: readonly string[];
  className?: string;
}

export function MobileMenu({
  locale,
  items,
  menuLabel = "Open navigation menu",
  closeLabel = "Close navigation menu",
  navigationLabel = "Mobile navigation",
  cta,
  supportedLocales,
  className = "",
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const dialogId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function closeMenu(restoreFocus = true) {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLElement>(
          "button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        )
        ?.focus();
    });

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
    }

    const desktopViewport = window.matchMedia("(min-width: 1024px)");
    function onViewportChange(event: MediaQueryListEvent) {
      if (!event.matches) return;
      setOpen(false);
      window.requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>('nav[aria-label="Primary navigation"] a')
          ?.focus();
      });
    }

    document.addEventListener("keydown", onKeyDown);
    desktopViewport.addEventListener("change", onViewportChange);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktopViewport.removeEventListener("change", onViewportChange);
    };
  }, [open]);

  function trapFocus(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])",
      ) ?? [],
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const resolveHref = (item: MobileNavItem) =>
    item.external
      ? item.href
      : localeHref(item.href, locale, supportedLocales);

  return (
    <div className={`lg:hidden ${className}`}>
      <button
        aria-controls={dialogId}
        aria-expanded={open}
        aria-label={open ? closeLabel : menuLabel}
        className="inline-flex size-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#123B5D] transition hover:border-[#176B9C] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2"
        onClick={() => setOpen((current) => !current)}
        ref={triggerRef}
        type="button"
      >
        {open ? (
          <X aria-hidden="true" className="size-6" />
        ) : (
          <Menu aria-hidden="true" className="size-6" />
        )}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            aria-label={closeLabel}
            className="absolute inset-0 bg-[#0B2940]/65 backdrop-blur-[2px]"
            onClick={() => closeMenu()}
            tabIndex={-1}
            type="button"
          />
          <div
            aria-label={navigationLabel}
            aria-modal="true"
            className="absolute inset-y-0 right-0 flex w-[min(88vw,24rem)] flex-col bg-white shadow-2xl"
            id={dialogId}
            onKeyDown={trapFocus}
            ref={panelRef}
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#123B5D]">
                SIWA
              </span>
              <button
                aria-label={closeLabel}
                className="inline-flex size-11 items-center justify-center rounded-lg text-[#123B5D] transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C]"
                onClick={() => closeMenu()}
                type="button"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>

            <nav aria-label={navigationLabel} className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      className="group flex min-h-12 items-center justify-between rounded-lg px-4 py-3 font-semibold text-slate-700 transition hover:bg-[#176B9C]/8 hover:text-[#123B5D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C]"
                      href={resolveHref(item)}
                      onClick={() => closeMenu(false)}
                      rel={item.external ? "noreferrer" : undefined}
                      target={item.external ? "_blank" : undefined}
                    >
                      {item.label}
                      <ChevronRight
                        aria-hidden="true"
                        className="size-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#176B9C]"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {cta ? (
              <div className="border-t border-slate-200 p-4">
                <Link
                  className="flex min-h-12 items-center justify-center rounded-lg bg-[#F28C28] px-5 py-3 text-center font-bold text-[#102F47] transition hover:bg-[#E77E18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2"
                  href={resolveHref(cta)}
                  onClick={() => closeMenu(false)}
                  rel={cta.external ? "noreferrer" : undefined}
                  target={cta.external ? "_blank" : undefined}
                >
                  {cta.label}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

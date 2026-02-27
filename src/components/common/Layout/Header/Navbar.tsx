"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageDropdown from "../../Ui/GoogleTranslate";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="relative z-50 bg-linear-to-b from-[#0A0F1C] to-[#0A0F1C]/95">
      <nav className="max-w-7xl mx-auto px-6 py-5">
        <div className="grid w-full grid-cols-3 items-center md:flex md:items-center md:justify-between">
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden inline-flex items-center justify-start justify-self-start h-11 w-11 rounded-md ring-1 ring-white/10 hover:ring-white/20 transition"
          >
            <span className="sr-only">Open menu</span>
            <span className="flex flex-col gap-1.5 pl-3">
              <span className="block h-0.5 w-6 bg-[#D4AF6A]" />
              <span className="block h-0.5 w-6 bg-[#D4AF6A]" />
              <span className="block h-0.5 w-6 bg-[#D4AF6A]" />
            </span>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="group col-start-2 justify-self-center md:col-start-auto md:justify-self-start flex items-center gap-3"
          >
            <span className="relative flex items-center justify-center">
              <span className="relative flex items-center justify-center">
                <Image
                  src="/assets/images/logo.png"
                  alt="Paris Black Car logo"
                  width={120}
                  height={120}
                  priority
                  className=""
                />
              </span>
            </span>
            <span className="sr-only">Paris Black Car</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-10 text-lg tracking-wide relative">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className="relative px-2 py-1 text-[#D4AF6A] text-lg hover:text-[#E6C27A] transition"
                  >
                    {item.name}

                    {isActive && (
                      <motion.div
                        layoutId="navbar-underline"
                        className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#D4AF6A] shadow-[0_0_8px_rgba(212,175,106,0.7)]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="justify-self-end md:justify-self-auto">
            <LanguageDropdown />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              className="fixed left-0 top-0 bottom-0 w-[82vw] max-w-sm bg-[#070B14] md:hidden shadow-[24px_0_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="relative flex items-center justify-center h-10 w-10">
                    <span className="absolute inset-0 rounded-full bg-[#D4AF6A]/20 blur-md opacity-80" />
                    <span className="relative flex items-center justify-center h-10 w-10 rounded-full bg-[#0A0F1C] ring-1 ring-[#D4AF6A]/70 shadow-[0_0_22px_rgba(212,175,106,0.28)]">
                      <Image
                        src="/assets/images/logo.png"
                        alt="Paris Black Car logo"
                        width={36}
                        height={36}
                        className="drop-shadow-[0_0_10px_rgba(212,175,106,0.35)]"
                      />
                    </span>
                  </span>
                  <span className="text-white font-semibold tracking-wider">
                    Menu
                  </span>
                </div>

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-10 w-10 inline-flex items-center justify-center rounded-md ring-1 ring-white/10 hover:ring-white/20 transition"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <ul className="px-6 py-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href} className="border-b border-white/10">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={[
                          "block py-4 text-lg tracking-wide transition",
                          isActive
                            ? "text-[#D4AF6A]"
                            : "text-white/90 hover:text-white",
                        ].join(" ")}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

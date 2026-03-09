"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavLink } from "@/src/feature/page-editor/HeaderEditor/types/header.types";
import LanguageDropdown from "../../Ui/GoogleTranslate";

// React Icons
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

// --- 1. Define the Interface to fix the "any" error ---
interface FooterData {
  logoUrl?: string | null;
  logoAlt?: string | null;
  navLinks?: NavLink[] | unknown; // Matches your Prisma JSON structure
}

interface NavbarProps {
  footerData: FooterData | null;
}

export default function Navbar({ footerData }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // --- 2. Logic to parse the links safely ---
  const navLinks: NavLink[] =
    footerData && Array.isArray(footerData.navLinks)
      ? (footerData.navLinks as NavLink[])
      : [];

  const visibleLinks = navLinks.filter((link) => link.showInNav);

  const displayLogo = footerData?.logoUrl || "/assets/pc_logo_llp.png";
  const displayAlt = footerData?.logoAlt || "Paris Limo Logo";

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);
  const fallbackLogo = "/assets/mobile_logo_llp.png";

  const [logoSrc, setLogoSrc] = useState(displayLogo || fallbackLogo);

  return (
    <header className="relative z-[100] bg-[#0A0F1C] ">
      <nav className="max-w-7xl mx-auto px-4 py-4 md:px-6">
        {/* Main Navbar Row */}
        <div className="flex justify-between items-center gap-4">
          {/* 1. Hamburger (Left on mobile) */}
          <div className="flex-1 md:hidden">
            <button
              className="text-[#D4AF6A] p-2 transition-transform active:scale-90"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <IoClose size={32} /> : <HiMenuAlt3 size={32} />}
            </button>
          </div>
          {/* 2. Logo (Center on mobile, Left on desktop) */}
          <div className="flex-[2] md:flex-none flex justify-center  md:justify-start">
            <Link href="/" onClick={() => setIsOpen(false)}>
              {/* <Image
                src={displayLogo}
                alt={displayAlt}
                width={60}
                height={90}
                className="object-contain w-[70px] md:w-[90px]"
                priority
              /> */}
              <Image
                src={logoSrc}
                alt={displayAlt}
                width={60}
                height={90}
                className="object-contain w-[70px] md:w-[90px]"
                priority
                onError={() => setLogoSrc(fallbackLogo)}
              />
            </Link>
          </div>
          {/* 3. Desktop Navigation (Hidden on mobile) */}

          <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10">
            {visibleLinks.map((item) => (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className="text-[#D4AF6A] hover:text-[#E6C27A] transition-colors text-sm uppercase tracking-[0.2em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* 4. Language & Client Space (Right side) */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <LanguageDropdown />
          </div>
        </div>

        {/* --- Mobile Full-Screen Overlay --- */}
        <div
          className={`fixed inset-0 top-[80px] bg-[#0A0F1C] z-[90] transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
          } md:hidden`}
        >
          <ul className="flex flex-col items-center pt-10 gap-8">
            {visibleLinks.map((item) => (
              <li key={item.url} className="w-full text-center">
                <Link
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-[#D4AF6A] font-light uppercase tracking-[0.2em] block py-4 active:bg-white/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavLink } from "@/src/feature/page-editor/HeaderEditor/types/header.types";
import LanguageDropdown from "../../Ui/GoogleTranslate";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

interface FooterData {
  logoUrl?: string | null;
  mobileLogoUrl?: string | null; // Add this to your interface
  logoAlt?: string | null;
  navLinks?: NavLink[] | unknown;
}

interface NavbarProps {
  footerData: FooterData | null;
}

export default function Navbar({ footerData }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Fallbacks
  const desktopFallback = "/assets/bg-luxury-limo.png";
  const mobileFallback = "/assets/bgmobile_logo_llp.png";

  const navLinks: NavLink[] =
    footerData && Array.isArray(footerData.navLinks)
      ? (footerData.navLinks as NavLink[])
      : [];

  const visibleLinks = navLinks.filter((link) => link.showInNav);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <header className="relative z-[100] bg-[#0A0F1C]">
      <nav className="max-w-7xl mx-auto px-4 py-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Hamburger (Left on mobile only) */}
          <div className="md:hidden">
            <button
              className="text-[#D4AF6A] p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <IoClose size={32} /> : <HiMenuAlt3 size={32} />}
            </button>
          </div>

          {/* Logo Section - Far Left on Desktop */}
          <div className="flex justify-center md:justify-start">
            <Link href="/" onClick={() => setIsOpen(false)}>
              {/* Desktop Logo */}
              <div className="hidden md:block">
                <Image
                  src={footerData?.logoUrl || desktopFallback}
                  alt={footerData?.logoAlt || "Desktop Logo"}
                  width={150}
                  height={110}
                  className="object-contain pt-2 pb-2"
                  onError={(e) => {
                    e.currentTarget.src = desktopFallback;
                  }}
                />
              </div>
              {/* Mobile Logo */}
              <div className="md:hidden">
                <Image
                  src={
                    footerData?.mobileLogoUrl ||
                    footerData?.logoUrl ||
                    mobileFallback
                  }
                  alt={footerData?.logoAlt || "Mobile Logo"}
                  width={70}
                  height={70}
                  className="object-contain m-4"
                  onError={(e) => {
                    e.currentTarget.src = mobileFallback;
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Nav - Centered */}
          <ul className="hidden md:flex items-center gap-16 md:gap-8 absolute left-1/2 -translate-x-1/2">
            {visibleLinks.map((item) => (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className="text-[#D4AF6A] text-base hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language Dropdown - Far Right */}
          <div className="flex items-center">
            <LanguageDropdown />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 top-[80px] bg-[#0A0F1C] z-[90] transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
          } lg:hidden`}
        >
          <ul className="flex flex-col items-center pt-10 gap-8">
            {visibleLinks.map((item) => (
              <li key={item.url} className="w-full text-center">
                <Link
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-[#D4AF6A] font-light tracking-[0.2em] block py-4 active:bg-white/5"
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

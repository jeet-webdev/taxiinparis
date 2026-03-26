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
  btnText?: string | null;
  btnLink?: string | null;
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
    <header className="relative z-100 bg-[#F5F1EB] ">
      <nav className="max-w-378 mx-auto px-4 py-2 md:px-6">
        <div className="flex items-center justify-between">
          {/* Hamburger (Left on mobile only) */}
          <div className="md:hidden">
            <button
              className="text-[#8B6C26] p-2"
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
                  unoptimized
                  priority
                  className="object-contain pt-2 pb-2"
                  onError={(e) => {
                    e.currentTarget.src = desktopFallback;
                  }}
                />
              </div>

              {/* Mobile Logo */}
              <div className="md:hidden">
                <Image
                  src={footerData?.mobileLogoUrl || mobileFallback}
                  alt={footerData?.logoAlt || "Mobile Logo"}
                  width={50}
                  height={50}
                  priority
                  unoptimized
                  className="object-contain "
                  onError={(e) => {
                    e.currentTarget.src = mobileFallback;
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Nav - Centered */}
          <ul className="hidden cstm-nav md:flex items-center gap-5 md:gap-8 lg:gap-16 justify-center flex-wrap ">
            {visibleLinks.map((item) => (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className="text-[#2A2A2A] cstm-navlink font-medium font-heading text-sm lg:text-base hover:text-[#C6A85A] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language Dropdown - Far Right */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href={footerData?.btnLink || "/contact"}
              target="_blank"
              className="btn-primary cstm-navbtn font-logo! hidden md:block "
            >
              {footerData?.btnText || "Book Now"}
            </Link>
            <div>
              <LanguageDropdown />
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 top-16 bg-white z-90 transition-all duration-500 ease-in-out ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
          } lg:hidden`}
        >
          <ul className="flex flex-col items-center pt-10 gap-4">
            {visibleLinks.map((item) => (
              <li key={item.url} className="w-full text-start px-8">
                <Link
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-[#8b6c26] font-light  block py-2 active:bg-white/5"
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

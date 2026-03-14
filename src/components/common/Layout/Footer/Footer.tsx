"use client";

import React, { useState, useEffect } from "react";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Pinterest,
  Email,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import CallIcon from "@mui/icons-material/Call";
import XIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Image from "next/image";
import Link from "next/link";
import {
  NavLink,
  SocialLink,
  PaymentLink,
} from "@/src/feature/page-editor/FooterEditor/types/footer.types";

// Types to replace 'any'
interface CategoryPage {
  title: string;
  slug: string;
}

interface FooterCategory {
  id: number;
  name: string;
  slug: string;
  categoryPages: CategoryPage[];
}

interface FooterProps {
  footerData: {
    title: string | null;
    tagline: string | null;
    logoUrl: string | null;
    logoAlt: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    copyrightText: string | null;
    navLinks: unknown;
    socialLinks: unknown;
    paymentLinks: unknown;
  } | null;
  dbCategories: FooterCategory[];
}

const PAYMENT_ICONS = {
  visa: "/assets/images/visacard.svg",
  mastercard: "/assets/images/mastercard1.svg",
  amex: "/assets/images/amex-3.svg",
  paypal: "/assets/images/paypal3.svg",
  applepay: "/assets/images/applepay1.svg",
  gpay: "/assets/images/gpay.svg",
};

const iconMap: Record<string, React.ElementType> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: LinkedIn,
  pinterest: Pinterest,
  x: XIcon,
  email: Email,
  whatsapp: WhatsAppIcon,
  instagram: Instagram,
  youtube: YouTube,
};

function FooterLogo({
  logoUrl,
  logoAlt,
}: {
  logoUrl?: string | null;
  logoAlt?: string | null;
}) {
  const desktopFallback = "/assets/bg-luxury-limo.png";
  const mobileFallback = "/assets/bgmobile_logo_llp.png";

  // 1. Initialize state. We still need this to handle the "onError" switch.
  const [imgSrc, setImgSrc] = useState(logoUrl || "");

  // 2. REMOVE THE useEffect ENTIRELY.
  // We handle the update by using a 'key' on the Image component below.

  if (!logoUrl || logoUrl.trim() === "") {
    return (
      <span className="text-5xl font-black text-white italic tracking-tighter">
        TP
      </span>
    );
  }

  const handleError = () => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768;
      setImgSrc(isMobile ? mobileFallback : desktopFallback);
    }
  };

  return (
    <Image
      key={logoUrl} // 3. ADD THIS: When logoUrl changes, React resets this component
      src={imgSrc}
      alt={logoAlt || "Footer Logo"}
      width={120}
      height={120}
      className="object-contain"
      onError={handleError}
    />
  );
}
export default function Footer({ footerData, dbCategories }: FooterProps) {
  if (!footerData) return null;

  // Casting the JSON fields safely
  const navLinks = (footerData.navLinks as NavLink[]) || [];
  const socialLinks = (footerData.socialLinks as SocialLink[]) || [];
  const paymentLinks = (footerData.paymentLinks as PaymentLink[]) || [];

  const quickLinks = navLinks.filter(
    (l) => l.type !== "category" && l.showInNav !== false,
  );

  // const termsLink = navLinks.find((link) => link.showInNav === false);
  // const privacyLink = navLinks.find((link) => link.showInNav === false);
  const termsLink = navLinks.find((link) => link.url === "/terms");
  const privacyLink = navLinks.find((link) => link.url === "/privacy");

  return (
    <footer className="bg-[#0B0F1A] text-gray-300 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <div>
                <h4 className="text-2xl pt-0 lg:pt-10 font-bold text-[#D4AF6A] mb-3">
                  {footerData.title}
                </h4>

                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {footerData.tagline}
                </p>

                <div className="mb-8">
                  <Link href="/">
                    <div className="relative flex items-center">
                      <FooterLogo
                        logoUrl={footerData.logoUrl}
                        logoAlt={footerData.logoAlt}
                      />
                    </div>
                  </Link>
                </div>

                <ul className="space-y-3 text-sm">
                  {footerData.email && (
                    <li className="flex items-center gap-3">
                      <MarkEmailReadIcon
                        className="text-[#D4AF6A]"
                        sx={{ fontSize: 20 }}
                      />
                      <a
                        href={`mailto:${footerData.email}`}
                        className="text-gray-400 hover:text-[#D4AF6A]"
                      >
                        {footerData.email}
                      </a>
                    </li>
                  )}

                  {footerData.phone && (
                    <li className="flex items-center gap-3">
                      <CallIcon
                        className="text-[#D4AF6A]"
                        sx={{ fontSize: 20 }}
                      />
                      <a
                        href={`tel:${footerData.phone}`}
                        className="text-gray-400 hover:text-[#D4AF6A]"
                      >
                        {footerData.phone}
                      </a>
                    </li>
                  )}

                  {footerData.address && (
                    <li className="flex items-start gap-3">
                      <AccessTimeFilledIcon
                        className="text-[#D4AF6A] mt-1"
                        sx={{ fontSize: 20 }}
                      />
                      <span className="text-gray-400">
                        {footerData.address}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              {/* Quick Links */}
              <div className="block sm:hidden">
                <h3 className="text-[#D4AF6A] pt-2 lg:pt-10 font-semibold mb-4 text-sm uppercase tracking-widest">
                  Quick Links
                </h3>

                <ul className="space-y-2 text-sm">
                  {quickLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.url}
                        className="text-gray-400 hover:text-[#D4AF6A]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Quick Links */}
              <div className="hidden sm:block">
                <h3 className="text-[#D4AF6A] pt-2 lg:pt-10 font-semibold mb-4 text-sm uppercase tracking-widest">
                  Quick Links
                </h3>

                <ul className="space-y-2 text-sm">
                  {quickLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.url}
                        className="text-gray-400 hover:text-[#D4AF6A]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              {dbCategories.map((category) => (
                <div key={category.id}>
                  <h3 className="text-[#D4AF6A] pt-2 lg:pt-10 font-semibold mb-4 text-sm uppercase tracking-widest">
                    {category.name}
                  </h3>

                  <ul className="space-y-2 text-sm">
                    {category.categoryPages.map((page, idx) => (
                      <li key={idx}>
                        <Link
                          href={`/category/${category.slug}/${page.slug}`}
                          className="text-gray-400 hover:text-[#D4AF6A]"
                        >
                          {page.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="my-8 lg:my-16 pt-8  border-t border-white/10 
flex flex-col lg:flex-row 
items-center justify-between 
gap-6 lg:gap-8 text-center lg:text-left"
        >
          {/* SOCIAL */}
          <div className="flex gap-3 items-center justify-center order-1 lg:order-1">
            {socialLinks.map((social, i) => {
              const Icon = iconMap[social.platform];

              return Icon ? (
                <Link
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center 
          rounded-full border border-white/20 
          text-gray-400 
          hover:border-[#D4AF6A] 
          hover:text-[#D4AF6A] 
          transition-all duration-300"
                >
                  <Icon sx={{ fontSize: 18 }} />
                </Link>
              ) : null;
            })}
          </div>

          {/* COPYRIGHT */}
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 order-3 lg:order-2">
            <span>{footerData.copyrightText}</span>

            {privacyLink && (
              <>
                <span className="hidden md:inline mx-1">|</span>

                <Link
                  href={privacyLink.url}
                  className="hover:text-[#D4AF6A] transition-colors"
                >
                  {privacyLink.label}
                </Link>
              </>
            )}
            {termsLink && (
              <>
                <span className="hidden md:inline mx-1">|</span>

                <Link
                  href={termsLink.url}
                  className="hover:text-[#D4AF6A] transition-colors"
                >
                  {termsLink.label}
                </Link>
              </>
            )}
          </div>

          {/* PAYMENTS */}
          <div className="flex flex-wrap items-center justify-center gap-4 order-2 lg:order-3">
            {paymentLinks
              .filter((p) => p.isVisible)
              .map((p, i) => (
                <Image
                  key={i}
                  src={PAYMENT_ICONS[p.method as keyof typeof PAYMENT_ICONS]}
                  alt={p.method}
                  width={40}
                  height={25}
                  className="object-contain"
                />
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

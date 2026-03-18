"use client";

import {
  Facebook,
  Twitter,
  LinkedIn,
  Pinterest,
  Email,
  Instagram,
  YouTube,
  LocationCity,
} from "@mui/icons-material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
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

  const src = logoUrl && logoUrl.trim() !== "" ? logoUrl : desktopFallback;

  return (
    <>
      {/* Desktop */}
      <Image
        src={src}
        alt={logoAlt || "Footer Logo"}
        width={200}
        height={160}
        className="hidden md:block object-contain"
        onError={(e: any) => {
          e.currentTarget.src = desktopFallback;
        }}
      />

      {/* Mobile */}
      <Image
        src={ mobileFallback}
        alt={logoAlt || "Footer Logo"}
        width={90}
        height={90}
        className="block md:hidden object-contain"
        onError={(e: any) => {
          e.currentTarget.src = mobileFallback;
        }}
      />
    </>
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

  const firstCategory = dbCategories[0] || null;

  const otherCategories = dbCategories.slice(1);

  const termsLink = navLinks.find((link) => link.url === "/terms");
  const privacyLink = navLinks.find((link) => link.url === "/privacy");

  return (
    <footer className="bg-[#0B0F1A] text-gray-300 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* LEFT */}
          <div className="">
            <div className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-1 gap-6 mb-6 lg:mb-0">
              {/* <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 "> */}
              {/* TOP */}
              <div>
                {/* Logo */}
                <div className="md:mb-3">
                  <Link href="/">
                    <div className="flex items-center">
                      <FooterLogo
                        logoUrl={footerData.logoUrl}
                        logoAlt={footerData.logoAlt}
                      />
                    </div>
                  </Link>
                </div>

                {/* Title */}
                <h4 className="text-base md:text-lg font-semibold text-[#D4AF6A] md:mb-2">
                  {footerData.title}
                </h4>

                {/* Tagline */}
                <p className="text-sm text-white font-semibold leading-relaxed mb-4">
                  {footerData.tagline}
                </p>

                {/* Info list */}
                <ul className="space-y-3 text-sm">
                  {footerData.email && (
                    <li className="flex flex-col sm:flex-row sm:items-center font-bold gap-1 sm:gap-3 text-[#999]">
                      <MarkEmailReadIcon
                        className="text-white"
                        sx={{ fontSize: 15 }}
                      />
                      <span className="text-xs hover:text-[#f4b400]">
                        {footerData.email}
                      </span>
                    </li>
                  )}

                  {footerData.address && (
                    <li className="flex items-center gap-3 text-white">
                      <LocationCity
                        className="text-white"
                        sx={{ fontSize: 15 }}
                      />
                      <span className="text-[15px] hover:text-[#f4b400]">
                        Paris, France
                      </span>
                    </li>
                  )}

                  {footerData.phone && (
                    <li className="flex items-center gap-3 text-white">
                      <AccessTimeFilledIcon
                        className="text-white"
                        sx={{ fontSize: 15 }}
                      />
                      <span className="text-[15px] hover:text-[#f4b400]">
                        24/7 Service Available
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              {/* BOTTOM dynamic category */}
              <div className="hidden md:block">
                {firstCategory && (
                  <div className="mt-2">
                    <h3 className="text-white font-semibold mb-6 text-sm">
                      {firstCategory.name}
                    </h3>

                    <ul className="space-y-3 text-xs">
                      {firstCategory.categoryPages.map((page, idx) => (
                        <li key={idx}>
                          <Link
                            href={`/category/${firstCategory.slug}/${page.slug}`}
                            className="text-[#999] font-bold hover:text-[#f4b400]"
                          >
                            {page.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <div className="block md:hidden ml-8 sm:ml:0 min-w-0 md:mt-0 mt-6">
                <h3 className="text-white pt-2 lg:pt-4 font-semibold mb-6 text-base ">
                  Quick Links
                </h3>

                <ul className="space-y-3 text-xs">
                  {quickLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.url}
                        className="text-[#999] font-bold hover:text-[#f4b400]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* </div> */}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-2  md:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Quick Links */}
              <div className="hidden md:block">
                <h3 className="text-white pt-2 md:pt-4 font-semibold mb-6 text-sm ">
                  Quick Links
                </h3>

                <ul className="space-y-3 text-xs">
                  {quickLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.url}
                        className="text-[#999] font-bold hover:text-[#f4b400]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className=" md:hidden ">
                {firstCategory && (
                  <div className="mt-2">
                    <h3 className="text-white font-semibold mb-4 text-sm  ">
                      {firstCategory.name}
                    </h3>

                    <ul className="space-y-2 text-xs">
                      {firstCategory.categoryPages.map((page, idx) => (
                        <li key={idx}>
                          <Link
                            href={`/category/${firstCategory.slug}/${page.slug}`}
                            className="text-[#999] font-bold hover:text-[#f4b400]"
                          >
                            {page.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Categories */}
              {otherCategories.map((category) => (
                <div key={category.id} className="min-w-0">
                  <h3 className="text-white pt-2 lg:pt-4 font-semibold mb-6 text-base ">
                    {category.name}
                  </h3>

                  <ul className="space-y-3 text-xs">
                    {category.categoryPages.map((page, idx) => (
                      <li key={idx}>
                        <Link
                          href={`/category/${category.slug}/${page.slug}`}
                          className="text-[#999] font-bold hover:text-[#f4b400]"
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
          className="mt-4 lg:mt-16 pt-4  border-t border-white/10 
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
          <div className="flex flex-wrap justify-center gap-2 text-xs text-[#a1a1a1] order-3 lg:order-2">
            <span>{footerData.copyrightText}</span>

            {privacyLink && (
              <>
                <span className="hidden lg:inline mx-1">|</span>

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
                <span className="hidden lg:inline mx-1">|</span>

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

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
  Phone,
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
type AppLink = {
  url: string;
  platform: "google_play" | "app_store";
  isVisible: boolean;
};
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
    appLinks: unknown;
  } | null;
  dbCategories: FooterCategory[];
}

const PAYMENT_ICONS = {
  visa: "/assets/images/visacard.svg",
  mastercard: "/assets/images/mastercard1.svg",
  amex: "/assets/images/amex-3.svg",
  paypal: "/assets/images/paypal3.svg",
  applepay: "/assets/images/Apple_Pay-Logo.wine.svg",
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
        src={mobileFallback}
        alt={logoAlt || "Footer Logo"}
        width={50}
        height={50}
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
  const appLinks = (footerData?.appLinks as AppLink[]) || [];
  const socialLinks = (footerData.socialLinks as SocialLink[]) || [];
  const paymentLinks = (footerData.paymentLinks as PaymentLink[]) || [];
  const visibleLinks = appLinks.filter((app) => app.isVisible);

  const quickLinks = navLinks.filter(
    (l) => l.type !== "category" && l.showInNav !== false,
  );

  const firstCategory = dbCategories[0] || null;

  const otherCategories = dbCategories.slice(1);

  const termsLink = navLinks.find((link) => link.url === "/terms");
  const privacyLink = navLinks.find((link) => link.url === "/privacy");

  return (
    <footer className="bg-[#F5F1EB] text-gray-300 pt-12 pb-8 border-t border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-378 w-full mx-auto px-0 sm:px-6 lg:px-8">
        {/* APP DOWNLOAD */}
        <div className="pt-4">
          {/* Title */}
          <h4 className="text-4xl font-heading font-medium text-black md:mb-2">
            {footerData.title}
          </h4>

          <div className="border-y border-black/20 py-3">
            {/* Title */}
            <h3 className="text-start font-mono tracking-tight text-black text-lg sm:text-xl font-medium mb-2">
              Download our app for priority booking
            </h3>

            {/* Buttons */}
            <div className="flex flex-row justify-start gap-4 sm:gap-5">
              {visibleLinks.map((app, index) => {
                if (app.platform === "google_play") {
                  return (
                    <Link key={index} href={app.url} target="_blank">
                      <div className="appBadge">
                        <Image
                          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                          alt="Google Play"
                          width={240}
                          height={80}
                          className="h-15 w-auto"
                        />
                      </div>
                    </Link>
                  );
                }

                if (app.platform === "app_store") {
                  return (
                    <Link key={index} href={app.url} target="_blank">
                      <div className="appBadge">
                        <Image
                          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                          alt="App Store"
                          width={240}
                          height={80}
                          className="h-15 w-auto"
                        />
                      </div>
                    </Link>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* LEFT */}
          <div className="">
            <div className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-1 gap-6 mb-6 lg:mb-0">
              {/* <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 "> */}
              {/* TOP */}

              <div>
                {/* Logo */}
                <div className="my-3">
                  <Link href="/">
                    <div className="flex lg:justify-start justify-center items-center">
                      <FooterLogo
                        logoUrl={footerData.logoUrl}
                        logoAlt={footerData.logoAlt}
                      />
                    </div>
                  </Link>
                </div>

                {/* Tagline */}
                <p className="text-sm text-black/75 font-medium leading-relaxed mb-4">
                  {footerData.tagline}
                </p>

                {/* Info list */}
                <ul className="space-y-3 text-sm">
                  {footerData.email && (
                    <li className="flex flex-col sm:flex-row sm:items-center font-bold gap-1 sm:gap-3 text-black opacity-50 hover:text-[#8b6c26] transition-colors">
                      <MarkEmailReadIcon
                        className="text-black/900"
                        sx={{ fontSize: 15 }}
                      />

                      <a
                        href={`mailto:${footerData.email}`}
                        className="text-xs hover:opacity-100 transition"
                      >
                        {footerData.email}
                      </a>
                    </li>
                  )}
                  {footerData.phone && (
                    <li className="flex items-center gap-3 text-black opacity-50 font-medium hover:text-[#8b6c26] transition-colors">
                      <Phone className="text-black/900" sx={{ fontSize: 15 }} />

                      <a
                        href={`tel:${footerData.phone}`}
                        className="text-sm hover:opacity-100 transition"
                      >
                        {footerData.phone}
                      </a>
                    </li>
                  )}

                  {footerData.address && (
                    <li className="flex items-center gap-3 text-black opacity-50 hover:text-[#8b6c26] transition-colors font-medium">
                      <LocationCity
                        className="text-black/900"
                        sx={{ fontSize: 15 }}
                      />
                      <span className="text-sm text-black font-medium">
                        Paris, France
                      </span>
                    </li>
                  )}

                  {footerData.phone && (
                    <li className="flex items-center gap-3 text-black opacity-50 hover:text-[#8b6c26] transition-colors font-medium">
                      <AccessTimeFilledIcon
                        className="text-black/900"
                        sx={{ fontSize: 15 }}
                      />
                      <span className="text-sm text-black  font-medium">
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
                    <h3 className="text-black opacity-50  font-semibold mb-6 text-base">
                      {firstCategory.name}
                    </h3>

                    <ul className="space-y-2 text-base">
                      {firstCategory.categoryPages.map((page, idx) => (
                        <li key={idx}>
                          <Link
                            href={`/category/${firstCategory.slug}/${page.slug}`}
                            className="text-black hover:text-[#8b6c26] transition-colors "
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
              <div className="block md:hidden ml-8 sm:ml:0 min-w-0 mt-2 ">
                <h3 className="text-black opacity-50  pt-2 lg:pt-4 font-semibold mb-6 text-base ">
                  Quick Links
                </h3>

                <ul className="space-y-2 text-base">
                  {quickLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.url}
                        className="text-black hover:text-[#8b6c26] transition-colors"
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
                <h3 className="text-black opacity-50 pt-2 md:pt-4 font-semibold mb-6 text-base ">
                  Quick Links
                </h3>

                <ul className="space-y-2 text-base">
                  {quickLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.url}
                        className="text-black hover:text-[#8b6c26] transition-colors"
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
                    <h3 className="text-black opacity-50  font-semibold mb-4 text-sm  ">
                      {firstCategory.name}
                    </h3>

                    <ul className="space-y-2 text-base">
                      {firstCategory.categoryPages.map((page, idx) => (
                        <li key={idx}>
                          <Link
                            href={`/category/${firstCategory.slug}/${page.slug}`}
                            className="text-black hover:text-[#8b6c26] transition-colors "
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
                  <h3 className="text-black opacity-50  pt-2 lg:pt-4 font-semibold mb-6 text-base ">
                    {category.name}
                  </h3>

                  <ul className="space-y-2 text-base">
                    {category.categoryPages.map((page, idx) => (
                      <li key={idx}>
                        <Link
                          href={`/category/${category.slug}/${page.slug}`}
                          className="text-black hover:text-[#8b6c26] transition-colors"
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
          className="mt-4 lg:mt-16 pt-4  border-t border-black/10 
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
          rounded-full border border-black/20 
          text-black
          hover:border-[#8b6c26] hover:text-[#8b6c26]
          hover:text-[#8b6c26]/80 
          transition-all duration-300"
                >
                  <Icon sx={{ fontSize: 18 }} />
                </Link>
              ) : null;
            })}
          </div>

          {/* COPYRIGHT */}
          <div className="flex flex-wrap justify-center gap-2 text-xs text-[#000000] order-3 lg:order-2">
            <span>{footerData.copyrightText}</span>

            {privacyLink && (
              <>
                <span className="hidden lg:inline mx-1">|</span>

                <Link
                  href={privacyLink.url}
                  className="hover:text-[#8b6c26] transition-colors"
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
                  className="hover:text-[#8b6c26] transition-colors"
                >
                  {termsLink.label}
                </Link>
              </>
            )}

            <span className="hidden lg:inline mx-1">|</span>

            <Link
              href="/sitemap"
              className="hover:text-[#8b6c26] transition-colors"
            >
              Sitemap
            </Link>
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

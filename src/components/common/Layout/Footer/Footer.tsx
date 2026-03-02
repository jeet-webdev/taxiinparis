import {
  Facebook,
  Twitter,
  LinkedIn,
  Pinterest,
  Email,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import {
  AppLink as BaseAppLink,
  SocialLink,
  NavLink,
} from "@/src/feature/page-editor/FooterEditor/types/footer.types";

// Static asset mapping for icons
const APP_ICONS = {
  google_play: "/assets/images/google-play-store.png",
  app_store: "/assets/images/app-store-1.png",
};

const PAYMENT_ICONS = {
  visa: "/assets/images/visacard.svg",
  mastercard: "/assets/images/mastercard1.svg",
  amex: "/assets/images/amex-3.svg",
  paypal: "/assets/images/paypal3.svg",
  applepay: "/assets/images/applepay1.svg",
  gpay: "/assets/images/gpay.svg",
};

// Internal interfaces to match database JSON structure
interface AppLink {
  platform: "google_play" | "app_store";
  url: string;
  isVisible: boolean;
}

interface PaymentLink {
  method: "visa" | "mastercard" | "amex" | "paypal" | "applepay" | "gpay";
  url: string;
  isVisible: boolean;
}

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

export default async function Footer() {
  const data = await prisma.footer.findFirst();

  if (!data) return null;

  // Safely cast JSON fields
  const socialLinks = (data.socialLinks as unknown as SocialLink[]) || [];
  const navLinks = (data.navLinks as unknown as NavLink[]) || [];
  const appLinks = (data.appLinks as unknown as AppLink[]) || [];
  const paymentLinks = (data.paymentLinks as unknown as PaymentLink[]) || [];
  const termsLink = navLinks.find((link) => link.showInNav === false);

  return (
    <footer className="bg-[#0B0F1A] text-gray-300 pt-14 pb-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Socials */}
        <div>
          <h2 className="text-xl font-bold text-[#D4AF6A]">{data.title}</h2>
          <p className="text-sm mt-2 text-gray-400">{data.tagline}</p>

          {/* Changed grid to flex and added a small gap */}
          <div className="flex items-center  gap-2 mt-5">
            {Array.from(
              new Map(
                socialLinks.map((item) => [item.platform, item]),
              ).values(),
            ).map((social, i) => {
              const platformKey = social?.platform || "facebook";
              const Icon = iconMap[platformKey];
              if (!Icon) return null;

              return (
                <Link
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-[#D4AF6A] hover:text-[#D4AF6A] transition duration-300"
                >
                  <Icon fontSize="small" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-[#D4AF6A] font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            {navLinks
              .filter((link) => link.showInNav !== false)
              .map((link, i) => (
                <li key={i}>
                  <Link className="hover:text-[#D4AF6A]" href={link.url}>
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Reach Us */}
        <div>
          <h3 className="text-[#D4AF6A] font-semibold mb-4">Reach Us</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {data.email && (
              <li>
                <a
                  href={`mailto:${data.email}`}
                  className="hover:text-[#D4AF6A] transition-colors"
                >
                  {data.email}
                </a>
              </li>
            )}
            {data.phone && (
              <li>
                <a
                  href={`tel:${data.phone}`}
                  className="hover:text-[#D4AF6A] transition-colors"
                >
                  {data.phone}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* App Links & Payment Methods Section */}
        <div>
          <h3 className="text-[#D4AF6A] font-semibold mb-4">
            Method Of Payment
          </h3>

          {/* Payment Icons */}
          <div className="flex items-center gap-3">
            {paymentLinks
              .filter((p) => p.isVisible) // Only show if enabled in admin
              .map((payment, i) => (
                <div
                  key={i}
                  className="  w-12 h-8 flex items-center justify-center"
                >
                  <Image
                    src={PAYMENT_ICONS[payment.method]}
                    alt={payment.method}
                    width={40}
                    height={30}
                    className="object-contain"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="mt-12 border-t border-white/10 pt-5 text-center text-sm text-gray-500">
        <span>{data.copyrightText}</span>

        {termsLink && (
          <>
            <span className="mx-2">|</span>
            <a href={termsLink.url} className="hover:text-[#D4AF6A] transition">
              {termsLink.label}
            </a>
          </>
        )}
      </div>
    </footer>
  );
}

// import {
//   Facebook,
//   Twitter,
//   LinkedIn,
//   Pinterest,
//   Email,
//   Instagram,
//   YouTube,
// } from "@mui/icons-material";
// import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
// import CallIcon from "@mui/icons-material/Call";
// import XIcon from "@mui/icons-material/X";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import Image from "next/image";
// import Link from "next/link";
// import { prisma } from "@/src/lib/prisma";
// import {
//   AppLink as BaseAppLink,
//   SocialLink,
//   NavLink,
// } from "@/src/feature/page-editor/FooterEditor/types/footer.types";
// import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

// // Static asset mapping for icons
// const APP_ICONS = {
//   google_play: "/assets/images/google-play-store.png",
//   app_store: "/assets/images/app-store-1.png",
// };

// const PAYMENT_ICONS = {
//   visa: "/assets/images/visacard.svg",
//   mastercard: "/assets/images/mastercard1.svg",
//   amex: "/assets/images/amex-3.svg",
//   paypal: "/assets/images/paypal3.svg",
//   applepay: "/assets/images/applepay1.svg",
//   gpay: "/assets/images/gpay.svg",
// };

// // Internal interfaces to match database JSON structure
// interface AppLink {
//   platform: "google_play" | "app_store";
//   url: string;
//   isVisible: boolean;
// }

// interface PaymentLink {
//   method: "visa" | "mastercard" | "amex" | "paypal" | "applepay" | "gpay";
//   url: string;
//   isVisible: boolean;
// }

// const iconMap: Record<string, React.ElementType> = {
//   facebook: Facebook,
//   twitter: Twitter,
//   linkedin: LinkedIn,
//   pinterest: Pinterest,
//   x: XIcon,
//   email: Email,
//   whatsapp: WhatsAppIcon,
//   instagram: Instagram,
//   youtube: YouTube,
// };

// export default async function Footer() {
//   const data = await prisma.footer.findFirst();

//   if (!data) return null;

//   // Safely cast JSON fields
//   const socialLinks = (data.socialLinks as unknown as SocialLink[]) || [];
//   const navLinks = (data.navLinks as unknown as NavLink[]) || [];
//   const appLinks = (data.appLinks as unknown as AppLink[]) || [];
//   const paymentLinks = (data.paymentLinks as unknown as PaymentLink[]) || [];
//   const termsLink = navLinks.find((link) => link.showInNav === false);

//   return (
//     <footer className="bg-[#0B0F1A] text-gray-300 pt-14 pb-6 border-t border-white/10">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
//         {/* Logo & Socials */}
//         <div>
//           <h2 className="text-xl font-bold text-[#D4AF6A]">{data.title}</h2>
//           <p className="text-sm mt-2 text-gray-400">{data.tagline}</p>

//           {/* Changed grid to flex and added a small gap */}

//           <div className="flex flex-row justify-center md:justify-start gap-2 mt-5">
//             {Array.from(
//               new Map(
//                 socialLinks.map((item) => [item.platform, item]),
//               ).values(),
//             ).map((social, i) => {
//               const platformKey = social?.platform || "facebook";
//               const Icon = iconMap[platformKey];
//               if (!Icon) return null;

//               return (
//                 <Link
//                   key={i}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-9 h-9 flex  items-center  justify-center rounded-full border border-white/20 hover:border-[#D4AF6A] hover:text-[#D4AF6A] transition duration-300"
//                 >
//                   <Icon fontSize="small" />
//                 </Link>
//               );
//             })}
//           </div>
//         </div>

//         {/* Navigation */}
//         <div>
//           <h3 className="text-[#D4AF6A] font-semibold mb-4">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             {navLinks
//               .filter((link) => link.showInNav !== false)
//               .map((link, i) => (
//                 <li key={i}>
//                   <Link className="hover:text-[#D4AF6A]" href={link.url}>
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//           </ul>
//         </div>

//         {/* Reach Us */}
//         <div>
//           <h3 className="text-[#D4AF6A] font-semibold mb-4">Reach Us</h3>

//           <ul className="space-y-2 text-sm  text-gray-400">
//             {data.email && (
//               <li className="gap-2">
//                 <MarkEmailReadIcon className="text-[#D4AF6A] me-2" />
//                 <a
//                   href={`mailto:${data.email}`}
//                   className="hover:text-[#D4AF6A] transition-colors"
//                 >
//                   {data.email}
//                 </a>
//               </li>
//             )}
//             {data.phone && (
//               <li className="gap-2">
//                 <CallIcon className="text-[#D4AF6A] me-2" />
//                 <a
//                   href={`tel:${data.phone}`}
//                   className="hover:text-[#D4AF6A] transition-colors"
//                 >
//                   {data.phone}
//                 </a>
//               </li>
//             )}
//             {data.address && (
//               <li className="gap-2">
//                 <AccessTimeFilledIcon className="text-[#D4AF6A] me-2" />
//                 <span>{data.address}</span>
//               </li>
//             )}
//           </ul>
//         </div>

//         {/* App Links & Payment Methods Section */}
//         <div>
//           <h3 className="text-[#D4AF6A] font-semibold mb-4">
//             Method Of Payment
//           </h3>

//           {/* Payment Icons */}
//           <div className="flex items-center   gap-3  justify-center md:justify-start">
//             {paymentLinks
//               .filter((p) => p.isVisible)
//               .map((payment, i) => (
//                 <div
//                   key={i}
//                   className="  w-12 h-8 flex items-center justify-center"
//                 >
//                   <Image
//                     src={PAYMENT_ICONS[payment.method]}
//                     alt={payment.method}
//                     width={40}
//                     height={30}
//                     className="object-contain"
//                   />
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>

//       {/* Copyright Footer */}
//       <div className="mt-12 border-t border-white/10 pt-5 text-center text-sm text-gray-500 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-0">
//         <span>{data.copyrightText}</span>

//         {termsLink && (
//           <>
//             <span className="hidden md:inline mx-2">|</span>
//             <a href={termsLink.url} className="hover:text-[#D4AF6A] transition">
//               {termsLink.label}
//             </a>
//           </>
//         )}
//       </div>
//     </footer>
//   );
// }

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
import { prisma } from "@/src/lib/prisma";
import {
  NavLink,
  SocialLink,
  PaymentLink,
} from "@/src/feature/page-editor/FooterEditor/types/footer.types";

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

export default async function Footer() {
  // 1. Fetch Footer Config AND Database Categories
  const [footerData, dbCategories] = await Promise.all([
    prisma.footer.findFirst(),
    prisma.category.findMany({
      include: {
        categoryPages: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    }),
  ]);

  if (!footerData) return null;

  const navLinks = (footerData.navLinks as unknown as NavLink[]) || [];
  const socialLinks = (footerData.socialLinks as unknown as SocialLink[]) || [];
  const paymentLinks =
    (footerData.paymentLinks as unknown as PaymentLink[]) || [];

  // Filter regular Quick Links from the JSON
  const quickLinks = navLinks.filter(
    (l) => l.type !== "category" && l.showInNav !== false,
  );

  return (
    <footer className="bg-[#0B0F1A] text-gray-300 pt-14 pb-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center md:text-left">
        {/* Column 1: Logo & Socials */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold text-[#D4AF6A]">
            {footerData.title}
          </h2>
          <p className="text-sm mt-2 text-gray-400">{footerData.tagline}</p>
          <div className="flex flex-row justify-center md:justify-start gap-2 mt-5">
            {socialLinks.map((social, i) => {
              const Icon = iconMap[social.platform];
              return Icon ? (
                <Link
                  key={i}
                  href={social.url}
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-[#D4AF6A] hover:text-[#D4AF6A] transition"
                >
                  <Icon fontSize="small" />
                </Link>
              ) : null;
            })}
          </div>
        </div>

        {/* Columns 2 & 3: Database Categories & Category Pages */}
        {dbCategories.slice(0, 2).map((category) => (
          <div key={category.id}>
            <h3 className="text-[#D4AF6A] font-semibold mb-4 text-xs uppercase tracking-widest">
              {category.name}
            </h3>
            <ul className="space-y-2 text-sm">
              {category.categoryPages.map((page, idx) => (
                <li key={idx}>
                  <Link
                    className="hover:text-[#D4AF6A] transition-colors"
                    href={`/category/${category.slug}/${page.slug}`}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Column 4: Quick Links */}
        <div>
          <h3 className="text-[#D4AF6A] font-semibold mb-4 text-xs uppercase tracking-widest">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link className="hover:text-[#D4AF6A]" href={link.url}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: Reach Us */}
        <div>
          <h3 className="text-[#D4AF6A] font-semibold mb-4 text-xs uppercase tracking-widest">
            Reach Us
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {footerData.email && (
              <li className="flex items-center justify-center md:justify-start gap-2">
                <MarkEmailReadIcon
                  className="text-[#D4AF6A]"
                  fontSize="small"
                />
                <a
                  href={`mailto:${footerData.email}`}
                  className="hover:text-[#D4AF6A] truncate"
                >
                  {footerData.email}
                </a>
              </li>
            )}
            {footerData.phone && (
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CallIcon className="text-[#D4AF6A]" fontSize="small" />
                <a
                  href={`tel:${footerData.phone}`}
                  className="hover:text-[#D4AF6A]"
                >
                  {footerData.phone}
                </a>
              </li>
            )}
            {footerData.address && (
              <li className="flex items-center justify-center md:justify-start gap-2">
                <AccessTimeFilledIcon
                  className="text-[#D4AF6A]"
                  fontSize="small"
                />
                <span>{footerData.address}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Payment & Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-6">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          {paymentLinks
            .filter((p) => p.isVisible)
            .map((p, i) => (
              <Image
                key={i}
                src={PAYMENT_ICONS[p.method as keyof typeof PAYMENT_ICONS]}
                alt={p.method}
                width={35}
                height={25}
                className="object-contain"
              />
            ))}
        </div>
        <p className="text-xs text-gray-500">{footerData.copyrightText} </p>
        <div></div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import {
  Cinzel,
  Great_Vibes,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

// --- Font Configurations ---
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-greatvibes",
});

// --- Metadata for SEO & Browser Icons ---
export const metadata: Metadata = {
  verification: {
    google: "qnOdreBU0qcP1zD5bl5ZBioC8JSWtNcvumKyHGL3_F0",
  },
  title: "Luxury Limo Paris",
  description: "Premium Chauffeur Service in Paris",
  // icons: {
  //   icon: "/uploads/favicon.ico",
  //   apple: "/uploads/apple-touch-icon-180x180.png",
  //   shortcut: "/uploads/favicon-browser-32x32.png",
  // },
  icons: {
    icon: [
      { url: "/uploads/favicon.ico", sizes: "any" },
      {
        url: "/uploads/favicon-browser-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/uploads/favicon-browser-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/uploads/apple-touch-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/uploads/favicon-browser-32x32.png",
  },
  manifest: "/site.webmanifest",
};

// Next.js App Router specific viewport configuration
export const viewport = {
  themeColor: "#0A0F1C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${montserrat.variable} ${cinzel.variable} ${playfair.variable} ${greatVibes.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

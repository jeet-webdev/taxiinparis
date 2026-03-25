import type { Metadata } from "next";
import {
  Cinzel,
  Great_Vibes,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import Script from "next/script"; //1
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
    google: "VSVIVqpHdwUEgucHvN6CabseAmtHlg8cMYVlSUzz-6k",
  },
  title: "Luxury Limo Paris",
  description: "Premium Chauffeur Service in Paris",
  applicationName: "Luxury Limo Paris",
  openGraph: {
    siteName: "Luxury Limo Paris",
  },
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
    // <html lang="en">
    //   <body
    //     suppressHydrationWarning
    //     className={`${montserrat.variable} ${cinzel.variable} ${playfair.variable} ${greatVibes.variable} font-sans`}
    //   >
    //     {children}
    //   </body>
    // </html>
    <html lang="en">
      <head>
        {/* 2. GTM Main Script - Placed in Head */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NZXJWVFC');`}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className={`${montserrat.variable} ${cinzel.variable} ${playfair.variable} ${greatVibes.variable} font-sans`}
      >
        {/* 3. GTM Noscript - Placed at the start of Body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NZXJWVFC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {children}
      </body>
    </html>
  );
}

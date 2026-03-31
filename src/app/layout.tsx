import type { Metadata } from "next";
import {
  Cinzel,
  Great_Vibes,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import Script from "next/script";
import DisableRightClick from "../components/common/Layout/DisableRightClick";

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

export const metadata: Metadata = {
  verification: {
    google: "VSVIVqpHdwUEgucHvN6CabseAmtHlg8cMYVlSUzz-6k",
  },
  metadataBase: new URL("https://www.luxurylimoparis.fr"),

  title: {
    default: "Luxury Limo Paris",
    template: "%s | Luxury Limo Paris",
  },

  description: "Premium Chauffeur Service in Paris",

  applicationName: "Luxury Limo Paris",

  openGraph: {
    title: "Luxury Limo Paris",
    siteName: "Luxury Limo Paris",
    url: "https://www.luxurylimoparis.fr",
    type: "website",
  },

  // icons: {
  //   icon: [
  //     { url: "/favicon.ico", sizes: "any" },
  //     {
  //       url: "/favicon-32x32.png",
  //       sizes: "32x32",
  //       type: "image/png",
  //     },
  //     {
  //       url: "/favicon-16x16.png",
  //       sizes: "16x16",
  //       type: "image/png",
  //     },
  //   ],
  //   apple: [
  //     {
  //       url: "/apple-touch-icon.png",
  //       sizes: "180x180",
  //       type: "image/png",
  //     },
  //   ],
  //   shortcut: "/favicon-32x32.png",
  // },

  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#0A0F1C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Luxury Limo Paris",
    url: "https://www.luxurylimoparis.fr",
    logo: "https://www.luxurylimoparis.fr/uploads/apple-touch-icon-180x180.png",
    sameAs: ["https://www.facebook.com/", "https://www.instagram.com/"],
  };

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Luxury Limo Paris",
    alternateName: "Luxury Chauffeur Paris",
    url: "https://www.luxurylimoparis.fr",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.luxurylimoparis.fr/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Luxury Limo Paris" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />

        {/* GTM — kept as Next.js Script component, this is correct */}
        {/* <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NZXJWVFC');`}
        </Script> */}
        <Script id="clean-url" strategy="beforeInteractive">
          {`
      (function() {
        if (window.location.search.includes('_gl')) {
          var clean = window.location.origin + window.location.pathname;
          window.history.replaceState({}, '', clean);
        }
      })();
    `}
        </Script>

        <Script id="gtm-script" strategy="afterInteractive"></Script>
      </head>
      <body
        suppressHydrationWarning
        className={`${montserrat.variable} ${cinzel.variable} ${playfair.variable} ${greatVibes.variable} font-sans`}
      >
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NZXJWVFC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <DisableRightClick />
        {children}
      </body>
    </html>
  );
}

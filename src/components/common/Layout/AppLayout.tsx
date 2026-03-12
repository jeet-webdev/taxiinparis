// // "use client";

// import React from "react";
// import type { ReactNode } from "react";
// import Navbar from "./Header/Navbar";
// import Footer from "./Footer/Footer";
// interface MarketingAppLayoutProps {
//   children: ReactNode;
// }

// const AppLayout: React.FC<MarketingAppLayoutProps> = ({ children }) => {
//   return (
//     <div className="flex flex-col min-h-screen bg-[#0B0F1A] text-white">
//       {/* NAVBAR */}
//       <Navbar />

//       {/* MAIN CONTENT */}
//       <main className="grow">{children}</main>

//       {/* FOOTER */}
//       <Footer />
//     </div>
//   );
// };

// export default AppLayout;
import React from "react";
import type { ReactNode } from "react";
import { prisma } from "@/src/lib/prisma";

import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";

interface MarketingAppLayoutProps {
  children: ReactNode;
}

// This is your Server Component
export default async function AppLayout({ children }: MarketingAppLayoutProps) {
  // 1. Fetch data from Prisma on the server
  const [footerData, dbCategories] = await Promise.all([
    prisma.footer.findFirst(),
    prisma.category.findMany({
      include: {
        categoryPages: {
          select: { title: true, slug: true },
        },
      },
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F1A] text-white">
      {/* 2. Pass the server data into the Client Navbar */}
      <Navbar footerData={footerData} />

      {/* MAIN CONTENT */}
      <main className="grow">{children}</main>

      {/* FOOTER */}
      <Footer footerData={footerData} dbCategories={dbCategories} />
    </div>
  );
}

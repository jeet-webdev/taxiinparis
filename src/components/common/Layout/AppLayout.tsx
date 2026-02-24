"use client";

import React from "react";
import type { ReactNode } from "react";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
interface MarketingAppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<MarketingAppLayoutProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F1A] text-white">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="grow">{children}</main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default AppLayout;
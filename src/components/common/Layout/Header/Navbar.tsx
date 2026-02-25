"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import LanguageDropdown from "../../Ui/GoogleTranslate";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-50 bg-linear-to-b from-[#0A0F1C] to-[#0A0F1C]/95">
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/images/logo.jpeg"
            alt="Paris Black Car"
            width={40}
            height={40}
          />
          <span className="font-semibold font-heading tracking-widest text-lg text-white">
            PARIS BLACK CAR
          </span>
        </Link>

        {/* Nav Items */}
        <ul className="hidden md:flex gap-10 text-lg  tracking-wide relative">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className="relative px-2 py-1 text-[#D4AF6A] text-lg hover:text-[#E6C27A] transition"
                >
                  {item.name}

                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#D4AF6A] shadow-[0_0_8px_rgba(212,175,106,0.7)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <LanguageDropdown />
      </nav>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import { NavLink } from "@/src/feature/page-editor/HeaderEditor/types/header.types";
import LanguageDropdown from "../../Ui/GoogleTranslate";

export default async function Navbar() {
  const footer = await prisma.footer.findFirst();

  const navLinks: NavLink[] =
    footer && Array.isArray(footer.navLinks)
      ? (footer.navLinks as unknown as NavLink[])
      : [];

  const visibleLinks = navLinks.filter((link) => link.showInNav);

  // Fallback logo if none is uploaded in the admin
  const displayLogo = footer?.logoUrl || "/assets/images/parislogos.png";
  const displayAlt = footer?.logoAlt || "Paris Limo Logo";

  return (
    <header className="relative z-50 bg-linear-to-b from-[#0A0F1C] to-[#0A0F1C]/95">
      <nav className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src={displayLogo} // Dynamic path from Database
              alt={displayAlt} // Dynamic Alt text from Database
              width={120}
              height={120}
              className="object-contain" // Ensures logo doesn't stretch
              priority
            />
          </Link>

          <ul className="hidden md:flex gap-10 text-lg">
            {visibleLinks.map((item) => (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className="text-[#D4AF6A] hover:text-[#E6C27A]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="justify-self-end md:justify-self-auto">
            <LanguageDropdown />
          </div>
        </div>
      </nav>
    </header>
  );
}

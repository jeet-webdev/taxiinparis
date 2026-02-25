// Navbar.tsx
import Image from "next/image";
import NavLink from "../../Ui/Navlink";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-linear-to-b from-[#0A0F1C] to-[#0A0F1C]/95">
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/logo.jpeg"
              alt="Paris Black Car"
              width={40}
              height={40}
            />
            <span className="font-semibold font-heading tracking-widest text-lg">
              PARIS BLACK CAR
            </span>
          </div>
        </Link>

        <ul className="hidden md:flex gap-10 text-sm tracking-wide">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/chauffeurs">Chauffeurs</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </ul>
      </nav>
    </header>
  );
}

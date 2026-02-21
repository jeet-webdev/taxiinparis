// Navbar.tsx
import Image from "next/image";
import NavLink from "../../Ui/Navlink";

export default function Navbar() {
  return (
    <header className="bg-gradient-to-b from-[#0A0F1C] to-[#0A0F1C]/95">
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
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

        <ul className="hidden md:flex gap-10 text-sm tracking-wide">
        <NavLink href="#">Home</NavLink>
          <NavLink href="#">About</NavLink>
          <NavLink href="#">Services</NavLink>
          <NavLink href="#">Chauffeurs</NavLink>
          <NavLink href="#">Blog</NavLink>
          <NavLink href="#">Contact</NavLink>
        </ul>
      </nav>
    </header>
  );
}

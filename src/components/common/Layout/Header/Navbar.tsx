// Navbar.tsx
import Image from "next/image";
import NavLink from "../../Ui/Navlink";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.svg" alt="Paris Black Car" width={40} height={40} />
          <span className="font-semibold tracking-widest text-lg">
            PARIS BLACK CAR
          </span>
        </div>

        <ul className="hidden md:flex gap-10 text-sm tracking-wide">
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
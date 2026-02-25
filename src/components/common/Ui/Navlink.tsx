// NavLink.tsx
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="px-2 py-1 text-[#D4AF6A] text-base tracking-wide  font-medium hover:text-[#E6C27A] transition"
      >
        {children}
      </Link>
    </li>
  );
}
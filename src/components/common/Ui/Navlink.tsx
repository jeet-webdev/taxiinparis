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
        className="hover:text-amber-400 transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );
}
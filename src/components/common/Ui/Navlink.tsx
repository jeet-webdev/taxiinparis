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
        className="
          text-[#C8A96A]
          text-base
          tracking-wide
          transition-all
          duration-300
          font-medium
          hover:text-[#E6C27A]
          hover:drop-shadow-[0_0_6px_rgba(200,169,106,0.6)]
        "
      >
        {children}
      </Link>
    </li>
  );
}
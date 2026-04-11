"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
];

export function StickyNavBar() {
  const pathname = usePathname();
  const baseClass = "hover:opacity-70";
  const activeClass = "font-bol1d border-b-2 border-current";

  const getLinkClass = (href: string) =>
    pathname === href ? activeClass : baseClass;

  return (
    <header className="fixed right-0 left-0 top-0 z-40 backdrop-blur-md bg-white/80">
      <nav className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          YourLogo
        </Link>

        <ul className="flex gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={getLinkClass(item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

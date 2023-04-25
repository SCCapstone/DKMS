import Link from "next/link";

import Vercel from "@/components/ui/Vercel";

import NavbarItem from "./NavbarItem";

import type { MenuItems } from "./NavbarItem";

/* Layout for desktop navigation bar */
const DesktopNavigation = ({ items }: { items: MenuItems }) => (
  <nav className="hidden md:block md:w-72 h-100% bg-primary text-primary-content">
    <div className="flex flex-col py-4 h-screen sticky top-0">
      <h1 className="text-3xl text-center font-black">
        <Link href="/app">DKMS</Link>
      </h1>
      <ul className="menu p-1 grow">
        {items.map((item) => (
          <NavbarItem key={item.label} item={item} />
        ))}
      </ul>
      <Vercel className="place-self-center" />
    </div>
  </nav>
);

export default DesktopNavigation;

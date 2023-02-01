import Link from "next/link";

import Vercel from "../ui/Vercel";

import NavbarItem from "./NavbarItem";

import type { ItemType } from "./NavbarItem";

const DesktopNavigation = ({ items }: { items: readonly ItemType[] }) => (
  <nav className="hidden md:block md:w-72 h-100% bg-primary text-primary-content">
    <div className="flex flex-col py-4 h-screen sticky top-0">
      <h1 className="text-3xl text-center font-black">
        <Link href="/">DKMS</Link>
      </h1>
      <ul className="menu p-1 grow">
        {items.map((item) => (
          <NavbarItem key={item.url} item={item} />
        ))}
      </ul>
      <Vercel className="place-self-center" />
    </div>
  </nav>
);

export default DesktopNavigation;

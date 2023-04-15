import Link from "next/link";

import SidebarMenu from "@/components/Sidebar/SidebarMenu";

import NavbarItem from "./NavbarItem";

import type { MenuItems } from "./NavbarItem";

const DropdownButton = () => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/no-noninteractive-tabindex
  <label tabIndex={0} className="btn btn-ghost btn-circle">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h7"
      />
    </svg>
  </label>
);

const MobileNavbar = ({ items }: { items: MenuItems }) => (
  <nav className="navbar bg-primary text-primary-content md:hidden sticky top-0 drop-shadow">
    <div className="navbar-start">
      <div className="dropdown">
        <DropdownButton />
        <ul
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          {items.map((item) => (
            <NavbarItem key={item.label} item={item} />
          ))}
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <Link href="/app" className="btn btn-ghost text-xl font-black">
        DKMS
      </Link>
    </div>
    <div className="navbar-end">
      <SidebarMenu />
    </div>
  </nav>
);

export default MobileNavbar;

import Link from "next/link";

import SidebarContainer from "../sidebar/SidebarContainter";

import Vercel from "./Vercel";

export type ItemType = {
  label: string;
  url: string;
};

const navbarItems = [
  {
    label: "Feed",
    url: "/",
  },
  {
    label: "Profile",
    url: "/profile",
  },
];

const NavbarItem = ({ item }: { item: ItemType }) => (
  <li>
    <Link className="font-bold" href={item.url}>
      {item.label}
    </Link>
  </li>
);

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

const MobileNavbar = () => (
  <nav className="navbar bg-primary text-primary-content md:hidden sticky top-0 drop-shadow">
    <div className="navbar-start">
      <div className="dropdown">
        <DropdownButton />
        <ul
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          {navbarItems.map((item) => (
            <NavbarItem key={item.url} item={item} />
          ))}
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <Link href="/" className="btn btn-ghost text-xl font-black">
        DKMS
      </Link>
    </div>
    <div className="navbar-end">
      <SidebarContainer />
    </div>
  </nav>
);

const DesktopNavigation = () => (
  <nav className="hidden md:block md:w-72 h-100% bg-primary text-primary-content">
    <div className="flex flex-col py-4 h-screen sticky top-0">
      <h1 className="text-3xl text-center font-black">
        <Link href="/">DKMS</Link>
      </h1>
      <ul className="menu p-1 grow">
        {navbarItems.map((item) => (
          <NavbarItem key={item.url} item={item} />
        ))}
      </ul>
      <Vercel className="place-self-center" />
    </div>
  </nav>
);

const NavbarContainer = () => (
  <>
    <DesktopNavigation />
    <MobileNavbar />
  </>
);

export default NavbarContainer;

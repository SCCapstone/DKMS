import Link from "next/link";

import Vercel from "./Vercel";

export type ItemType = {
  label: string;
  url: string;
};

const NavbarItem = ({ item }: { item: ItemType }) => (
  <li>
    <Link className="font-bold" href={item.url}>
      {item.label}
    </Link>
  </li>
);

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

const NavbarButton = () => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label
    htmlFor="my-drawer"
    className="btn btn-primary drawer-button md:hidden"
  >
    Open drawer
  </label>
);

const NavbarContent = () => (
  <div className="bg-primary text-primary-content p-4 w-64">
    <span className="drawer-overlay" />
    <nav className="flex flex-col h-full">
      <h1 className="text-3xl text-center font-black">
        <Link href="/">DKMS</Link>
      </h1>
      <ul className="menu p-1 grow">
        {navbarItems.map((item) => (
          <NavbarItem key={item.url} item={item} />
        ))}
      </ul>
      <div className="place-self-center mx-auto">
        <Vercel />
      </div>
    </nav>
  </div>
);

const Navbar = ({ children }: { children: React.ReactNode }) => (
  <div className="drawer drawer-mobile">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      {children}
      <NavbarButton />
    </div>
    <NavbarContent />
  </div>
);

export default Navbar;

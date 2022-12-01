import Link from "next/link";

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
    url: "/feed",
  },
  {
    label: "Profile",
    url: "/profile",
  },
];

const Navbar = ({ children }: { children: React.ReactNode }) => (
  <div className="drawer drawer-mobile">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center">
      {children}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="my-drawer"
        className="btn btn-primary drawer-button md:hidden"
      >
        Open drawer
      </label>
    </div>
    <div className="drawer-side bg-primary text-primary-content p-4 w-64">
      <span className="drawer-overlay" />
      <div>
        <h1 className="text-3xl text-center font-black">
          <Link href="/">DKMS</Link>
        </h1>
        <hr />
        <ul className="menu p-1">
          {navbarItems.map((item) => (
            <NavbarItem key={item.url} item={item} />
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Navbar;

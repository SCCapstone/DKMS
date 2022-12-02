import Link from "next/link";

export type ItemType = {
  label: string;
  url: string;
};

const NavbarItem = ({ item }: { item: ItemType }) => (
  <li>
    <Link className="normal-case font-bold" href={item.url}>
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
  {
    label: "Notifications",
    url: "/components",
  },
];

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-start">
      <h1>
        <Link
          className="normal-case text-xl btn btn-ghost rounded-none text-primary"
          href="/"
        >
          DKMS
        </Link>
      </h1>
    </div>
    <div className="navbar-end">
      <ul className="menu menu-horizontal">
        {navbarItems.map((item) => (
          <NavbarItem item={item} key={item.url} />
        ))}
      </ul>
    </div>
  </nav>
);

export default Navbar;

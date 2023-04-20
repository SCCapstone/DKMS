import Link from "next/link";

const NAVBAR_ITEMS = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Sign In",
    href: "/auth/signin",
  },
] as const;

const MarketingNavbar = () => (
  <nav className="navbar bg-primary text-primary-content">
    <div className="navbar-start">
      <div className="dropdown">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/no-noninteractive-tabindex */}
        <label tabIndex={0} className="btn btn-square btn-ghost lg:hidden">
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
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary text-primary-content rounded-box w-52"
        >
          {NAVBAR_ITEMS.map((item) => (
            <li key={item.label}>
              <Link className="btn btn-ghost normal-case" href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <h1>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          DKMS
        </Link>
      </h1>
    </div>
    <div className="navbar-end hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {NAVBAR_ITEMS.map((item) => (
          <li key={item.label}>
            <Link className="btn btn-ghost normal-case" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default MarketingNavbar;

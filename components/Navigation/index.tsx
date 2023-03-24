import DesktopNavigation from "./DesktopNavigation";
import MobileNavbar from "./MobileNavbar";

import type { MenuItems } from "./NavbarItem";

const NAVBAR_ITEMS: MenuItems = [
  {
    label: "Feed",
    url: "/",
  },
  {
    label: "Profile",
    url: "/profile",
  },
  {
    label: "Search",
    url: "/search",
  },
  {
    label: "Settings",
    url: "/settings",
  },
  {
    label: "Tracks For You",
    url: "/recommendations",
  },
  {
    label: "Logout",
    buttonType: "signout",
  },
] as const;

const NavbarContainer = () => (
  <>
    <DesktopNavigation items={NAVBAR_ITEMS} />
    <MobileNavbar items={NAVBAR_ITEMS} />
  </>
);

export default NavbarContainer;

import DesktopNavigation from "./DesktopNavigation";
import MobileNavbar from "./MobileNavbar";

import type { MenuItems } from "./NavbarItem";

const NAVBAR_ITEMS: MenuItems = [
  {
    label: "Feed",
    url: "/app/",
  },
  {
    label: "Discover",
    url: "/app/discover",
  },
  {
    label: "Profile",
    url: "/app/profile",
  },
  {
    label: "Search",
    url: "/app/search",
  },
  {
    label: "Recommendations",
    url: "/app/recommendations",
  },
  {
    label: "Settings",
    url: "/app/settings",
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

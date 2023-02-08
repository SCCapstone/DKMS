import DesktopNavigation from "./DesktopNavigation";
import MobileNavbar from "./MobileNavbar";

const NAVBAR_ITEMS = [
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
] as const;

const NavbarContainer = () => (
  <>
    <DesktopNavigation items={NAVBAR_ITEMS} />
    <MobileNavbar items={NAVBAR_ITEMS} />
  </>
);

export default NavbarContainer;

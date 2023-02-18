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
] as const;

const NavbarContainer = () => (
  <>
    <DesktopNavigation items={NAVBAR_ITEMS} />
    <MobileNavbar items={NAVBAR_ITEMS} />
  </>
);

export default NavbarContainer;

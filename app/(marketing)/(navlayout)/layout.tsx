/* Marketing Page Layout for non-home pages */
import MarketingNavbar from "@/app/(marketing)/MarketingNavbar";

const NavLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <header>
      <MarketingNavbar />
    </header>
    <main className="flex-grow">{children}</main>
  </>
);

export default NavLayout;

import PageTitle from "@/components/ui/PageTitle";

import SearchMenu from "./SearchMenu";

/* Search Page Layout */
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <PageTitle title="Search" />
    <SearchMenu />
    <span className="divider" />
    {children}
  </div>
);

export default Layout;

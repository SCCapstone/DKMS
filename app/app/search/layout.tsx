import { Suspense } from "react";

import PageTitle from "@/components/ui/PageTitle";

import SearchHandler from "./SearchHandler";
import SearchMenu from "./SearchMenu";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <PageTitle title="Search" />
    <Suspense fallback={<SearchMenu query="" />}>
      <SearchHandler />
    </Suspense>
    <span className="divider" />
    {children}
  </div>
);

export default Layout;

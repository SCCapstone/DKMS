import dynamic from "next/dynamic";
import { Suspense } from "react";

import SearchMenu from "@/app/app/search/SearchMenu";
import PageTitle from "@/components/ui/PageTitle";

const SearchHandler = dynamic(() => import("./SearchHandler"));
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

import PageTitle from "@/components/ui/PageTitle";

/* Profile Page Layout */
const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <PageTitle title="Profile" />
    {children}
  </>
);

export default Layout;

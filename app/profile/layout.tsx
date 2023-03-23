import PageTitle from "@/components/ui/PageTitle";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <PageTitle title="Profile" />
    {children}
  </>
);

export default Layout;

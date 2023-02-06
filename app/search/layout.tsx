import PageTitle from "components/ui/PageTitle";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <PageTitle title="Search" />
    <span className="divider" />
    {children}
  </div>
);

export default Layout;

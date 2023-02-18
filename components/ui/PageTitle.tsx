const PageTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <>
    <h1 className="normal-case font-bold">{title}</h1>
    <h2 className="normal-case">{subtitle}</h2>
    <div className="divider" />
  </>
);

export default PageTitle;

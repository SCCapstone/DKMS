const PageTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <>
    <h1 className="normal-case font-black text-2xl">{title}</h1>
    <h2 className="normal-case font-thin">{subtitle}</h2>
    <div className="divider" />
  </>
);

export default PageTitle;

import Skeleton from "react-loading-skeleton";

const LoadingLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Skeleton enableAnimation count={2} />
    {children}
  </>
);

export default LoadingLayout;

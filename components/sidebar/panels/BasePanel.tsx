const BasePanel = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full md:w-64 min-h-screen h-100% p-4 bg-gray-200 text-black">
    {children}
  </div>
);

export default BasePanel;

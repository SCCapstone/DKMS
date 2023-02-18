import "react-loading-skeleton/dist/skeleton.css";

import Navbar from "../components/Navigation";
import { DesktopSidebar, MobileSidebar } from "../components/Sidebar";

import "./globals.css";
import Providers from "./providers";

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <title>DKMS</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Generated by create next app" />
    </head>
    <body>
      <Providers>
        <div className="md:flex flex-row min-h-screen">
          <Navbar />

          <main
            role="main"
            className="container w-100% mx-auto p-4 md:px-8 flex-grow"
          >
            <MobileSidebar>{children}</MobileSidebar>
          </main>
          <DesktopSidebar />
        </div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;

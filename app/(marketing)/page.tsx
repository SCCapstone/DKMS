import MarketingNavbar from "@/app/(marketing)/MarketingNavbar";

import DemoVideoSection from "./DemoVideoSection";
import HowSection from "./HowSection";
import ScreenshotSection from "./ScreenshotSection";
import TitleSection from "./TitleSection";
import WhySection from "./WhySection";

const HomePage = () => (
  <>
    <header className="h-screen">
      <MarketingNavbar />
      <TitleSection />
    </header>
    <main>
      <WhySection />
      <ScreenshotSection />
      <HowSection />
      <DemoVideoSection />
    </main>
  </>
);

export default HomePage;

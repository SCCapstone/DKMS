import MarketingNavbar from "./MarketingNavbar";
import {
  DemoVideoSection,
  HowSection,
  ScreenshotSection,
  TitleSection,
  WhySection,
} from "./sections";

/* Marketing page components */
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

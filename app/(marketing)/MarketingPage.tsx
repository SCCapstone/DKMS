import DemoVideoSection from "./DemoVideoSection";
import HowSection from "./HowSection";
import ScreenshotSection from "./ScreenshotSection";
import TitleSection from "./TitleSection";
import WhySection from "./WhySection";

const MarketingPage = () => (
  <div className="flex flex-col">
    <TitleSection />
    <WhySection />
    <ScreenshotSection />
    <DemoVideoSection />
  </div>
);

export default MarketingPage;

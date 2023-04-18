import DemoVideoSection from "./DemoVideoSection";
import HowSection from "./HowSection";
import ScreenshotSection from "./ScreenshotSection";
import TitleSection from "./TitleSection";
import WhySection from "./WhySection";

const HomePage = () => (
  <div className="flex flex-col">
    <TitleSection />
    <WhySection />
    <ScreenshotSection />
    <HowSection />
    <DemoVideoSection />
  </div>
);

export default HomePage;

import Image from "next/image";

import SignInButton from "./auth/signin/SignInButton";
import DemoVideoSection from "./DemoVideoSection";
import ScreenshotSection from "./ScreenshotSection";
import TitleSection from "./TitleSection";

const MarketingPage = () => (
  <div className="flex flex-col">
    <TitleSection />
    <DemoVideoSection />
    <ScreenshotSection />
  </div>
);

export default MarketingPage;

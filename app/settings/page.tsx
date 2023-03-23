import PageTitle from "@/components/ui/PageTitle";

import ThemeSettingCard from "./ThemeSettingCard";

const Settings = () => (
  <>
    <PageTitle title="Settings" />
    <div className="grid grid-cols-3 gap-2">
      <ThemeSettingCard />
    </div>
  </>
);

export default Settings;

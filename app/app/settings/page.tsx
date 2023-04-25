import PageTitle from "@/components/ui/PageTitle";
import { getCurrentUser } from "@/lib/getUser";

import { ThemeSettingCard, DisplayNameCard, PrivacySettingCard } from "./cards";

/* Settings Page */
const Settings = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <PageTitle title="Settings" />
      <div className="grid md:grid-cols-3 gap-4 md:gap-2">
        <ThemeSettingCard />
        <DisplayNameCard
          userId={currentUser.id}
          displayName={currentUser.name}
        />
        <PrivacySettingCard
          userId={currentUser.id}
          visibility={currentUser.visibility}
        />
      </div>
    </>
  );
};

export default Settings;

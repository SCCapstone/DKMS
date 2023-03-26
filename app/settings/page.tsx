import PageTitle from "@/components/ui/PageTitle";
import { getCurrentUser } from "@/lib/getUser";

import { ThemeSettingCard, DisplayNameCard } from "./cards";

const Settings = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <PageTitle title="Settings" />
      <div className="grid grid-cols-3 gap-2">
        <ThemeSettingCard />
        <DisplayNameCard
          userId={currentUser.id}
          displayName={currentUser.displayName}
        />
      </div>
    </>
  );
};

export default Settings;

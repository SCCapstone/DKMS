import ProfileImg from "@/components/userProfile/profileImg";
import { formatNumber } from "@/lib/formatters";

import type { User } from "next-auth";

const ProfileHead = ({ user }: { user: User }) => (
  <div className="flex flex-row items-center pb-4">
    {/* @ts-expect-error Server Component */}
    <ProfileImg user={user} isProfilePage />
    <div className="flex flex-col">
      <h1 className="normal-case font-bold">
        {!user.displayName || user.username === user.displayName
          ? user.username
          : `${user.displayName} — ${user.username}`}
      </h1>
      <h2 className="normal-case">{formatNumber(user.followers)} followers</h2>
    </div>
  </div>
);

export default ProfileHead;

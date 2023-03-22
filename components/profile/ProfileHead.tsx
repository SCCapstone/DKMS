import ProfileImg from "@/components/userProfile/profileImg";
import { formatNumber } from "@/lib/formatters";

const ProfileHead = ({ user }: { user: SpotifyApi.UserProfileResponse }) => (
  <div className="flex flex-row items-center pb-4">
    {/* @ts-expect-error Server Component */}
    <ProfileImg user={user} isProfilePage />
    <div className="flex flex-col">
      <h1 className="normal-case font-bold">
        {!user.display_name || user.id === user.display_name
          ? user.id
          : `${user.display_name} — ${user.id}`}
      </h1>
      <h2 className="normal-case">
        {formatNumber(user.followers?.total)} followers
      </h2>
    </div>
  </div>
);

export default ProfileHead;

import ProfileImg from "@/components/userProfile/profileImg";
import { formatNumber } from "@/lib/formatters";

const ProfileHead = ({ user }: { user: SpotifyApi.UserProfileResponse }) => (
  <div className="flex flex-row items-center pb-4">
    <a href={user.uri}>
      {/* @ts-expect-error Server Component */}
      <ProfileImg user={user} isProfilePage hideLink />
    </a>
    <div className="flex flex-col">
      <h2 className="normal-case font-bold">
        {!user.display_name || user.id === user.display_name
          ? user.id
          : `${user.display_name} — ${user.id}`}
      </h2>
      <h3 className="normal-case">
        {formatNumber(user.followers?.total)} followers
      </h3>
    </div>
  </div>
);

export default ProfileHead;

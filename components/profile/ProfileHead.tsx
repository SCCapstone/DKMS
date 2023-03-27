import ProfileImage from "@/components/profile/ProfileImage";
import { formatNumber } from "@/lib/formatters";

const ProfileHead = ({
  displayName,
  username,
  link,
  followers,
}: {
  displayName: string;
  username: string;
  link: string;
  followers: number | undefined;
}) => (
  <div className="flex flex-row items-center pb-4">
    <a href={link}>
      {/* @ts-expect-error Server Component */}
      <ProfileImage username={username} isProfilePage hideLink />
    </a>
    <div className="flex flex-col">
      <h2 className="normal-case font-bold">
        {!displayName || username === displayName
          ? username
          : `${displayName} — ${username}`}
      </h2>
      {followers && (
        <h3 className="normal-case">{formatNumber(followers)} followers</h3>
      )}
    </div>
  </div>
);

export default ProfileHead;

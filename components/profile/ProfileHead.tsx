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
      {!displayName || username === displayName ? (
        <h2 className="normal-case font-bold overflow-hidden text-ellipsis">
          {username}
        </h2>
      ) : (
        <div className="flex flex-col min-w-[200px] lg:max-w-[700px] md:max-w-[500px] sm:max-w-[300px]">
          <h2 className="normal-case font-bold overflow-hidden text-ellipsis">
            {displayName}
          </h2>
          <h2 className="normal-case font-bold overflow-hidden text-ellipsis">
            {username}
          </h2>
        </div>
      )}
      {followers && (
        <h3 className="normal-case">{formatNumber(followers)} followers</h3>
      )}
    </div>
  </div>
);

export default ProfileHead;

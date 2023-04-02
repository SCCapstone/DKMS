import "server-only";

import getFollowedUsers from "@/lib/followers/getFollowedUsers";

import BasePanel from "./BasePanel";
import Friend from "./Friend";

const Friends = async () => {
  const users = await getFollowedUsers();
  return (
    <BasePanel title="Friends" sidebarId="friends">
      <ul>
        {users.map((user) => (
          // @ts-expect-error Next 13 Server Component
          <Friend key={user.id} username={user.username} userId={user.id} />
        ))}
      </ul>
    </BasePanel>
  );
};

export default Friends;

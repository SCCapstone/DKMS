import "server-only";

import getUsersFollowing from "@/lib/followers/getUsersFollowing";

import BasePanel from "./BasePanel";
import Friend from "./Friend";

const Friends = async () => {
  const users = await getUsersFollowing();
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

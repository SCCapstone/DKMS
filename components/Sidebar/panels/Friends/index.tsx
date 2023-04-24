import { ErrorBoundary } from "react-error-boundary";

import getFollowedUsers from "@/lib/followers/getFollowedUsers";

import BasePanel from "../BasePanel";

import Friend from "./Friend";

const Friends = async () => {
  const users = await getFollowedUsers();
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <BasePanel title="Friends" sidebarId="friends">
        <ul>
          {users.map((user) => (
            // @ts-expect-error Next 13 Server Component
            <Friend key={user.id} username={user.username} userId={user.id} />
          ))}
        </ul>
      </BasePanel>
    </ErrorBoundary>
  );
};

export default Friends;

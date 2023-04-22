import Link from "next/link";

import BasePanel from "@/components/Sidebar/panels/BasePanel";
import { getCurrentUserPremium } from "@/lib/getUser";
import getQueue from "@/lib/playback/getQueue";

const Queue = async () => {
  const isPremium = await getCurrentUserPremium();

  if (!isPremium) {
    return (
      <BasePanel title="Queue" sidebarId="queue">
        <p>Queue is a premium feature.</p>
      </BasePanel>
    );
  }

  const { queue } = await getQueue();

  // We need to disable this rule because we're checking for null
  // values in the next line, but TypeScript doesn't know that.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!queue || queue.length === 0)
    return (
      <BasePanel title="Queue" sidebarId="queue">
        <p>Nothing is playing!</p>
      </BasePanel>
    );

  return (
    <BasePanel title="Queue" sidebarId="queue">
      <ol className="divide-y-2 list-decimal list-inside text-sm">
        {queue.map((item) => (
          <li
            key={item.id}
            className="text-sm overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <Link
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              href={item === null ? `` : `/app/track/${item.id}`}
              className="font-bold text-accent"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </BasePanel>
  );
};

export default Queue;

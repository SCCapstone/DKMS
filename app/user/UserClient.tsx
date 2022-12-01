"use client";

import { signOut, useSession } from "next-auth/react";

const UserClient = () => {
  const session = useSession();

  if (session.status === "authenticated") {
    return (
      <>
        <p>
          And here is some <em>client-side</em> information about yourself
          (according to Spotify):
        </p>
        <pre>{JSON.stringify(session.data.user, null, 2)}</pre>
        <br />
        <button type="button" className="button" onClick={() => void signOut()}>
          Sign out
        </button>
      </>
    );
  }

  return <p>Loading client-side info...</p>;
};

export default UserClient;

import SessionClient from "./SessionClient";

import type { Session } from "next-auth";

const Home = ({ session }: { session: Session }) => (
  <div>
    <main>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js 13</a>,{" "}
        {session.user.displayName}!
      </h1>

      <p>
        Here is some <em>server-side</em> information about yourself (according
        to Spotify):
      </p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <hr />
      <SessionClient />
    </main>
  </div>
);

export default Home;

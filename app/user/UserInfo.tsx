import UserClient from "./UserClient";

import type { User } from "next-auth";

const Home = ({ user }: { user: User }) => (
  <div>
    <main>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js 13</a>, {user.name}!
      </h1>

      <p>
        Here is some <em>server-side</em> information about yourself (according
        to Spotify):
      </p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <hr />
      <UserClient />
    </main>
  </div>
);

export default Home;

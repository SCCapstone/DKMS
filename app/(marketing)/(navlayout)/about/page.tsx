/* About page for marketing page that displays information about team */
import Image from "next/image";

/* Team information */
const TEAM_INFORMATION = [
  {
    name: "Sophie Crane",
    profile_picture: "https://avatars.githubusercontent.com/u/77420992?v=4",
    github_link: "https://github.com/sophiecra",
    linkedin_link: "https://www.linkedin.com/in/sophie-crane-a06b68196/",
  },
  {
    name: "Dalton Craven",
    profile_picture: "https://avatars.githubusercontent.com/u/7117993?v=4",
    github_link: "https://github.com/cravend",
    linkedin_link: "https://www.linkedin.com/in/daltoncraven/",
  },
  {
    name: "Clay Crews",
    profile_picture: "https://avatars.githubusercontent.com/u/37126723?v=4",
    github_link: "https://github.com/claycrews2002",
    linkedin_link: "https://www.linkedin.com/in/jccrews/",
  },
  {
    name: "Kevin Nguyen",
    profile_picture: "https://avatars.githubusercontent.com/u/71533207?v=4",
    github_link: "https://github.com/knguyen423",
    linkedin_link: "https://www.linkedin.com/in/kn11/",
  },
  {
    name: "Mason Joseph",
    profile_picture: "https://avatars.githubusercontent.com/u/71657089?v=4",
    github_link: "https://github.com/masondjoseph",
  },
] as const;

const AboutPage = () => (
  <>
    <div className="hero p-10 bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">About DKMS</h1>
          <p className="py-6">
            DKMS is a social media-focused web application for Spotify. This
            application consists of a centralized feed where users can post,
            share, and comment with other users. Additionally, a personized
            profile page enhances the user interaction experience. This
            application uses Spotify&apos;s Web API to build and pull data, as
            well as to authenticate users. DKMS is built using Next and React.
          </p>
          <a
            href="https://github.com/sccapstone/dkms"
            className="btn btn-primary"
          >
            View GitHub
          </a>
        </div>
      </div>
    </div>
    <div className="container mx-auto py-10 space-y-10">
      <div className="card bg-base-300 max-w-2xl mx-auto text-center">
        <div className="card-body">
          <h2 className="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
            Our Team
          </h2>
          <p className="text-lg">Here are the developers of DKMS!</p>
        </div>
      </div>
      <ul className="grid gap-8 grid-cols-2 md:grid-cols-5">
        {TEAM_INFORMATION.map((member) => (
          <li
            key={member.name}
            className="card card-side card-compact bg-base-300 shadow-xl hover:shadow-2xl transition"
          >
            <div className="card-body items-center">
              <Image
                className="rounded-full"
                src={member.profile_picture}
                alt=""
                height={64}
                width={64}
              />
              <h3 className="card-title">{member.name}</h3>
              <ul className="list-disc list-inside self-start">
                <li>
                  <a className="link-primary" href={member.github_link}>
                    GitHub
                  </a>
                </li>

                {"linkedin_link" in member && (
                  <li>
                    <a className="link-primary" href={member.linkedin_link}>
                      LinkedIn
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default AboutPage;

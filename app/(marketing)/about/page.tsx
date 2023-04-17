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
];
const AboutPage = () => (
  <div className="py-24 sm:py-32">
    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Our Team
        </h2>
        <p className="mt-6 text-lg leading-8">
          Here are the developers of DKMS!
        </p>
      </div>
      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        {TEAM_INFORMATION.map((member) => (
          <li key={member.name}>
            <div className="flex items-center gap-x-6">
              <img
                className="h-16 w-16 rounded-full"
                src={member.profile_picture}
                alt=""
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight">
                  {member.name}
                </h3>
                <div className="flex flex-col">
                  <a className="link-primary" href={member.github_link}>
                    GitHub
                  </a>
                  <div>
                    {member.linkedin_link ? (
                      <a className="link-primary" href={member.linkedin_link}>
                        LinkedIn
                      </a>
                    ) : undefined}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default AboutPage;

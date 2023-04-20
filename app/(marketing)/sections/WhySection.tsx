const CARDS = [
  {
    title: "Connect",
    body: "Connect with friends! Share songs, artists, albums, or any musical thoughts you please to your following or the global DKMS feed! Navigate your friends' top artists, top songs, and playlists!",
  },
  {
    title: "Metrics",
    body: "Explore the average metrics of your own music as well as others through overall average ratings of danceability, energy, happiness, and loudness. Also choose to explore your curated recommendations that Spotify has chosen just for you!",
  },
  {
    title: "Comprehensive",
    body: "Be able to experience all the elements of the Spotify application while experiencing DKMS. Use the playback, view the queue, and search for music all while being able to connect with others!",
  },
] as const;

const WhySection = () => (
  <section className="flex flex-col bg-base-300 py-10 items-center">
    <div className="container mx-auto">
      <h2 className="text-5xl font-bold text-primary text-left pb-10">
        Why DKMS?
      </h2>
      <main className="grid grid-cols-3 w-full gap-8">
        {CARDS.map(({ title, body }) => (
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <div className="card-body">
              <h3 className="card-title">{title}</h3>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  </section>
);

export default WhySection;

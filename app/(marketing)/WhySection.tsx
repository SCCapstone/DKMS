const WhySection = () => (
  <div className="flex flex-col hero min-h-200 bg-base-300 pt-10 pb-20">
    <h1 className="text-5xl font-bold text-primary text-left pb-10">
      Why DKMS?
    </h1>
    <div className="grid grid-cols-3 w-full gap-20 px-64">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Connect</h2>
          <p>
            Connect with friends! Share songs, artists, albums, or any musical
            thoughts you please to your following or the global DKMS feed!
            Navigate your friends&apos; top artists, top songs, and playlists!
          </p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Metrics</h2>
          <p>
            Explore the average metrics of your own music as well as others
            through overall average ratings of danceability, energy, happiness,
            and loudness. Also choose to explore your curated recommendations
            that Spotify has chosen just for you!
          </p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Comprehensive</h2>
          <p>
            Be able to experience all the elements of the Spotify application
            while experiencing DKMS. Use the playback, view the queue, and
            search for music all while being able to connect with others!
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default WhySection;

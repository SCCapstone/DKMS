const AudioFeatures = ({
  audioFeatures,
}: {
  audioFeatures: Pick<
    SpotifyApi.AudioFeaturesResponse,
    "danceability" | "energy" | "valence" | "loudness"
  >;
}) => {
  const data = [
    {
      name: "Danceability",
      value: audioFeatures.danceability,
      max: 1,
    },
    {
      name: "Energy",
      value: audioFeatures.energy,

      max: 1,
    },
    {
      name: "Happiness",
      value: audioFeatures.valence,
      max: 1,
    },
    {
      name: "Loudness",
      value: audioFeatures.loudness + 60,
      max: 65,
    },
  ];

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-primary text-primary-content">
      {data.map((feature) => (
        <div key={feature.name} className="stat">
          <div className="stat-title">{feature.name}</div>
          <div className="stat-value">
            {`${Math.round((feature.value / feature.max) * 100)}%`}
          </div>
          <div className="stat-desc">
            <progress
              className="progress progress-secondary"
              value={feature.value}
              max={feature.max}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudioFeatures;

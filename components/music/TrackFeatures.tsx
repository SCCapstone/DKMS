const TrackFeatures = ({
  audioFeatures,
}: {
  audioFeatures: SpotifyApi.AudioFeaturesResponse;
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
    <div className="grid grid-cols-2 gap-4">
      {data.map((feature) => (
        <div key={feature.name}>
          <p className="font-bold uppercase text-sm">
            {`${feature.name} — ${Math.round(
              (feature.value / feature.max) * 100
            )}%`}
          </p>
          <progress
            className="progress"
            value={feature.value}
            max={feature.max}
          />
        </div>
      ))}
    </div>
  );
};

export default TrackFeatures;

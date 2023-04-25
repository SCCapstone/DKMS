/**
 * Determines averages for audio features
 *
 * @param audioFeatures audio features for multiple tracks
 * @returns average audio features
 */
const getAverageAudioFeatures = (
  audioFeatures: SpotifyApi.AudioFeaturesObject[]
) => {
  const averageAudioFeatures: SpotifyApi.AudioFeaturesResponse = {
    danceability: 0,
    energy: 0,
    key: 0,
    loudness: 0,
    mode: 0,
    speechiness: 0,
    acousticness: 0,
    instrumentalness: 0,
    liveness: 0,
    valence: 0,
    tempo: 0,
    type: "audio_features",
    id: "",
    uri: "",
    track_href: "",
    analysis_url: "",
    duration_ms: 0,
    time_signature: 0,
  };

  audioFeatures.forEach((audioFeature) => {
    averageAudioFeatures.danceability += audioFeature.danceability;
    averageAudioFeatures.energy += audioFeature.energy;
    averageAudioFeatures.key += audioFeature.key;
    averageAudioFeatures.loudness += audioFeature.loudness;
    averageAudioFeatures.mode += audioFeature.mode;
    averageAudioFeatures.speechiness += audioFeature.speechiness;
    averageAudioFeatures.acousticness += audioFeature.acousticness;
    averageAudioFeatures.instrumentalness += audioFeature.instrumentalness;
    averageAudioFeatures.liveness += audioFeature.liveness;
    averageAudioFeatures.valence += audioFeature.valence;
    averageAudioFeatures.tempo += audioFeature.tempo;
    averageAudioFeatures.duration_ms += audioFeature.duration_ms;
    averageAudioFeatures.time_signature += audioFeature.time_signature;
  });

  averageAudioFeatures.danceability /= audioFeatures.length;
  averageAudioFeatures.energy /= audioFeatures.length;
  averageAudioFeatures.key /= audioFeatures.length;
  averageAudioFeatures.loudness /= audioFeatures.length;
  averageAudioFeatures.mode /= audioFeatures.length;
  averageAudioFeatures.speechiness /= audioFeatures.length;
  averageAudioFeatures.acousticness /= audioFeatures.length;
  averageAudioFeatures.instrumentalness /= audioFeatures.length;
  averageAudioFeatures.liveness /= audioFeatures.length;
  averageAudioFeatures.valence /= audioFeatures.length;
  averageAudioFeatures.tempo /= audioFeatures.length;
  averageAudioFeatures.duration_ms /= audioFeatures.length;
  averageAudioFeatures.time_signature /= audioFeatures.length;

  return averageAudioFeatures;
};

export default getAverageAudioFeatures;

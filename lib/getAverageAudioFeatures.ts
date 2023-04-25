export type AverageAudioFeatures = Pick<
  SpotifyApi.AudioFeaturesObject,
  | "danceability"
  | "energy"
  | "key"
  | "loudness"
  | "mode"
  | "speechiness"
  | "acousticness"
  | "instrumentalness"
  | "liveness"
  | "valence"
  | "tempo"
  | "type"
>;
/**
 * Determines averages for audio features
 *
 * @param audioFeatures audio features for multiple tracks
 * @returns average audio features
 */
function getAverageAudioFeatures(
  audioFeatures: readonly AverageAudioFeatures[]
) {
  const averageAudioFeatures: AverageAudioFeatures = {
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
  };

  if (audioFeatures.length === 0) {
    return averageAudioFeatures;
  }

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

  return averageAudioFeatures;
}

export default getAverageAudioFeatures;

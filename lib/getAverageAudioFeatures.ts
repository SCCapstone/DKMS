const getAverageAudioFeatures = (
  audioFeatures: SpotifyApi.MultipleAudioFeaturesResponse
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

  audioFeatures.audio_features.forEach((audioFeature) => {
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

  averageAudioFeatures.danceability /= audioFeatures.audio_features.length;
  averageAudioFeatures.energy /= audioFeatures.audio_features.length;
  averageAudioFeatures.key /= audioFeatures.audio_features.length;
  averageAudioFeatures.loudness /= audioFeatures.audio_features.length;
  averageAudioFeatures.mode /= audioFeatures.audio_features.length;
  averageAudioFeatures.speechiness /= audioFeatures.audio_features.length;
  averageAudioFeatures.acousticness /= audioFeatures.audio_features.length;
  averageAudioFeatures.instrumentalness /= audioFeatures.audio_features.length;
  averageAudioFeatures.liveness /= audioFeatures.audio_features.length;
  averageAudioFeatures.valence /= audioFeatures.audio_features.length;
  averageAudioFeatures.tempo /= audioFeatures.audio_features.length;
  averageAudioFeatures.duration_ms /= audioFeatures.audio_features.length;
  averageAudioFeatures.time_signature /= audioFeatures.audio_features.length;

  return averageAudioFeatures;
};

export default getAverageAudioFeatures;

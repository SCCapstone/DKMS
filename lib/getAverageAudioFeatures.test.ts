import getAverageAudioFeatures from "@/lib/getAverageAudioFeatures";

const AUDIO_FEATURES = [
  {
    danceability: 0.824,
    energy: 0.652,
    key: 11,
    loudness: -5.804,
    mode: 0,
    speechiness: 0.0454,
    acousticness: 0.0169,
    instrumentalness: 0.05,
    liveness: 0.0539,
    valence: 0.818,
    tempo: 119.974,
    type: "audio_features",
  },
  {
    danceability: 0.735,
    energy: 0.578,
    key: 9,
    loudness: -8.58,
    mode: 1,
    speechiness: 0.0461,
    acousticness: 0.0643,
    instrumentalness: 0.0236,
    liveness: 0.0959,
    valence: 0.863,
    tempo: 119.992,
    type: "audio_features",
  },
] as const;

describe("getAverageAudioFeatures()", () => {
  it("correctly averages multiple audio features", () => {
    const averageAudioFeatures = getAverageAudioFeatures(AUDIO_FEATURES);

    cy.wrap(averageAudioFeatures).its("danceability").should("eq", 0.7795);
    cy.wrap(averageAudioFeatures).its("energy").should("eq", 0.615);
    cy.wrap(averageAudioFeatures).its("key").should("eq", 10);
    cy.wrap(averageAudioFeatures).its("loudness").should("eq", -7.192);
    cy.wrap(averageAudioFeatures).its("mode").should("eq", 0.5);
    cy.wrap(averageAudioFeatures).its("speechiness").should("eq", 0.04575);
    cy.wrap(averageAudioFeatures).its("acousticness").should("eq", 0.0406);
    cy.wrap(averageAudioFeatures).its("instrumentalness").should("eq", 0.0368);
    cy.wrap(averageAudioFeatures).its("liveness").should("eq", 0.0749);
    cy.wrap(averageAudioFeatures).its("valence").should("eq", 0.8405);
    cy.wrap(averageAudioFeatures).its("tempo").should("eq", 119.983);
    cy.wrap(averageAudioFeatures).its("type").should("eq", "audio_features");
  });

  it("returns the same values when only one audio feature is provided", () => {
    const averageAudioFeatures = getAverageAudioFeatures([
      AUDIO_FEATURES[0],
    ] as const);

    cy.wrap(averageAudioFeatures).its("danceability").should("eq", 0.824);
    cy.wrap(averageAudioFeatures).its("energy").should("eq", 0.652);
    cy.wrap(averageAudioFeatures).its("key").should("eq", 11);
    cy.wrap(averageAudioFeatures).its("loudness").should("eq", -5.804);
    cy.wrap(averageAudioFeatures).its("mode").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("speechiness").should("eq", 0.0454);
    cy.wrap(averageAudioFeatures).its("acousticness").should("eq", 0.0169);
    cy.wrap(averageAudioFeatures).its("instrumentalness").should("eq", 0.05);
    cy.wrap(averageAudioFeatures).its("liveness").should("eq", 0.0539);
    cy.wrap(averageAudioFeatures).its("valence").should("eq", 0.818);
    cy.wrap(averageAudioFeatures).its("tempo").should("eq", 119.974);
    cy.wrap(averageAudioFeatures).its("type").should("eq", "audio_features");
  });

  it("returns all values as 0 when no audio features are provided", () => {
    const averageAudioFeatures = getAverageAudioFeatures([]);

    cy.wrap(averageAudioFeatures).its("danceability").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("energy").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("key").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("loudness").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("mode").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("speechiness").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("acousticness").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("instrumentalness").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("liveness").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("valence").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("tempo").should("eq", 0);
    cy.wrap(averageAudioFeatures).its("type").should("eq", "audio_features");
  });
});

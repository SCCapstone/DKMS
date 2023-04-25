/**
 * Dance & tempo data from https://www.music4dance.net/home/tempi.
 *
 * @see https://www.music4dance.net/home/tempi
 */
const DANCE_DATA = [
  {
    name: "Argentine Tango",
    meter: 4,
    bpm: [112, 140],
    type: "Tango",
    styles: ["Social"],
  },
  {
    name: "Bachata",
    meter: 4,
    bpm: [108, 152],
    type: "Latin",
    styles: ["Social"],
  },
  {
    name: "Balboa",
    meter: 4,
    bpm: [160, 260],
    type: "Swing",
    styles: ["Social"],
  },
  {
    name: "Blues",
    meter: 4,
    bpm: [40, 100],
    type: "Other",
    styles: ["Social"],
  },
  {
    name: "Carolina Shag",
    meter: 4,
    bpm: [108, 132],
    type: "Swing",
    styles: ["Social"],
  },
  {
    name: "Cha Cha",
    meter: 4,
    bpm: [120, 124],
    type: "Latin",
    styles: ["American Rhythm", "International Latin"],
  },
  {
    name: "Charleston",
    meter: 4,
    bpm: [200, 300],
    type: "Swing",
    styles: ["Social"],
  },
  {
    name: "Collegiate Shag",
    meter: 4,
    bpm: [180, 200],
    type: "Swing",
    styles: ["Social"],
  },
  {
    name: "Country Two Step",
    meter: 2,
    bpm: [168, 200],
    type: "Other",
    styles: ["Social"],
  },
  {
    name: "East Coast Swing",
    meter: 4,
    bpm: [136, 144],
    type: "Swing",
    styles: ["American Rhythm"],
  },
  {
    name: "Jive",
    meter: 4,
    bpm: [152, 176],
    type: "Swing",
    styles: ["International Latin"],
  },
  {
    name: "Lindy Hop (Swing, Jitterbug)",
    meter: 4,
    bpm: [120, 180],
    type: "Swing",
    styles: ["Social"],
  },
  {
    name: "Polka",
    meter: 2,
    bpm: [120, 124],
    type: "Other",
    styles: ["American Rhythm"],
  },
  {
    name: "Quickstep",
    meter: 4,
    bpm: [192, 208],
    type: "Foxtrot",
    styles: ["International Standard"],
  },
  {
    name: "Rumba",
    meter: 4,
    bpm: [100, 144],
    type: "Latin",
    styles: ["American Rhythm", "International Latin"],
  },
  {
    name: "Salsa",
    meter: 4,
    bpm: [160, 220],
    type: "Latin",
    styles: ["Social"],
  },
  {
    name: "Tango (Ballroom)",
    meter: 4,
    bpm: [120, 128],
    type: "Tango",
    styles: ["American Smooth", "International Standard"],
  },
  {
    name: "Viennese Waltz",
    meter: 3,
    bpm: [159, 174],
    type: "Waltz",
    styles: ["American Smooth", "International Standard"],
  },
  {
    name: "West Coast Swing",
    meter: 4,
    bpm: [112, 128],
    type: "Swing",
    styles: ["American Rhythm"],
  },
];

/**
 * Determines which dance is best for a track
 *
 * @param tempo the tempo of the track
 * @param timeSignature time signature of the track
 * @returns list of dance recommendations
 */
const getDanceRecommendations = (tempo: number, timeSignature: number) =>
  DANCE_DATA.filter(
    (dance) =>
      timeSignature === dance.meter &&
      tempo >= dance.bpm[0] &&
      tempo <= dance.bpm[1]
  )
    .sort((a, b) => {
      const aMean = (a.bpm[0] + a.bpm[1]) / 2;
      const bMean = (b.bpm[0] + b.bpm[1]) / 2;
      return Math.abs(tempo - aMean) - Math.abs(tempo - bMean);
    })
    .map((dance) => dance.name);

export default getDanceRecommendations;

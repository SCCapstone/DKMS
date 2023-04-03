export const TARGET_MAPPING = {
  happy: { key: "target_valence", value: 0.8 },
  sad: { key: "target_valence", value: 0.2 },
  niche: { key: "target_popularity", value: 20 },
  popular: { key: "target_popularity", value: 80 },
  danceable: { key: "target_danceability", value: 0.8 },
} as const;

export type TargetOption = keyof typeof TARGET_MAPPING;

export const TARGET_OPTIONS = Object.keys(TARGET_MAPPING) as TargetOption[];

"use client";

import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

import PageTitle from "@/components/ui/PageTitle";

const THEME_VALUES = [
  "dark",
  "light",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
] as const;

const validateTheme = (input: string) => {
  const strThemes = THEME_VALUES.toString();

  if (!strThemes.includes(input)) {
    throw new Error("Invalid theme value.");
  }

  return input as unknown as typeof THEME_VALUES;
};

const Settings = () => {
  const [theme, setTheme] = useState<typeof THEME_VALUES>();

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="flex flex-col">
      <PageTitle title="Settings" />
      <h1 className="font-bold mr-5 mb-5">Themes</h1>
      <div>
        <select
          className="text-primary select w-full max-w-xs"
          data-choose-theme
          onChange={(e) => {
            setTheme(validateTheme(e.target.value));
          }}
          value={theme}
        >
          {THEME_VALUES.map((value) => (
            <option
              className="text-primary"
              key={value.toLowerCase()}
              value={value.toLowerCase()}
            >
              {value[0].toUpperCase() + value.substring(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Settings;

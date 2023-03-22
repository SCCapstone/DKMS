"use client";

import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

import PageTitle from "@/components/ui/PageTitle";
import { getLocalStorage } from "@/lib/localStorage";

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

type ThemeValues = typeof THEME_VALUES;
type ThemeValue = ThemeValues[number];

const validateTheme = (input: unknown): input is ThemeValue =>
  typeof input === "string" && THEME_VALUES.includes(input as ThemeValue);

const Settings = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = getLocalStorage("theme", true);
    setTheme(validateTheme(storedTheme) ? storedTheme : "light");
    themeChange(false);
  }, []);

  const handleChange = (selectedTheme: string) => {
    if (validateTheme(selectedTheme)) {
      setTheme(selectedTheme);
    } else {
      throw new Error(`Invalid theme: ${selectedTheme}`);
    }
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Settings" />
      <div className="card w-96 bg-base-300 shadow-xl">
        <div className="card-body">
          <h1 className="font-bold mr-5 mb-5">Themes</h1>
          <div>
            <select
              className="text-primary select select-bordered w-full max-w-xs"
              data-choose-theme
              onChange={(e) => handleChange(e.target.value)}
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
      </div>
    </div>
  );
};

export default Settings;

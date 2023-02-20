"use client";

import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

import PageTitle from "../../components/ui/PageTitle";

const Settings = () => {
  const themeValues = [
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
  ];

  const [theme, setTheme] = useState<string>();

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
            setTheme(e.target.value);
          }}
          value={theme}
        >
          <option className="text-primary" value="dark">
            dark (default)
          </option>
          {themeValues.map((value) => (
            <option
              className="text-primary"
              key={value.toLowerCase()}
              value={value.toLowerCase()}
            >
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Settings;

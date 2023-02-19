"use client";

import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { themeChange } from "theme-change";

import PageTitle from "../../components/ui/PageTitle";
import { getLocalStorage, setLocalStorage } from "../../lib/localStorage";

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
  const [theme, setTheme] = useState(
    JSON.parse(getLocalStorage<string>("data-theme") ?? "dark")
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    themeChange(false);
  }, []);

  useEffect(() => {
    setLocalStorage("data-theme", JSON.stringify(theme));
  }, [theme]);

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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value={theme ?? "dark"}
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

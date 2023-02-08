"use client";

import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { themeChange } from "theme-change";

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

  const [showThemes, setShowThemes] = useState(false);

  function toggle() {
    setShowThemes(!showThemes);
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    themeChange(false);
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mb-5">
        <h1 className="font-bold mr-5">Dark Mode</h1>
        <input type="checkbox" className="toggle toggle-success" />
      </div>
      <div className="flex flex-row mb-10">
        <h1 className="font-bold mr-5">Themes</h1>
        <input
          type="checkbox"
          className="toggle toggle-success"
          onChange={toggle}
        />
      </div>
      <div style={{ display: showThemes ? "block" : "none" }}>
        <select
          className="text-primary select w-full max-w-xs"
          data-choose-theme
        >
          <option className="text-primary" value="dark">
            dark
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

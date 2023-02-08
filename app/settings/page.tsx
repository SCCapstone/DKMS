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

  // change to save theme and button selections
  const [showThemes, setShowThemes] = useState(false);
  const [themes, setThemes] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  function onChangeTheme() {
    setShowThemes(!showThemes);
    setThemes(!themes);
    setDarkMode(darkMode ? !darkMode : darkMode);
  }

  function onClickDarkMode() {
    setDarkMode(!darkMode);
    setThemes(themes ? !themes : themes);
    setShowThemes(showThemes ? !showThemes : showThemes);
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    themeChange(false);
    setShowThemes(showThemes);
    setThemes(themes);
    setDarkMode(darkMode);
  }, [showThemes, themes, darkMode]);

  // ISSUES:
  // dark mode toggles on every other click of the toggle
  // theme should switch to darkmode and darkmode toggle should be on when themes toggle is off
  // theme should come up selected correctly in the theme selection list
  // toggles need to save state on page change
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mb-5">
        <h1 className="font-bold mr-5">Dark Mode</h1>
        <input
          type="checkbox"
          className="toggle toggle-success"
          onClick={onClickDarkMode}
          checked={darkMode}
          data-toggle-theme="light, dark"
          data-act-class="ACTIVECLASS"
        />
      </div>
      <div className="flex flex-row mb-10">
        <h1 className="font-bold mr-5">Themes</h1>
        <input
          type="checkbox"
          className="toggle toggle-success"
          onChange={onChangeTheme}
          checked={themes}
        />
      </div>
      <div style={{ display: showThemes ? "block" : "none" }}>
        <select
          className="text-primary select w-full max-w-xs"
          data-choose-theme
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

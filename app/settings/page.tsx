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

  const [showThemeList, setShowThemeList] = useState(false);
  const [themeToggle, setThemeToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  function onChangeTheme() {
    setShowThemeList(!showThemeList);
    setThemeToggle(!themeToggle);
    setDarkMode(darkMode ? !darkMode : darkMode);
  }

  function onClickDarkMode() {
    setThemeToggle(themeToggle ? !themeToggle : themeToggle);
    setShowThemeList(showThemeList ? !showThemeList : showThemeList);
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    themeChange(false);
  }, []);

  useEffect(() => {
    setLocalStorage("data-theme", JSON.stringify(theme));
  }, [theme]);

  // ISSUES:
  // dark mode toggles on every other click of the toggle
  // theme should switch to darkmode and darkmode toggle should be on when themes toggle is off
  // theme should come up selected correctly in the theme selection list
  // toggles need to save state on page change
  return (
    <div className="flex flex-col">
      <PageTitle title="Settings" />
      <div className="flex flex-row mb-5">
        <h1 className="font-bold mr-5">Dark Mode</h1>
        <input
          type="checkbox"
          className="toggle toggle-success"
          onClick={onClickDarkMode}
        />
      </div>
      <div className="flex flex-row mb-10">
        <h1 className="font-bold mr-5">Themes</h1>
        <input
          type="checkbox"
          className="toggle toggle-success"
          onChange={onChangeTheme}
          checked={themeToggle}
        />
      </div>
      <div style={{ display: showThemeList ? "block" : "none" }}>
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

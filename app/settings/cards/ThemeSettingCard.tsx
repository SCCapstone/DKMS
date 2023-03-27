"use client";

import { useTheme } from "next-themes";
import { toast } from "react-hot-toast";

import { THEME_VALUES, validateTheme } from "@/lib/theme";

const ThemeSettingCard = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (selectedTheme: string) => {
    if (validateTheme(selectedTheme)) {
      setTheme(selectedTheme);
      toast.success("Theme selected!");
    } else {
      throw new Error(`Invalid theme: ${selectedTheme}`);
    }
  };

  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body">
        <h4 className="card-title">Theme</h4>
        <select
          className="text-primary select select-bordered w-full"
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
  );
};

export default ThemeSettingCard;

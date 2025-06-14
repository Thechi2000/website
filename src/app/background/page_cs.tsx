"use client";

import Title from "@/components/title";
import { toDisplayString } from "@/string";
import { useEffect, useState } from "react";
import LSystemEditor from "@/components/lsystem_editor";
import { BACKGROUND_PRESETS, setBackground } from "@/background";

export default function BackgroundPageCS() {
  const [backgroundName, setBackgroundName] = useState("static");
  useEffect(() => {
    const value = localStorage.getItem("background");
    if (value) {
      setBackgroundName(JSON.parse(value).name);
    }
  }, []);

  return (
    <>
      <Title text="Background" />
      <label>Select your favorite background:</label>&nbsp;
      <select
        value={backgroundName}
        onChange={(e) => {
          setBackgroundName(e.target.value);

          if (e.target.value === "customLSystem") {
            return;
          }

          setBackground(BACKGROUND_PRESETS[e.target.value]);
        }}
      >
        {Object.entries(BACKGROUND_PRESETS).map(([name, lsystem]) => (
          <option key={name} value={name}>
            {toDisplayString(name)}
          </option>
        ))}
        <option value="customLSystem">customLSystem</option>
      </select>
      {backgroundName === "customLSystem" ? (
        <LSystemEditor
          initialValue={
            localStorage.getItem("background")
              ? JSON.parse(localStorage.getItem("background")!)
              : null
          }
          onSave={(lsystem) =>
            setBackground({
              type: "lsystem",
              name: lsystem.name,
              metadata: lsystem,
            })
          }
        />
      ) : (
        <></>
      )}
    </>
  );
}

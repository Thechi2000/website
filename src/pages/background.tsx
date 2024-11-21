import Breadcrumbs from "@/components/breadcrumbs";
import {
  BackgroundMetadata,
  LSystem,
  LSYSTEM_PRESETS,
  LSystemRenderer,
  PEANO_GOSPER,
} from "@/components/lsystem";
import Title from "@/components/title";
import { toDisplayString } from "@/utils";
import { useEffect, useState } from "react";
import LSystemEditor from "@/components/lsystem_editor";
import { useRouter } from "next/router";

export default function Page() {
  const [lsystem, setLSystem] = useState("peano-gosper");
  useEffect(() => {
    const value = localStorage.getItem("background");
    if (value) {
      setLSystem(JSON.parse(value).name);
    }
  }, []);

  const router = useRouter();

  function setBackground(lsystem: BackgroundMetadata) {
    localStorage.setItem("background", JSON.stringify(lsystem));
    router.reload();
  }

  return (
    <>
      <Title text="Background" />
      <Breadcrumbs />
      <p>{lsystem}</p>
      <label>Select your favorite background:</label>&nbsp;
      <select
        value={lsystem}
        onChange={(e) => {
          setLSystem(e.target.value);

          if (e.target.value === "custom") {
            return;
          }

          setBackground(LSYSTEM_PRESETS[e.target.value]);
        }}
      >
        {Object.entries(LSYSTEM_PRESETS).map(([name, lsystem]) => (
          <option key={name} value={name}>
            {toDisplayString(name)}
          </option>
        ))}
        <option value="custom">Custom</option>
      </select>
      {lsystem === "custom" ? (
        <LSystemEditor
          initialValue={
            localStorage.getItem("background")
              ? JSON.parse(localStorage.getItem("background")!)
              : null
          }
          onSave={setBackground}
        />
      ) : (
        <></>
      )}
    </>
  );
}

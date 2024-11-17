import Breadcrumbs from "@/components/breadcrumbs";
import {
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

  return (
    <>
      <Title text="Background" />
      <Breadcrumbs />
      <p>{lsystem}</p>
      <label>Select your favorite background:</label>&nbsp;
      <select
        value={lsystem}
        onChange={(e) => {
          if (e.target.value === "custom") {
            return;
          }

          setLSystem(e.target.value);
          localStorage.setItem(
            "background",
            JSON.stringify(LSYSTEM_PRESETS[e.target.value])
          );
          router.reload();
        }}
      >
        {Object.entries(LSYSTEM_PRESETS).map(([name, lsystem]) => (
          <option key={name} value={name}>
            {toDisplayString(name)}
          </option>
        ))}
        <option value="custom">Custom</option>
      </select>
      {lsystem === "custom" ? <LSystemEditor /> : <></>}
    </>
  );
}

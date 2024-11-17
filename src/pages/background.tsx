import Breadcrumbs from "@/components/breadcrumbs";
import {
  LSYSTEM_PRESETS,
  LSystemRenderer,
  PEANO_GOSPER,
} from "@/components/lsystem";
import Title from "@/components/title";
import { toDisplayString } from "@/utils";
import { useState } from "react";
import styles from "@/styles/Background.module.scss";
import LSystemEditor from "@/components/lsystem_editor";

export default function Page() {
  const [lsystem, setLSystem] = useState("peano-gosper");

  return (
    <>
      <Title text="Background" />
      <Breadcrumbs />
      <p>{lsystem}</p>
      <label>Select your favorite background:</label>&nbsp;
      <select onChange={(e) => setLSystem(e.target.value)}>
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

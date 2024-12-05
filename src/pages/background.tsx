import Breadcrumbs from "@/components/breadcrumbs";
import { LSYSTEM_PRESETS } from "@/components/lsystem";
import Title from "@/components/title";
import { fetchDataServerSideProps, toDisplayString } from "@/utils";
import { useEffect, useState } from "react";
import LSystemEditor from "@/components/lsystem_editor";
import { useRouter } from "next/router";
import { BACKGROUND_PRESETS, setBackground } from "@/background";

export default function Page() {
  const [backgroundName, setBackgroundName] = useState("static");
  useEffect(() => {
    const value = localStorage.getItem("background");
    if (value) {
      setBackgroundName(JSON.parse(value).name);
    }
  }, []);

  const router = useRouter();

  return (
    <>
      <Title text="Background" />
      <Breadcrumbs />
      <label>Select your favorite background:</label>&nbsp;
      <select
        value={backgroundName}
        onChange={(e) => {
          setBackgroundName(e.target.value);

          if (e.target.value === "customLSystem") {
            return;
          }

          setBackground(BACKGROUND_PRESETS[e.target.value], router);
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
            setBackground(
              { type: "lsystem", name: lsystem.name, metadata: lsystem },
              router
            )
          }
        />
      ) : (
        <></>
      )}
    </>
  );
}

export const getServerSideProps = fetchDataServerSideProps;

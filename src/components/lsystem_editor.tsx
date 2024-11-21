import { useEffect, useState } from "react";
import {
  BackgroundMetadata,
  LSYSTEM_PRESETS,
  LSystemRenderer,
  PEANO_GOSPER,
} from "./lsystem";
import styles from "@/styles/LSystemEditor.module.scss";

export default function LSystemEditor({
  initialValue = LSYSTEM_PRESETS["peano-gosper"],
  onSave,
}: {
  initialValue: BackgroundMetadata | null;
  onSave: (b: BackgroundMetadata) => void;
}) {
  const [length, setLength] = useState(initialValue?.length || 10);
  const [color, setColor] = useState(initialValue?.stroke.color || "#aaaaaa");
  const [width, setWidth] = useState(initialValue?.stroke.width || 10);
  const [iterations, setIterations] = useState(initialValue?.iterations || 3);
  const [angle, setAngle] = useState(
    (initialValue?.lsystem.angle as number) * (180 / Math.PI)
  );

  const [lsystem, setLSystem] = useState(initialValue?.lsystem || PEANO_GOSPER);
  useEffect(() => {
    setLSystem((ls) => ({ ...ls, angle: angle * (Math.PI / 180) }));
  }, [lsystem, angle]);

  return (
    <div>
      <h2>Custom</h2>
      <h3>LSystem properties</h3>
      <div className={styles.input}>
        <label className={styles.label}>Axiom:</label>
        <input
          className={styles.input}
          type="text"
          value={lsystem.axiom}
          onChange={(e) => setLSystem({ ...lsystem, axiom: e.target.value })}
        />
      </div>
      <br />
      <div className={styles.input}>
        <label className={styles.label}>Angle:</label>
        <input
          className={styles.input}
          type="number"
          value={angle || ""}
          onChange={(e) => setAngle(Number(e.target.value))}
        />
      </div>
      <br />
      <div className={styles.input}>
        <label className={styles.label}>Rules:</label>
        <textarea
          rows={5}
          cols={40}
          defaultValue={Object.entries(lsystem.rules)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")}
          onChange={(e) =>
            setLSystem({
              ...lsystem,
              rules: e.target.value.split("\n").reduce((acc, line) => {
                const [key, value] = line.split(":");
                if (key && value) {
                  acc[key] = value.trim();
                  return acc;
                } else {
                  return acc;
                }
              }, {} as any),
            })
          }
        />
      </div>

      <h3>Rendering properties</h3>
      <div className={styles.input}>
        <label className={styles.label}>Length:</label>
        <input
          className={styles.input}
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>
      <br />
      <div className={styles.input}>
        <label className={styles.label}>Color:</label>
        <input
          className={styles.input}
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <br />
      <div className={styles.input}>
        <label className={styles.label}>Width:</label>
        <input
          className={styles.input}
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </div>
      <br />
      <div className={styles.input}>
        <label className={styles.label}>Iterations:</label>
        <input
          className={styles.input}
          type="number"
          value={iterations}
          onChange={(e) => setIterations(Number(e.target.value))}
        />
      </div>
      <br />

      <div className={styles.rendererContainer}>
        <LSystemRenderer
          className={styles.renderer}
          lsystem={lsystem}
          iterations={iterations > 3 ? 3 : iterations}
          margin={5}
          length={length}
          stroke={{
            color: color,
            width: width,
          }}
        />
      </div>

      <button
        onClick={() =>
          onSave({
            iterations,
            length,
            lsystem,
            name: "custom",
            stroke: {
              color,
              width,
            },
          })
        }
      >
        Save
      </button>
    </div>
  );
}

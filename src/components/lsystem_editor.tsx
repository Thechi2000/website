import { useEffect, useState } from "react";
import { LSystemRenderer, PEANO_GOSPER } from "./lsystem";
import styles from "@/styles/LSystemEditor.module.scss";

export default function LSystemEditor() {
  const [length, setLength] = useState(10);
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(1);
  const [iterations, setIterations] = useState(1);
  const [angle, setAngle] = useState(60);

  const [lsystem, setLSystem] = useState(PEANO_GOSPER);
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
          iterations={iterations}
          margin={5}
          length={length}
          stroke={{
            color: color,
            width: width,
          }}
        />
      </div>
    </div>
  );
}

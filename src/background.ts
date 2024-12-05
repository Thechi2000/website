import { NextRouter } from "next/router";
import { LSYSTEM_PRESETS, LSystemMetadata } from "./components/lsystem";

export type Background = { name: string } & (
  | { type: "static" }
  | { type: "lsystem"; metadata: LSystemMetadata }
);

export function setBackground(background: Background, router: NextRouter) {
  localStorage.setItem("background", JSON.stringify(background));
  router.reload();
}

export const BACKGROUND_PRESETS: { [key: string]: Background } = {
  static: {
    type: "static",
    name: "static",
  },
  "peano-gosper": {
    type: "lsystem",
    name: "peano-gosper",
    metadata: LSYSTEM_PRESETS["peano-gosper"],
  },
  hilbert: {
    type: "lsystem",
    name: "hilbert",
    metadata: LSYSTEM_PRESETS["hilbert"],
  },
  "quadratic-gosper": {
    type: "lsystem",
    name: "quadratic-gosper",
    metadata: LSYSTEM_PRESETS["quadratic-gosper"],
  },
};

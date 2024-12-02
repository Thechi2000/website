import Console from "@/components/console";
import {
  BackgroundMetadata,
  LSYSTEM_PRESETS,
  LSystemRenderer,
} from "@/components/lsystem";
import Navbar from "@/components/navbar";
import "@/styles/globals.scss";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [background, setBackground] = useState<BackgroundMetadata | null>(null);
  useEffect(() => {
    const value = localStorage.getItem("background");
    if (value) {
      setBackground(JSON.parse(value));
    } else {
      const background = LSYSTEM_PRESETS["peano-gosper"];
      setBackground(background);
      localStorage.setItem("background", JSON.stringify(background));
    }
  }, []);

  return (
    <ThemeProvider>
      <Console data={pageProps} />
      <Navbar />
      {background ? (
        <div id="background">
          <LSystemRenderer
            iterations={background.iterations}
            lsystem={background.lsystem}
            length={background.length}
            margin={10}
            stroke={background.stroke}
          />
        </div>
      ) : (
        <></>
      )}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

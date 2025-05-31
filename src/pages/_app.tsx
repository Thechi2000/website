import Console from "@/components/console";
import { LSystemRenderer } from "@/components/lsystem";
import Navbar from "@/components/navbar";
import "@/styles/globals.scss";
import { ThemeProvider, useTheme } from "next-themes";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import bgDark from "@/../public/background-dark.png";
import bgLight from "@/../public/background-light.png";
import { Background } from "@/background";

function Bg() {
  const theme = useTheme();
  const [background, setBackground] = useState<Background | null>(null);

  useEffect(() => {
    const value = localStorage.getItem("background");
    if (value) {
      setBackground(JSON.parse(value));
    } else {
      const background: Background = { type: "static", name: "Static" };
      setBackground(background);
      localStorage.setItem("background", JSON.stringify(background));
    }
  }, []);

  let backgroundComponent = <></>;

  switch (background?.type) {
    case "lsystem":
      backgroundComponent = (
        <div id="background">
          <LSystemRenderer
            iterations={background.metadata.iterations}
            lsystem={background.metadata.lsystem}
            length={background.metadata.length}
            margin={10}
            stroke={background.metadata.stroke}
          />
        </div>
      );
      break;

    case "static":
      backgroundComponent = (
        <div
          style={{
            backgroundImage: `url(${
              (theme.theme === "dark" ? bgDark : bgLight).src
            })`,
            position: "fixed",
            zIndex: -1,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      );
      break;

    default:
      break;
  }

  return backgroundComponent;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Console data={pageProps} />
      <Navbar />
      <Bg />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

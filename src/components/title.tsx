"use client";

import { doom, useAsciiText } from "react-ascii-text";
import styles from "@/styles/Title.module.scss";
import { useEffect, useState } from "react";

export default function Title({ text }: { text: string }) {
  const asciiTextRef = useAsciiText({
    isAnimated: true,
    animationLoop: false,
    fadeInOnly: true,
    animationDelay: 0,
    animationSpeed: 10,
    font: doom,
    text: [text],
  });

  const [hasJs, setHasJs] = useState(false);
  const jsClass = hasJs ? " " + styles.hasJs : "";
  useEffect(() => setHasJs(true), []);

  return (
    <>
      <pre className={styles.ascii + jsClass} ref={asciiTextRef as any} />
      <h1 className={styles.normal + jsClass}>{text}</h1>
    </>
  );
}

"use client";

import { doom, useAsciiText } from "react-ascii-text";
import styles from "@/styles/Title.module.scss";

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

  return (
    <>
      <pre className={styles.ascii} ref={asciiTextRef as any} />
      <h1 className={styles.normal}>{text}</h1>
    </>
  );
}

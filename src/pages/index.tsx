import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { doom, useAsciiText } from "react-ascii-text";
import { PAGES } from "@/pages";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const asciiTextRef = useAsciiText({
    isAnimated: false,
    font: doom,
    text: ["Ludovic Mermod"],
  });

  return (
    <div>
      {" "}
      <pre ref={asciiTextRef} />
      <p>Master student in Computer Science at EPFL</p>
      <p>Type :g &lt;page&gt; to go to a page:</p>
      <ul>
        {PAGES.map((p) => (
          <li key={p}>
            <a href={`/${p}`}>{p}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

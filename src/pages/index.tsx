import { Inter } from "next/font/google";
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
      <pre ref={asciiTextRef} />
      <p>Master student in Computer Science at EPFL</p>
      <p>Type :g &lt;page&gt; to go to a page:</p>
      <ul>
        {Object.entries(PAGES).map((p) => (
          <li key={p[0]}>
            <a href={`/${p[1]}`}>{p[0]}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

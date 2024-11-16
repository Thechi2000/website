import { Inter } from "next/font/google";
import { doom, useAsciiText } from "react-ascii-text";
import { PAGES } from "@/pages";
import Title from "@/components/title";
import { iterate, LSystemRenderer, PEANO_GOSPER } from "@/lsystem";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Title text="Ludovic Mermod" />
      <LSystemRenderer
        iterations={6}
        lsystem={PEANO_GOSPER}
        length={5}
        margin={5}
        stroke={{ color: "black", width: 1 }}
      />
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

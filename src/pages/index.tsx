import { Inter } from "next/font/google";
import { doom, useAsciiText } from "react-ascii-text";
import { PAGES } from "@/pages";
import Title from "@/components/title";
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Title text="Ludovic Mermod" />
      <Breadcrumbs />
      <p>Master student in Computer Science at EPFL</p>
      <p>Type :g &lt;page&gt; to go to a page:</p>
      <ul>
        {Object.entries(PAGES).map((p) => (
          <li key={p[0]}>
            <Link href={`/${p[1]}`}>{p[0]}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

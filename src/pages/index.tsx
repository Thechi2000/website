import { Inter } from "next/font/google";
import { doom, useAsciiText } from "react-ascii-text";
import { PAGES } from "@/pages";
import Title from "@/components/title";
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";
import { fetchDataServerSideProps, NextJSMarkdown } from "@/utils";
import Markdown from "react-markdown";
import { Data } from "@/models";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: Data) {
  return (
    <div>
      <Title text="Ludovic Mermod" />
      <Breadcrumbs />
      <NextJSMarkdown>{props.me.description}</NextJSMarkdown>
    </div>
  );
}

export const getServerSideProps = fetchDataServerSideProps;

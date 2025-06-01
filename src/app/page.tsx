import Title from "@/components/title";
import { NextJSMarkdown } from "@/markdown";
import { fetchData } from "@/fetch";
import { Metadata, ResolvingMetadata } from "next";

export default async function Home() {
  const props = await fetchData();

  return (
    <div>
      <Title text="Ludovic Mermod" />
      <NextJSMarkdown>{props.me.description}</NextJSMarkdown>
    </div>
  );
}

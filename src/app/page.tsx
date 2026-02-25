import Title from "@/components/title";
import { extractMarkdownFirstSentence, NextJSMarkdown } from "@/markdown";
import { fetchData } from "@/fetch";
import { generateMetadataWrapper } from "@/og";

export default async function Home() {
  const props = await fetchData();

  return (
    <div>
      <Title text={`${props.me.name} ${props.me.surname}`} />
      <NextJSMarkdown>{props.me.description}</NextJSMarkdown>
    </div>
  );
}


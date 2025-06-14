import Title from "@/components/title";
import { extractMarkdownFirstSentence, NextJSMarkdown } from "@/markdown";
import { fetchData } from "@/fetch";
import { generateMetadataWrapper } from "@/og";

export default async function Home() {
  const props = await fetchData();

  return (
    <div>
      <Title text="Ludovic Mermod" />
      <NextJSMarkdown>{props.me.description}</NextJSMarkdown>
    </div>
  );
}

export const generateMetadata = generateMetadataWrapper(async () => {
  const data = await fetchData();

  return {
    description: extractMarkdownFirstSentence(data.me.description),
  };
});

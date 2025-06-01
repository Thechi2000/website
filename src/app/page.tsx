import Title from "@/components/title";
import { fetchData, NextJSMarkdown } from "@/utils";

export default async function Home() {
  const props = await fetchData();

  return (
    <div>
      <Title text="Ludovic Mermod" />
      <NextJSMarkdown>{props.me.description}</NextJSMarkdown>
    </div>
  );
}

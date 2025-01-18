import Title from "@/components/title";
import { fetchDataServerSideProps, NextJSMarkdown } from "@/utils";
import { Data } from "@/models";

export default function Home(props: Data) {
  return (
    <div>
      <Title text="Ludovic Mermod" />
      <NextJSMarkdown>{props.me.description}</NextJSMarkdown>
    </div>
  );
}

export const getServerSideProps = fetchDataServerSideProps;

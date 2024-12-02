import Title from "@/components/title";
import Breadcrumbs from "@/components/breadcrumbs";
import { fetchDataServerSideProps, NextJSMarkdown } from "@/utils";
import { Data } from "@/models";

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

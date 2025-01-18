import Title from "@/components/title";
import { Data } from "@/models";
import { fetchDataServerSideProps, NextJSMarkdown } from "@/utils";

export default function Page({ projects }: Data) {
  return (
    <>
      <Title text="Projects" />
      {projects.map((p) => (
        <>
          <h2>{p.name}</h2>
          <NextJSMarkdown>
            {p.description +
              (p.markdownUrl ? ` [Learn more...](/projects/${p.id})` : "")}
          </NextJSMarkdown>
          <p>
            <strong>Languages:</strong> {p.languages.join(", ")}
          </p>
        </>
      ))}
    </>
  );
}

export const getServerSideProps = fetchDataServerSideProps;

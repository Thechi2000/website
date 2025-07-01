import Title from "@/components/title";
import { NextJSMarkdown } from "@/markdown";
import { fetchData } from "@/fetch";
import { generateMetadataWrapper } from "@/og";

export default async function Page() {
  const { projects } = await fetchData();

  return (
    <>
      <Title text="Projects" />
      {projects.map((p) => (
        <span key={p.id}>
          <h2>{p.name}</h2>
          <NextJSMarkdown>
            {p.description +
              (p.markdownUrl || p.pdfUrl
                ? ` [Learn more...](/projects/${p.id})`
                : "")}
          </NextJSMarkdown>
          <p>
            <strong>Language{p.languages.length > 1 ? "s" : ""}:</strong>{" "}
            {p.languages.join(", ")}
          </p>
        </span>
      ))}
    </>
  );
}

export const generateMetadata = generateMetadataWrapper(async () => {
  return {
    title: "Projects",
    description: "The important projects I've lead or taken part in",
  };
});

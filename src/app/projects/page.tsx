import Title from "@/components/title";
import { fetchData, NextJSMarkdown } from "@/utils";

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
              (p.markdownUrl ? ` [Learn more...](/projects/${p.id})` : "")}
          </NextJSMarkdown>
          <p>
            <strong>Languages:</strong> {p.languages.join(", ")}
          </p>
        </span>
      ))}
    </>
  );
}

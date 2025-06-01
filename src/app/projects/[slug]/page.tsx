import Title from "@/components/title";
import { Data } from "@/models";
import { fetchData, NextJSMarkdown } from "@/utils";
import Link from "next/link";

export default async function Page(req: { params: Promise<{ slug: string }> }) {
  const data: Data = await fetchData();
  const { slug } = await req.params;
  const project = data.projects.find((p) => p.id === slug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  const markdown = project.markdownUrl
    ? await (await fetch(project.markdownUrl)).text()
    : "";

  return (
    <>
      <Title text={project.name} />
      {project.repository ? (
        <Link className="text-center" href={project.repository} target="_blank">
          --&gt; See the repository &lt;--
        </Link>
      ) : (
        <> </>
      )}
      <NextJSMarkdown origin={project.resourcesBaseUrl}>
        {markdown}
      </NextJSMarkdown>
    </>
  );
}

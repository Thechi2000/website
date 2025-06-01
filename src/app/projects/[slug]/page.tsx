import Title from "@/components/title";
import { extractMarkdownFirstSentence, NextJSMarkdown } from "@/markdown";
import { Data } from "@/models";
import { fetchData } from "@/fetch";
import Link from "next/link";
import { generateMetadataWrapper } from "@/og";

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

export const generateMetadata = generateMetadataWrapper<{ slug: string }>(
  async ({ params: { slug } }) => {
    const data = await fetchData();
    const project = data.projects.find((p) => p.id === slug);

    if (!project) {
      return {
        notFound: true,
      };
    }

    console.log(slug);
    return {
      title: project.name,
      description: extractMarkdownFirstSentence(project.description),
    };
  }
);

import Title from "@/components/title";
import {
  extractMarkdownFirstSentence,
  findImage,
  NextJSMarkdown,
} from "@/markdown";
import { Data } from "@/models";
import { fetchData } from "@/fetch";
import Link from "next/link";
import { generateMetadataWrapper } from "@/og";
import HeaderLinks from "@/components/header_links";

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
      <HeaderLinks
        entries={[
          [project.repository, "See the repository"],
          [project.pdfUrl, "See the PDF report"],
        ]}
      />

      <NextJSMarkdown origin={project.resourcesBaseUrl}>
        {markdown}
      </NextJSMarkdown>
      {project.pdfUrl ? (
        <object
          data={project.pdfUrl}
          type="application/pdf"
          style={{ height: "70vh" }}
        >
          <p>Something wrong occurred while displaying the PDF :/</p>
          <p>
            <a href={project.pdfUrl}>Access it here</a>
          </p>
        </object>
      ) : (
        <></>
      )}
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

    const markdown = project.markdownUrl
      ? await (await fetch(project.markdownUrl)).text()
      : "";

    var imageUrl = findImage(markdown);
    if (typeof imageUrl === "string") {
      imageUrl = new URL(`./${imageUrl}`, project.markdownUrl || "").toString();
    }

    return {
      title: project.name,
      openGraph: {
        type: "website",
        images: imageUrl || undefined,
      },
      description: extractMarkdownFirstSentence(project.description),
    };
  }
);

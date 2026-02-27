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
import { notFound } from "next/navigation";
import { DocumentRenderer } from "@/components/document";

export default async function Page(req: { params: Promise<{ slug: string }> }) {
  const data: Data = await fetchData();
  const { slug } = await req.params;
  const project = data.projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  let pdf = project.documents?.find((d) => d.type == "pdf");

  return (
    <>
      <Title text={project.name} />
      <HeaderLinks
        entries={[
          [project.repository, "See the repository"],
          ...((pdf ? [[pdf.url, "See the PDF report"]] : []) as [
            string,
            string,
          ][]),
        ]}
      />

      {project.documents
        ?.filter((d) => d.rendered)
        ?.map((d) => (
          <DocumentRenderer doc={d} key={d.type} />
        ))}
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

    let imageUrl = undefined;

    let md = project.documents?.find((p) => p.type == "markdown");
    if (md) {
      const markdown = md.url ? await (await fetch(md.url)).text() : "";

      imageUrl = findImage(markdown);
      if (typeof imageUrl === "string") {
        imageUrl = new URL(`./${imageUrl}`, md.url || "").toString();
      }
    }

    return {
      title: project.name,
      openGraph: {
        type: "website",
        images: imageUrl || undefined,
      },
      description: extractMarkdownFirstSentence(project.description),
    };
  },
);

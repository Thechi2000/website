import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { Data } from "@/models";
import { NextJSMarkdown } from "@/utils";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { readFile } from "node:fs/promises";

export default function Page({
  project,
  markdown,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <>
      <Title text={project.name} />
      <Breadcrumbs />
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data: Data = JSON.parse((await readFile("data.json")).toString());
  const project = data.projects.find((p) => p.id === context.params!.slug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
      markdown: project.markdownUrl
        ? await (await fetch(project.markdownUrl)).text()
        : "",
    },
  };
}

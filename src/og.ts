import { Metadata, ResolvingMetadata } from "next";
import { AUTHOR, WEBSITE_BASE_URL, WEBSITE_NAME } from "./consts";
import { TemplateString } from "next/dist/lib/metadata/types/metadata-types";
import { calvinS } from "react-ascii-text";

export function generateTitle(page: string): string {
  return page ? `${page} | ${WEBSITE_NAME}` : WEBSITE_NAME;
}

export type GenerateMetadata<P = {}, S = {}> = (
  props: { params: P; searchParams: S },
  parent: ResolvingMetadata
) => Promise<Metadata>;

export function generateMetadataWrapper<P = {}, S = {}>(
  generator: GenerateMetadata<P, S>
): GenerateMetadata<Promise<P>, Promise<S>> {
  return async (props, parent) => {
    var metadata = await generator(
      {
        params: await props.params,
        searchParams: await props.searchParams,
      },
      parent
    );

    if (typeof metadata.title !== "object") {
      metadata.title = generateTitle(metadata.title || "");
    }

    if (!metadata.authors) {
      metadata.authors = [
        {
          name: AUTHOR,
          url: WEBSITE_BASE_URL,
        },
      ];
    }

    if (!metadata.openGraph) {
      metadata.openGraph = { type: "website" };
    }

    return metadata;
  };
}

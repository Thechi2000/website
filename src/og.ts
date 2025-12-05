import { Metadata, ResolvingMetadata } from "next";
import { WEBSITE_BASE_URL } from "./consts";
import { fetchData } from "./fetch";

export function generateTitle(
  page: string | undefined,
  websiteName: string
): string {
  return page ? `${page} | ${websiteName}` : websiteName;
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

    const { me } = await fetchData();

    if (typeof metadata.title !== "object") {
      metadata.title = generateTitle(
        metadata.title,
        `${me.name} ${me.surname}`
      );
    }

    if (!metadata.authors) {
      metadata.authors = [
        {
          name: `${me.name} ${me.surname}`,
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

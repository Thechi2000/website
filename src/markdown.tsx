import Link from "next/link";
import { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LINK_REGEX = /\[(.*?)\]\((.*?)\)/;
const IMAGE_REGEX = /\[(.*?)\]\((.*?\.(?:png|jpg|jpeg))\)/;

export function NextJSMarkdown({
  origin,
  options,
  children,
}: {
  origin?: string;
  options?: Parameters<typeof Markdown>[0];
  children: string;
}): ReturnType<typeof Markdown> {
  return (
    <Markdown
      {...options}
      components={{
        a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
          <Link href={props.href || "/404"}>{props.children}</Link>
        ),
        img: (props: ImgHTMLAttributes<HTMLImageElement>) => {
          return (
            <img
              {...props}
              alt={props.alt || ""}
              style={{ maxWidth: "80ch" }}
              src={`${origin || ""}/${props.src || ""}`}
            />
          );
        },
        ...options?.components,
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </Markdown>
  );
}

export function removeLinks(line: string) {
  return line.replace(LINK_REGEX, "$1");
}

export function extractMarkdownFirstSentence(md: string) {
  return removeLinks(md.split("\n").filter((l) => !l.startsWith("#"))[0]).split(
    /\./
  )[0];
}

export function findImage(md: string): string | null {
  const m = md.match(IMAGE_REGEX);
  if (m === null) {
    return null;
  }

  return m[2];
}

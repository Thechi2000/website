import Link from "next/link";
import { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

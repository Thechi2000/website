import Link from "next/link";
import Image from "next/image";
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
  console.log(options);
  return (
    <Markdown
      {...options}
      components={{
        a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
          <Link href={props.href || "/404"}>{props.children}</Link>
        ),
        img: (props: ImgHTMLAttributes<HTMLImageElement>) => {
          console.log("hi");
          console.log(`${origin || ""}/${props.src || ""}`);
          return (
            <img
              {...props}
              style={{ maxWidth: "80ch" }}
              src={`${origin || ""}/${props.src || ""}`}
            />
          );
        },
        ...options?.components,
      }}
      children={children}
      remarkPlugins={[remarkGfm]}
    />
  );
}

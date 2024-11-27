import Link from "next/link";
import { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Data } from "./models";

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
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </Markdown>
  );
}

export async function fetchData(): Promise<Data> {
  const data: Data = await (
    await fetch(
      `https://lmermod.ch/data/data${
        process.env.NODE_ENV !== "production" ? ".dev" : ""
      }.json`
    )
  ).json();

  data.me.description = await fetch(data.me.description).then((res) =>
    res.text()
  );

  return data;
}

export async function fetchDataServerSideProps() {
  return {
    props: await fetchData(),
  };
}

export function toDisplayString(s: string) {
  return s.replaceAll(
    /(^|-)(\w)/g,
    (_, g1, g2) => `${g1 === "-" ? " " : ""}${g2.toUpperCase()}`
  );
}

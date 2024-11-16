import Link from "next/link";
import { AnchorHTMLAttributes, HTMLAttributeAnchorTarget } from "react";
import Markdown from "react-markdown";
import { TypeOfExpression } from "typescript";

export const NextJSMarkdown: typeof Markdown = ({ components, ...props }) =>
  Markdown({
    components: {
      a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <Link href={props.href || "/404"}>{props.children}</Link>
      ),
      ...components,
    },
    ...props,
  });

import { NextJSMarkdown } from "@/markdown";
import { Document } from "@/models";

export async function DocumentRenderer({ doc }: { doc: Document }) {
  console.log(doc);

  switch (doc.type) {
    case "markdown": {
      const markdown = await (await fetch(doc.url)).text();

      return (
        <NextJSMarkdown origin={doc.resourcesBaseUrl}>
          {markdown}
        </NextJSMarkdown>
      );
    }
    case "pdf": {
      return (
        <object
          data={doc.url}
          type="application/pdf"
          style={{ height: "70vh" }}
        >
          <p>Something wrong occurred while displaying the PDF :/</p>
          <p>
            <a href={doc.url}>Access it here</a>
          </p>
        </object>
      );
    }
  }
}

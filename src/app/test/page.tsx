
"use client";

import TypstRenderer from "@/components/typst_renderer";
import { useEffect, useState } from "react";

export default function Page() {
  const [content, setContent] = useState(null as Uint8Array | null);

  useEffect(() => {
    fetch("https://lumycea.ch/data/projects/report.artifact.sir.in")
      .then((r) => r.bytes())
      .then(setContent);
  }, []);

  return content ? <TypstRenderer buf={content} /> : <p>Loading...</p>;
}

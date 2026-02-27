"use client";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import { withGlobalRenderer } from "@myriaddreamin/typst.ts/dist/esm/contrib/global-renderer.mjs";
import * as typst from "@myriaddreamin/typst.ts";
import { TypstDocumentProps } from "@myriaddreamin/typst.react/TypstDocument";

// Manually imported from `@myriaddreamin/typst.react/TypstDocument`
let moduleInitOptions = {
  beforeBuild: [],
  getModule: () => "/typst_ts_renderer_bg.wasm",
};
const TypstDocument = ({ fill, artifact, format }: TypstDocumentProps) => {
  const displayDivRef = useRef<HTMLDivElement | null>(null);
  const getDisplayLayerDiv = () => {
    return displayDivRef?.current;
  };
  useEffect(() => {
    const doRender = (renderer: any) => {
      const divElem = getDisplayLayerDiv();
      if (!divElem) {
        return;
      }
      return renderer.render({
        artifactContent: artifact,
        format: "vector",
        backgroundColor: fill,
        container: divElem,
        pixelPerPt: 3,
      });
    };
    /// get display layer div
    const divElem = getDisplayLayerDiv();
    if (!divElem) {
      return;
    }
    /// we allow empty artifact
    if (!artifact?.length) {
      divElem.innerHTML = "";
      return;
    }
    /// render after init
    withGlobalRenderer(typst.createTypstRenderer, moduleInitOptions, doRender);
  }, [displayDivRef, fill, artifact, format]);

  return (
    <div>
      <div ref={displayDivRef}></div>
    </div>
  );
};

export default function TypstRenderer({ buf }: { buf: Uint8Array }) {
  return <TypstDocument fill="#ff0000" artifact={buf} />;
}

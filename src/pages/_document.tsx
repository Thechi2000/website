import { HILBERT, LSystemRenderer, PEANO_GOSPER } from "@/components/lsystem";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="background">
          <LSystemRenderer
            iterations={8}
            lsystem={HILBERT}
            length={12}
            margin={5}
            stroke={{ color: "black", width: 2 }}
          />
        </div>
        <div>
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}

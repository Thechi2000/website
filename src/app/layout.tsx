import { Bg } from "@/components/background";
import { Console } from "@/components/console";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { fetchData } from "@/fetch";
import { extractMarkdownFirstSentence } from "@/markdown";
import { generateMetadataWrapper } from "@/og";
import "@/styles/globals.scss";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider defaultTheme="dark" attribute="class">
          <div id="main">
            <Console />
            <Navbar />
            <Bg />
            <div id="content">
              <div>{children}</div>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const generateMetadata = generateMetadataWrapper(async () => {
  const data = await fetchData();

  return {
    description: extractMarkdownFirstSentence(data.me.description),
    icons: {
      icon: [
        {
          url: "/data/icons/favicon.ico",
          href: "/data/icons/favicon.ico",
        },
      ],
    },
  };
});

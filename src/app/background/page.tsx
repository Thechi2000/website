import { generateMetadataWrapper } from "@/og";
import BackgroundPageCS from "./page_cs";

export default function Page() {
  return <BackgroundPageCS />;
}

export const generateMetadata = generateMetadataWrapper(async () => {
  return {
    title: "Background",
    description: "Change the background of my website using LSystems :)",
  };
});

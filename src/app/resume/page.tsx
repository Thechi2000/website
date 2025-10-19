import Title from "@/components/title";
import { fetchData } from "@/fetch";
import { generateMetadataWrapper } from "@/og";
import styles from "@/styles/Resume.module.scss";

export default async function Page() {
  const { resume } = await fetchData();

  return (
    <>
      <Title text="Resume" />
      <div className={styles.links}>
        <a href={resume.download}>Download</a>
        <a href={resume.share} target="_blank">
          View on my Nextcloud
        </a>
      </div>
      <object
        data={resume.download}
        type="application/pdf"
        style={{ height: "70vh" }}
        className={styles.resume}
      >
        <p>Something wrong occurred while displaying the resume :/</p>
        <p>
          <a href={resume.share}>Access it here</a>
        </p>
      </object>
    </>
  );
}

export const generateMetadata = generateMetadataWrapper(async () => {
  return {
    title: "Resume",
    description: "My resume",
  };
});

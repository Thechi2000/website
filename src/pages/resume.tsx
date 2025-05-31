import Title from "@/components/title";
import styles from "@/styles/Resume.module.scss";

const RESUME_CLOUD = "https://cloud.lmermod.ch/s/t34zRkDDZWAC8mR";
const RESUME_DOWNLOAD =
  "https://cloud.lmermod.ch/s/t34zRkDDZWAC8mR/download/resume.pdf";
const RESUME_PDF = "https://lmermod.ch/data/resume.pdf";

export default function Page() {
  return (
    <>
      <Title text="Resume" />
      <div className={styles.links}>
        <a href={RESUME_DOWNLOAD}>Download</a>
        <a href={RESUME_CLOUD} target="_blank">
          View on my Nextcloud
        </a>
      </div>
      <object
        data={RESUME_PDF}
        type="application/pdf"
        style={{ height: "70vh" }}
        className={styles.resume}
      >
        <p>Something wrong occurred while displaying the resume :/</p>
        <p>
          <a href={RESUME_CLOUD}>Access it here</a>
        </p>
      </object>
    </>
  );
}

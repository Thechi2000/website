import Title from "@/components/title";
import style from "@/styles/Experience.module.scss";
import { fetchData } from "@/fetch";
import { generateMetadataWrapper } from "@/og";

export default async function Experience() {
  const { jobs } = await fetchData();

  return (
    <div id={style.experience}>
      <Title text="Experience" />
      {jobs.map((j) => (
        <span key={j.url}>
          <h2 className={style.title}>{j.title}</h2>&nbsp;{j.context}
          <span className={style.time}>{j.time}</span>
          <br />
          {j.description}{" "}
          <a href={j.url} target="_blank">
            Learn&nbsp;more...
          </a>
          <p />
        </span>
      ))}
    </div>
  );
}

export const generateMetadata = generateMetadataWrapper(async () => {
  return {
    title: "Experience",
    description: "What helped me deepen my understanding of computer science",
  };
});

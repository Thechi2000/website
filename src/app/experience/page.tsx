import Title from "@/components/title";
import style from "@/styles/Experience.module.scss";
import { fetchData } from "@/utils";

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
        </span>
      ))}
    </div>
  );
}

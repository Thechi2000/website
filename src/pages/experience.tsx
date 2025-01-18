import Title from "@/components/title";
import { Job } from "@/models";
import { fetchDataServerSideProps } from "@/utils";
import { readFile } from "fs/promises";
import style from "@/styles/Experience.module.scss";

export default function Experience({ jobs }: { jobs: Job[] }) {
  return (
    <div id={style.experience}>
      <Title text="Experience" />
      {jobs.map((j) => (
        <p key={j.url}>
          <h2 className={style.title}>{j.title}</h2>&nbsp;{j.context}
          <span className={style.time}>{j.time}</span>
          <br />
          {j.description}{" "}
          <a href={j.url} target="_blank">
            Learn&nbsp;more...
          </a>
        </p>
      ))}
    </div>
  );
}

export const getServerSideProps = fetchDataServerSideProps;

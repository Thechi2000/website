import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { Job } from "@/models";
import { fetchDataServerSideProps } from "@/utils";
import { readFile } from "fs/promises";
import style from "@/styles/Experience.module.scss";

export default function Experience({ jobs }: { jobs: Job[] }) {
  return (
    <div id={style.experience}>
      <Title text="Experience" />
      <Breadcrumbs />
      {jobs.map((j) => (
        <p>
          <a href={j.url} target="_blank">
            <h2 className={style.title}>{j.title}</h2>&nbsp;{j.context}
          </a>

          <span className={style.time}>{j.time}</span>
          <br />
          {j.description}
        </p>
      ))}
    </div>
  );
}

export const getServerSideProps = fetchDataServerSideProps;

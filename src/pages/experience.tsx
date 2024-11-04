import Title from "@/components/title";
import { Job } from "@/models";
import { readFile } from "fs/promises";

export default function Experience({ jobs }: { jobs: Job[] }) {
  return (
    <div id="experience">
      <Title text="Experience" />
      <ul>
        {jobs.map((j) => (
          <li>
            <a href={j.url} target="_blank">
              <strong>{j.title}</strong>&nbsp;{j.context}
            </a>
            <span className="time">{j.time}</span>
            <br />
            {j.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: JSON.parse((await readFile("data.json")).toString()),
  };
}

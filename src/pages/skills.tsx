import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { Data, Skills } from "@/models";
import { fetchDataServerSideProps } from "@/utils";
import { readFile } from "node:fs/promises";

export default function Page({ skills }: Data) {
  function ProcessSkills({ skills, level }: { skills: Skills; level: number }) {
    return Object.entries(skills as { [category: string]: Skills })
      .filter((e) => e[0] !== "tier")
      .map((e) => {
        if (Array.isArray(e[1])) {
          return (
            <p>
              <strong>{e[0]}</strong>: {e[1].join(", ")}
            </p>
          );
        } else {
          const Tag = `h${level}`;

          let tier = "";
          if ("tier" in e[1]) {
            tier = ` (${"\u2605".repeat(e[1].tier as number)}${"\u2606".repeat(
              5 - (e[1].tier as number)
            )})`;
          }

          return (
            <>
              {/* @ts-expect-error*/}
              <Tag>
                {e[0]}
                {tier}
              </Tag>
              <ProcessSkills level={level + 1} skills={e[1]} />
            </>
          );
        }
      });
  }

  return (
    <>
      <Title text="Skills" />
      <Breadcrumbs />
      <div>
        <ProcessSkills level={2} skills={skills} />
      </div>
    </>
  );
}

export const getServerSideProps = fetchDataServerSideProps;

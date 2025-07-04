import Title from "@/components/title";
import { Skills } from "@/models";
import { fetchData } from "@/fetch";
import { generateMetadataWrapper } from "@/og";

export default async function Page() {
  function ProcessSkills({ skills, level }: { skills: Skills; level: number }) {
    return Object.entries(skills as { [category: string]: Skills })
      .filter((e) => e[0] !== "tier")
      .map((e) => {
        if (Array.isArray(e[1])) {
          return (
            <p key={e[0]}>
              <strong>{e[0]}</strong>: {e[1].join(", ")}
            </p>
          );
        } else {
          const Tag = `h${level}`;

          let tier = "";
          if ("tier" in e[1]) {
            tier = ` (${"\u2605".repeat(e[1].tier as number)}${"\u2606".repeat(
              5 - (e[1].tier as number),
            )})`;
          }

          return (
            <>
              {/* @ts-expect-error*/}
              <Tag key={`${e[0]}-tag`}>
                {e[0]}
                {tier}
              </Tag>
              <ProcessSkills
                key={`${e[0]}-content`}
                level={level + 1}
                skills={e[1]}
              />
            </>
          );
        }
      });
  }

  const { skills } = await fetchData();

  return (
    <>
      <Title text="Skills" />
      <div>
        <ProcessSkills level={2} skills={skills} />
      </div>
    </>
  );
}

export const generateMetadata = generateMetadataWrapper(async () => {
  return {
    title: "Skills",
    description: "The abilities I learned and used over the years",
  };
});

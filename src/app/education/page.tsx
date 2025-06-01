import Title from "@/components/title";
import { fetchData } from "@/fetch";
import { generateMetadataWrapper } from "@/og";

export default async function Page() {
  const { education } = await fetchData();

  return (
    <>
      <Title text="Education" />
      <div>
        {education.map((e) => (
          <span key={e.title}>
            <h2>
              {e.title} ({e.location}, {e.time})
            </h2>
            <p>{e.description}</p>
            <p>
              <strong>Main courses:</strong> {e.courses.join(", ")}
            </p>
            <p>
              <strong>Projects:</strong> {e.projects.join(", ")}
            </p>
          </span>
        ))}
      </div>
    </>
  );
}
export const generateMetadata = generateMetadataWrapper(async () => {
  return {
    title: "Education",
    description: "The learning curricula I followed",
  };
});

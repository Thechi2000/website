import Head from "next/head";
import { useState } from "react";
import ProjectRow from "../components/project_row";
import Dropdown, { DropdownElement } from "../components/dropdown";
import OrderingHeader, { Ordering, compare } from "../components/ordering_header";
import { Project } from "../../data";

interface ProjectFilters {
  string: string | null;
  active: boolean | null;
  languages: string[] | null;
  organization: string | null;
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [filters, setFilters] = useState({
    string: null,
    active: null,
    languages: null,
    organization: null,
  } as ProjectFilters);
  const languages = projects
    .flatMap((p) => p.languages)
    .reduce((acc, val) => (val != undefined && acc.includes(val) ? acc : [...acc, val as string]), [] as string[])
    .sort();

  const [ordering, setOrdering] = useState({ column: "priority", asc: true } as Ordering | null);

  function updateFilters(change: Partial<ProjectFilters>) {
    setFilters({
      ...filters,
      ...change,
    });
  }

  return (
    <>
      <Head>
        <title>Projects - Ludovic Mermod</title>
      </Head>
      <div id="projects">
        <div className="table-filters">
          <input
            placeholder="Search..."
            onChange={(e) => updateFilters({ string: e.target.value })}
            className="border-gray-400 border-solid border bg-slate-800 p-3 m-0"
          />

          <div>
            <Dropdown label="Language">
              {languages.map((l) => (
                <DropdownElement key={l}>
                  <label>
                    <input
                      type="checkbox"
                      value={l}
                      name="language"
                      onChange={(e) => {
                        var filt = [...(filters.languages || [])];
                        if (e.target.checked) {
                          filt.push(l);
                        } else {
                          filt.splice(filt.indexOf(l), 1);
                        }
                        console.log(filt);
                        updateFilters({ languages: filt });
                      }}
                    />
                    {l}
                  </label>
                </DropdownElement>
              ))}
            </Dropdown>
          </div>

          <div>
            <Dropdown label="Activity">
              <DropdownElement>
                <label onClick={() => updateFilters({ active: null })}>
                  <input type="radio" checked={filters.active == null} readOnly />
                  No filter
                </label>
              </DropdownElement>
              <DropdownElement>
                <label onClick={() => updateFilters({ active: true })}>
                  <input type="radio" checked={filters.active === true} readOnly />
                  Active
                </label>
              </DropdownElement>
              <DropdownElement>
                <label onClick={() => updateFilters({ active: false })}>
                  <input type="radio" checked={filters.active === false} readOnly />
                  Inactive
                </label>
              </DropdownElement>
            </Dropdown>
          </div>

          <div>
            <Dropdown label="Organization">
              <DropdownElement>
                <label onClick={() => updateFilters({ organization: null })}>
                  <input type="radio" checked={filters.organization == null} readOnly />
                  No filter
                </label>
              </DropdownElement>
              {
                projects
                  .map((p) => p.organization)
                  .reduce(
                    (acc, val) => (val != undefined && acc.includes(val) ? acc : [...acc, val as string]),
                    [] as string[]
                  )
                  .filter((o) => o != undefined && o.length > 0)
                  .map((o) => (
                    <DropdownElement key={o}>
                      <label onClick={() => updateFilters({ organization: o })}>
                        <input type="radio" key={o} checked={filters.organization === o} readOnly />
                        {o}
                      </label>
                    </DropdownElement>
                  )) as any
              }
            </Dropdown>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th key="name">
                  <OrderingHeader column="Name" ordering={ordering} setOrdering={setOrdering} />
                </th>
                <th key="active">
                  <OrderingHeader column="Active" ordering={ordering} setOrdering={setOrdering} />
                </th>
                <th key="description">
                  <p>Description</p>
                </th>
                <th key="languages">
                  <p>Languages</p>
                </th>
                <th key="organization">
                  <OrderingHeader column="Organization" ordering={ordering} setOrdering={setOrdering} />
                </th>
              </tr>
            </thead>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "40%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <tbody>
              {projects
                .sort((p1, p2) => compare(p1, p2, ordering))
                .filter((p) => {
                  return (
                    (filters.string == null ||
                      filters.string.length == 0 ||
                      p.name.toLowerCase().includes(filters.string.toLowerCase()) ||
                      p.description.toLowerCase().includes(filters.string.toLowerCase())) &&
                    (filters.active == null || filters.active == p.active) &&
                    (filters.languages == null ||
                      filters.languages.length == 0 ||
                      filters.languages.every((l) => p.languages.includes(l))) &&
                    (filters.organization == null ||
                      (filters.organization == "" && p.organization == null) ||
                      filters.organization == p.organization)
                  );
                })
                .map((p) => (
                  <ProjectRow key={p.id} project={p} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      projects: await fetch("https://lmermod.ch/data/projects.json").then((p) => p.json()),
    },
  };
}

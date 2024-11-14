import Head from "next/head";
import Dropdown, { DropdownElement } from "../components/dropdown";
import { useState } from "react";
import OrderingHeader, { compare } from "../components/ordering_header";
import { Skill } from "../../data";

interface SkillFilters {
  search: string | null;
  level: number | null;
  type: string | null;
  language: string | null;
}

interface SkillOrdering {
  column: string;
  asc: boolean;
}

function SkillsSet({ skills }: { skills: Skill[] }) {
  return (
    <>
      <ul>
        {skills
          .sort((a, b) => b.level - a.level || a.name.localeCompare(b.name))
          .map((l) => (
            <li key={l.name}>
              <p>
                {l.name}: {"+".repeat(l.level) + "-".repeat(5 - l.level)}
              </p>
            </li>
          ))}
      </ul>
    </>
  );
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const [filters, setFilters] = useState({
    search: null,
    level: null,
    type: null,
    language: null,
  } as SkillFilters);
  const [ordering, setOrdering] = useState({ column: "level", asc: true } as SkillOrdering | null);

  const types = [...new Set(skills.map((s) => s.type).sort())];
  const languages = [
    ...new Set(
      skills
        .map((s) => s.language)
        .filter((l) => l != null)
        .sort()
    ),
  ];

  function updateOrdering(column: string) {
    if (ordering && ordering.column == column) {
      setOrdering({ column, asc: !ordering.asc });
    } else {
      setOrdering({ column, asc: false });
    }
  }
  function arrowClass(column: string) {
    return ordering && ordering.column == column ? (ordering.asc ? "arrow-up" : "arrow-down") : "";
  }

  function updateFilters(change: Partial<SkillFilters>) {
    console.log(JSON.stringify(change));
    console.log("hi");
    setFilters({
      ...filters,
      ...change,
    });
  }
  return (
    <>
      <Head>
        <title>Competences - Ludovic Mermod</title>
      </Head>
      <div id="skills">
        <div className="table-filters">
          <input
            placeholder="Search..."
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="border-gray-400 border-solid border bg-slate-800 p-3 m-0"
          />

          <div>
            <Dropdown label="Type">
              <DropdownElement>
                <label onClick={() => updateFilters({ type: null })}>
                  <input type="radio" checked={filters.type == null} readOnly />
                  No filter
                </label>
              </DropdownElement>
              {
                types.map((t) => (
                  <DropdownElement key={t}>
                    <label onClick={() => updateFilters({ type: t })}>
                      <input type="radio" checked={filters.type === t} readOnly />
                      {t}
                    </label>
                  </DropdownElement>
                )) as any
              }
            </Dropdown>
          </div>

          <div>
            <Dropdown label="Language">
              <DropdownElement>
                <label onClick={() => updateFilters({ language: null })}>
                  <input type="radio" checked={filters.language == null} readOnly />
                  No filter
                </label>
              </DropdownElement>
              {
                languages.map((l) => (
                  <DropdownElement key={l}>
                    <label onClick={() => updateFilters({ language: l })}>
                      <input type="radio" checked={filters.language === l} readOnly />
                      {l}
                    </label>
                  </DropdownElement>
                )) as any
              }
            </Dropdown>
          </div>

          <div>
            <Dropdown label="Level">
              <DropdownElement>
                <label onClick={() => updateFilters({ level: null })}>
                  <input type="radio" checked={filters.level == null} readOnly />
                  No filter
                </label>
              </DropdownElement>
              {
                [...Array(5).keys()]
                  .map((n) => n + 1)
                  .map((l) => (
                    <DropdownElement key={l}>
                      <label onClick={() => updateFilters({ level: l })}>
                        <input type="radio" checked={filters.level === l} readOnly />
                        {l}
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
                <th key="level">
                  <OrderingHeader column="Level" ordering={ordering} setOrdering={setOrdering} />
                </th>
                <th key="type">
                  <OrderingHeader column="Type" ordering={ordering} setOrdering={setOrdering} />
                </th>
                <th key="language">
                  <OrderingHeader column="Language" ordering={ordering} setOrdering={setOrdering} />
                </th>
                <th key="description">
                  <p>Description</p>
                </th>
              </tr>
            </thead>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "40%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
            <tbody>
              {skills
                .sort((p1, p2) => compare(p1, p2, ordering))
                .filter((s) => {
                  return (
                    (filters.search == null ||
                      filters.search.length == 0 ||
                      s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                      s.description.toLowerCase().includes(filters.search.toLowerCase())) &&
                    (filters.type == null || filters.type == s.type) &&
                    (filters.language == null || filters.language == s.language) &&
                    (filters.level == null || filters.level == s.level)
                  );
                })
                .map((s) => (
                  <tr key={s.name}>
                    <td key="name">
                      <a href={s.url} target="_blank" rel="noreferrer">
                        {s.name}
                      </a>
                    </td>
                    <td key="Level">
                      <p>{s.level}</p>
                    </td>
                    <td key="type">
                      <p>{s.type}</p>
                    </td>
                    <td key="language">
                      <p>{s.language || "-"}</p>
                    </td>
                    <td key="description">
                      <p>{s.description}</p>
                    </td>
                  </tr>
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
      skills: await fetch("https://lmermod.ch/data/skills.json").then((p) => p.json()),
    },
  };
}

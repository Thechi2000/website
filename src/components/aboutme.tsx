import Head from "next/head";
import Link from "next/link";

import AboutMeSection from "./aboutme_section";

import EpflLogo from "../assets/epfl-logo.svg";
import AgepolyLogo from "../assets/agepoly-logo.svg";
import ClicLogo from "../assets/clic-logo.svg";
import RustLogo from "../assets/rust-logo.svg";
import CLogo from "../assets/c-logo.svg";
import Regex from "../assets/regex-logo.svg";

export default function AboutMe() {
  return (
    <>
      <Head>
        <title>Home - Ludovic Mermod</title>
      </Head>
      <div id="aboutme">
        <AboutMeSection logo={<EpflLogo />}>
          <p>
            &emsp; I study at the Swiss university{" "}
            <a href="https://www.epfl.ch" rel="noopener noreferrer nofollow" target="_blank">
              EPFL
            </a>
            &nbsp;since 2024. I am taking the master&apos;s degree in computer science, after having completed my
            bachelor&apos;s. I also work for several student associations, as a teaching and research assistant.
            <br />
          </p>
        </AboutMeSection>

        <div className="separator" />

        <AboutMeSection logo={<ClicLogo />}>
          <p>
            &emsp; Since autumn 2023, I am IT Manager of the{" "}
            <a href="https://clic.epfl.ch/" rel="noopener noreferrer nofollow" target="_blank">
              CLIC
            </a>
            , the student association of the IC faculty. I help maintaining the association&apos;s server and building
            services to help the rest of the associations in their tasks.
          </p>
        </AboutMeSection>

        <div className="separator" />

        <AboutMeSection logo={<Regex />}>
          <p>
            &emsp; I was recruited by the{" "}
            <a href="https://systemf.epfl.ch/" rel="noopener noreferrer nofollow" target="_blank">
              Systems and Formalism laboratory
            </a>{" "}
            from EPFL, to translate an algorithm able to match Regexp containing lookarounds in linear time, whereas
            current engine only implement it in exponential time.
            <br />
          </p>
        </AboutMeSection>

        <div className="separator" />

        <AboutMeSection logo={<CLogo />}>
          <p>
            &emsp; I am working as a teaching assistant for the{" "}
            <a
              href="https://edu.epfl.ch/coursebook/en/system-oriented-programming-CS-207"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              System oriented programming
            </a>{" "}
            and{" "}
            <a
              href="https://edu.epfl.ch/coursebook/en/system-programming-project-CS-212"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              System programming project
            </a>
            . I also prepare the project for the next semester.
          </p>
        </AboutMeSection>

        <div className="separator" />

        <AboutMeSection logo={<RustLogo />}>
          <p>
            &emsp; Over the years, I have been learning quite a few languages, the most important being Rust, C/C++ and
            Java. Get a full overview <Link href="/skills">here</Link>.
          </p>
        </AboutMeSection>
      </div>
    </>
  );
}

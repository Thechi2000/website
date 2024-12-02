import { PAGES } from "@/pages";
import { toDisplayString } from "@/utils";
import Link from "next/link";
import styles from "@/styles/Navbar.module.scss";
import Breadcrumbs from "./breadcrumbs";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Breadcrumbs />
      <div>
        {Object.entries(PAGES).map(([name, path]) => (
          <Link className={styles.item} key={name} href={path}>
            {toDisplayString(name)}
          </Link>
        ))}
      </div>
    </div>
  );
}

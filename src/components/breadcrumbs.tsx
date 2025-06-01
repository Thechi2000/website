"use client";

import { usePathname } from "next/navigation";
import styles from "@/styles/Breadcrumbs.module.scss";
import Link from "next/link";
import { toDisplayString } from "@/string";

export default function Breadcrumbs() {
  const path = usePathname();

  return (
    <p className={styles.breadcrumbs}>
      /<Link href={"/"}>Root</Link>
      {path
        .split("/")
        .filter((e) => e.length !== 0)
        .map((segment, index, array) => (
          <span key={index}>
            /
            <Link href={`/${array.slice(0, index + 1).join("/")}`}>
              {toDisplayString(segment)}
            </Link>
          </span>
        ))}
    </p>
  );
}

"use client";

import { useRouter } from "next/navigation";
import styles from "@/styles/Breadcrumbs.module.scss";
import Link from "next/link";
import { toDisplayString } from "@/utils";
import { useEffect, useRef, useState } from "react";

export default function Breadcrumbs() {
  const router = useRouter();
  const [path, setPath] = useState<string[]>([]);
  const retrieved = useRef(false);

  useEffect(() => {
    if (retrieved.current) return;
    retrieved.current = true;

    setPath(window.location.pathname.split("/").filter((e) => e.length !== 0));
  }, []);

  return path.length === 0 ? (
    <></>
  ) : (
    <p className={styles.breadcrumbs}>
      /<Link href={"/"}>Root</Link>
      {path.map((segment, index, array) => (
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

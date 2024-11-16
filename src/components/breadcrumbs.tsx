import { useRouter } from "next/router";
import styles from "@/styles/Breadcrumbs.module.scss";
import Link from "next/link";

export default function Breadcrumbs() {
  const router = useRouter();

  const segments = router.asPath.split("/").filter((e) => e.length !== 0);

  return (
    <p className={styles.breadcrumbs}>
      <Link href={"/"}>Root</Link>
      {segments.map((segment, index, array) => (
        <>
          &nbsp;&gt;&nbsp;
          <Link href={`/${array.slice(0, index + 1).join("/")}`}>
            {segment.replaceAll(
              /(^|-)(\w)/g,
              (_, g1, g2) => `${g1 === "-" ? " " : ""}${g2.toUpperCase()}`
            )}
          </Link>
        </>
      ))}
    </p>
  );
}

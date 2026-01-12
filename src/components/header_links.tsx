import Link from "next/link";
import styles from "@/styles/HeaderLinks.module.scss";

export default function HeaderLinks({
  entries,
}: {
  entries: [string | undefined, string][];
}) {
  return (
    <div className={styles.links}>
      {entries
        .filter((e) => e[0])
        .map((e) => (
          <Link key={e[0]} className="text-center" href={e[0]!} target="_blank">
            --&gt; {e[1]} &lt;--
          </Link>
        ))}
    </div>
  );
}

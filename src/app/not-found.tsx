import Title from "@/components/title";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Title text="ENOENT" />
      <Link className="text-center" href="/">
        <h3>---&gt; Back to home &lt;---</h3>
      </Link>
    </>
  );
}

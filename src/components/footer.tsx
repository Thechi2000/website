import { fetchData } from "@/fetch";
import { SocialIcon } from "./social_icon";
import styles from "@/styles/Footer.module.scss"

export async function Footer() {
  const { socials } = await fetchData();

  return (
    <footer className={styles.footer}>
      {Object.entries(socials).map((s) => (
        <SocialIcon social={s[1]} key={s[0]} />
      ))}
    </footer>
  );
}

"use client";

import { WEBSITE_BASE_URL } from "@/consts";
import { Socials } from "@/models";
import { useTheme } from "next-themes";
import styles from "@/styles/SocialIcon.module.scss";

export function SocialIcon({ social }: { social: Socials }) {
  const theme = useTheme();

  return (
    <a
      href={social.url}
      target="_blank"
      about={social.name}
    >
      <img
      className={styles.icon}
        about={social.name}
        src={`${WEBSITE_BASE_URL}/data/socials/${theme.resolvedTheme}/${social.icon}`}
      />
    </a>
  );
}

export function toDisplayString(s: string) {
  return s.replaceAll(
    /(^|-)(\w)/g,
    (_, g1, g2) => `${g1 === "-" ? " " : ""}${g2.toUpperCase()}`
  );
}

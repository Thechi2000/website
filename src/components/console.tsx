import { fetchData } from "@/fetch";
import ConsoleCS from "./console_cs";

export async function Console() {
  return <ConsoleCS data={await fetchData()} />;
}

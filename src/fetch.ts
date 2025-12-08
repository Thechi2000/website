import { WEBSITE_BASE_URL } from "./consts";
import { Data } from "./models";

export async function fetchData(): Promise<Data> {
  const data: Data = await (
    await fetch(
      `${WEBSITE_BASE_URL}/data/data${
        process.env.NODE_ENV !== "production" ? ".dev" : ""
      }.json`
    )
  ).json();

  data.me.description = await fetch(data.me.description).then((res) =>
    res.text()
  );

  return data;
}

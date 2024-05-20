import { ENV } from "../constants/env";

export async function getBalance() {
  const response = await fetch("https://api.vsegpt.ru/v1/balance", {
    headers: {
      "Authorization": `Bearer ${ENV.VSEGPT_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json.data.credits;
}

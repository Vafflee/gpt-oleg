import { VK } from "vk-io";
import { ENV } from "../../../constants/env";

export function createVK(): VK {
  return new VK({
    token: ENV.VK_TOKEN,
    apiVersion: "5.199",
  });
}

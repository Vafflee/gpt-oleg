import { Config, JsonDB } from "node-json-db";

export const db = new JsonDB(new Config("data", true, true, "/"));
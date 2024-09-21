import { Config, JsonDB } from "node-json-db";

export const createDbConnection = () => new JsonDB(new Config("data", true, true, "/", true));
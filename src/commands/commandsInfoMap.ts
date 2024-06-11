import { CommandType } from "./types";
import { balanceHandler } from "./handlers/balanceHandler";
import { drawHandler } from "./handlers/drawHandler";

export const commandsInfoMap = {
  [CommandType.balance]: {
    word: "баланс" as const,
    handler: balanceHandler,
  },
  [CommandType.draw]: {
    word: "нарисуй" as const,
    handler: drawHandler,
  },
};

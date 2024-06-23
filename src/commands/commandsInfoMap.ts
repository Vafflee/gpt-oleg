import { CommandType } from "./types";
import { balanceHandler } from "./handlers/balanceHandler";
import { drawHandler } from "./handlers/drawHandler";
import { editHandler } from "./handlers/editHandler";

export const commandsInfoMap = {
  [CommandType.balance]: {
    word: "баланс" as const,
    handler: balanceHandler,
  },
  [CommandType.draw]: {
    word: "нарисуй" as const,
    handler: drawHandler,
  },
  // [CommandType.edit]: {
  //   word: "отредактируй" as const,
  //   handler: editHandler,
  // },
};

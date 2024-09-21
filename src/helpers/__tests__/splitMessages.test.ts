import { splitMessages } from "../splitMessages";
import {
  EXPECTED_CONTEXT_MESSAGES,
  EXPECTED_LAST_MESSAGES,
  MOCKED_MESSAGES,
  NUMBER_OF_MESSAGES,
} from "./mocks";

describe("splitHistoryToContextAndMessages", () => {
  it("should split history to context and messages", () => {
    const { messagesForContext, lastMessages } = splitMessages(
      MOCKED_MESSAGES,
      NUMBER_OF_MESSAGES
    );
    

    expect(messagesForContext).toEqual(EXPECTED_CONTEXT_MESSAGES);
    expect(lastMessages).toEqual(EXPECTED_LAST_MESSAGES);
  });
});

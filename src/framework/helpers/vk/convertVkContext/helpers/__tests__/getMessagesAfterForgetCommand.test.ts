import { getMessagesAfterForgetCommand } from "../getMessagesAfterForgetCommand";
import {
  MOCKED_MESSAGES,
  EXPECTED_MESSAGES_AFTER_FORGET_COMMAND,
  EXPECTED_MESSAGES_WITHOUT_FORGET_COMMAND,
} from "./mocks";

describe("getMessagesAfterForgetCommand", () => {
  it("should return messages after forget command", () => {
    const messages = MOCKED_MESSAGES;
    const result = getMessagesAfterForgetCommand(messages);

    expect(result).toEqual(EXPECTED_MESSAGES_AFTER_FORGET_COMMAND);
  });

  it("should return all messages if forget command is not present", () => {
    const messages = MOCKED_MESSAGES.filter((msg) => msg.text !== "забудь");
    const result = getMessagesAfterForgetCommand(messages);

    expect(result).toEqual(EXPECTED_MESSAGES_WITHOUT_FORGET_COMMAND);
  });
});

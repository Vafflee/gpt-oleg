import { Conversation } from "./src/classes/conversation";
import { db } from "./src/db/db";
import { SerializedConversation } from "./src/types";

// db.push("/conversations/999", new Conversation({ id: 999 }));
db.getObjectDefault("/conversations/9929").then((data) => {
  const classInstance = data ? new Conversation(data as SerializedConversation) : new Conversation({ id: 999 });
  console.log(classInstance);
});

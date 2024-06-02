// import { createChatBotMessage } from 'react-chatbot-kit';

// const config = {
//   initialMessages: [createChatBotMessage(`Hello world`)],
// };

// export default config;
import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const config = {
  botName: "ChatBot",
  initialMessages: [createChatBotMessage("Hello! How can I help you?")],
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;
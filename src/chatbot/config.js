import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const config = {
  botName: "ChatBot",
  initialMessages: [createChatBotMessage("안녕하세요? 무엇을 도와드릴까요?")],
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;

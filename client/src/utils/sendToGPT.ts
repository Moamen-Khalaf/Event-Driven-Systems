import { useCurrentChatStore } from "@/store/curretChat";
import { useSetting } from "@/store/setting";
import { useTable } from "@/store/table";
import OpenAI from "openai";

export async function sendToGPT() {
  const endpoint = useSetting.getState().endpoint;
  const token = useSetting.getState().token;
  const modelName = useSetting.getState().modelName;
  const parsedTables = useTable.getState().getParcedTable();

  const messages = useCurrentChatStore
    .getState()
    .messages.map((message) => ({
      role: message.role,
      content: message.content,
    }))
    .slice(-5);
  if (!endpoint || !token || !modelName) {
    throw "Please set valid token";
  }
  const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
    dangerouslyAllowBrowser: true,
  });
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "you are a table bot that assists users with table data. you are in sumulation system that simulates event driven systems",
      },
      { role: "system", content: JSON.stringify(parsedTables) },
      ...messages,
    ],
    temperature: 1.0,
    top_p: 1.0,
    max_tokens: 1000,
    model: modelName,
  });
  return response;
}

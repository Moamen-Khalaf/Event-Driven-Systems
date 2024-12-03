import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from "zustand/middleware";
import OpenAI from "openai";
import { useSetting } from "./setting";

interface IMessage {
  timestamp: Date;
  role: "user" | "system" | "assistant";
  type: "text" | "table";
  content: string;
}

export interface IChat {
  messages: IMessage[];
  notification: {
    type: "error" | "success" | null;
    message: string;
  };
  loading: boolean;
  clearMessages: () => void;
  setErrorMessage: (message: string) => void;
  addMessage: (message: Omit<IMessage, "timestamp">) => Promise<void>;
}

export const useCurrentChatStore = create<IChat>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        messages: [],
        notification: {
          type: null,
          message: "",
        },
        loading: false,
        clearMessages: () =>
          set((state) => {
            state.messages = [];
            state.notification = {
              type: "success",
              message: "Messages cleared",
            };
          }),
        setErrorMessage: (message) =>
          set((state) => (state.notification = { type: "error", message })),
        addMessage: async (message) => {
          try {
            set((state) => {
              state.loading = true;
              state.messages.push({ ...message, timestamp: new Date() });
            });
            const response = await sendToGPT();
            set((state) => {
              state.messages.push({
                role: "assistant",
                type: "text",
                content: response.choices[0].message.content as string,
                timestamp: new Date(),
              });
            });
          } catch (error) {
            set((state) => {
              state.notification = {
                message: (error as Error).message || (error as string),
                type: "error",
              };
              state.messages.push({
                role: "assistant",
                type: "text",
                content: state.notification.message,
                timestamp: new Date(),
              });
            });
          } finally {
            set((state) => {
              state.loading = false;
            });
          }
        },
      })),
      {
        name: "current Chat",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

async function sendToGPT() {
  const endpoint = useSetting.getState().endpoint;
  const token = useSetting.getState().token;
  const modelName = useSetting.getState().modelName;
  const messages = useCurrentChatStore.getState().messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
  if (!endpoint || !token || !modelName) {
    throw "Please set valid token";
  }
  const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
    dangerouslyAllowBrowser: true,
  });

  const response = await client.chat.completions.create({
    messages,
    temperature: 1.0,
    top_p: 1.0,
    max_tokens: 1000,
    model: modelName,
  });
  return response;
}

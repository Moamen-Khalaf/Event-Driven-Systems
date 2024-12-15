import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";
import { sendToGPT } from "@/utils/sendToGPT";

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
  reply: string;
  setReply: (reply: string) => void;
  clearReply: () => void;
  clearMessages: () => void;
  setErrorMessage: (message: string) => void;
  addMessage: (message: Omit<IMessage, "timestamp">) => Promise<void>;
}
const defaultMessages: IMessage[] = [
  {
    timestamp: new Date(),
    role: "system",
    type: "text",
    content:
      "you are in simulation system, you are assigned to answer a question about the current table (if the user asked about) the table will be sent as a consegative words each word represent a cell in the table",
  },
];
export const useCurrentChatStore = create<IChat>()(
  subscribeWithSelector(
    immer((set) => ({
      messages: defaultMessages,
      reply: "",
      setReply: (reply) =>
        set((state) => {
          state.reply = reply;
        }),
      clearReply: () =>
        set((state) => {
          state.reply = "";
        }),
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
            if (state.reply) {
              state.messages.push({
                role: "system",
                type: "text",
                content: "forward Message : " + state.reply,
                timestamp: new Date(),
              });
            }
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
    }))
  )
);

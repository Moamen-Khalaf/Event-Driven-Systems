import { useCurrentChatStore } from "@/store/curretChat";
import { LoaderCircle, SendHorizontal } from "lucide-react";
import { useRef } from "react";
import { UploadMenu } from "./UploadMenu";

export default function ChatInput() {
  const addMessage = useCurrentChatStore((state) => state.addMessage);
  const loading = useCurrentChatStore((state) => state.loading);
  const message = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="flex w-full items-center shadow-lg bg-sidebar/50 rounded-full px-5 mb-6">
      <button className="cursor-pointer hover:text-gray-500">
        <UploadMenu />
      </button>
      <textarea
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (message.current?.value) {
              addMessage({
                role: "user",
                type: "text",
                content: message.current.value,
              });
              message.current.value = "";
            }
          }
        }}
        className="bg-transparent outline-none grow px-4 py-4 w-full text-sidebar-foreground resize-none"
        placeholder="Ask me anything"
        ref={message}
      />
      <button
        className="cursor-pointer hover:text-gray-500"
        disabled={loading}
        onClick={() => {
          if (message.current?.value) {
            addMessage({
              role: "user",
              type: "text",
              content: message.current.value,
            });
            message.current.value = "";
          }
        }}
      >
        {loading ? (
          <LoaderCircle className="animate-spin self-end" />
        ) : (
          <SendHorizontal />
        )}
      </button>
    </div>
  );
}

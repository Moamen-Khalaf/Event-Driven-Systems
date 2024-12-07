import { useCurrentChatStore } from "@/store/curretChat";
import { Forward, LoaderCircle, SendHorizontal, X } from "lucide-react";
import { useRef } from "react";
import { UploadMenu } from "./UploadMenu";

function Replay() {
  const reply = useCurrentChatStore((state) => state.reply);
  const clearReply = useCurrentChatStore((state) => state.clearReply);
  return (
    reply && (
      <div className="px-8 flex bg-secondary/60 pt-4 gap-3 text-neutral-300 justify-between">
        <Forward />
        <span className="max-w-[90%] overflow-clip text-ellipsis text-nowrap">
          {reply}
        </span>
        <X
          className="hover:text-foreground cursor-pointer"
          onClick={() => clearReply()}
        />
      </div>
    )
  );
}

export default function ChatInput() {
  const addMessage = useCurrentChatStore((state) => state.addMessage);
  const loading = useCurrentChatStore((state) => state.loading);
  const message = useRef<HTMLTextAreaElement>(null);
  return (
    <div className=" shadow-lg bg-sidebar/50 rounded-full mb-6 overflow-hidden">
      <Replay />
      <div className="flex w-full items-center px-5">
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
    </div>
  );
}

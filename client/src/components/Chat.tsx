import { useCurrentChatStore } from "@/store/curretChat";
import MarkdownRenderer from "@/utils/MarkdownRenderer";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Copy, Reply } from "lucide-react";
import { memo, useEffect, useState } from "react";

function UserMessage({ message }: { message: string }) {
  const [reply, setReply] = useState(false);
  const forwardMessage = useCurrentChatStore((state) => state.setReply);
  return (
    <div
      className="flex gap-2 w-full flex-row-reverse items-center"
      onMouseOver={() => setReply(true)}
      onMouseLeave={() => setReply(false)}
    >
      <div className="bg-sidebar w-fit p-4 rounded-lg md:max-w-[90%]">
        {message}
      </div>
      {reply && (
        <Reply
          className="w-4  ml-3 hover:text-foreground/60 cursor-pointer"
          onClick={() => forwardMessage(message)}
        />
      )}
    </div>
  );
}
function AssistantMessage({ message }: { message: string }) {
  return (
    <div className="flex w-full flex-col">
      <div className="p-2 rounded-lg prose text-foreground  md:max-w-[90%]">
        <MarkdownRenderer content={message} />
      </div>
      <Copy
        className="w-4  ml-3 hover:text-foreground/60 cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(message);
        }}
      />
    </div>
  );
}
function scrollToBottom(element: HTMLElement) {
  setTimeout(() => {
    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  }, 0);
}

function Chat({ className }: { className?: string }) {
  const messages = useCurrentChatStore((state) => state.messages);
  useEffect(() => {
    const unsubscribe = useCurrentChatStore.subscribe(
      (state) => state.messages.length,
      (currentLength, previousLength) => {
        const chatElement = document.getElementById("chat");
        if (currentLength > previousLength && chatElement) {
          scrollToBottom(chatElement);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <ScrollArea className={className} id="chat">
      {messages.map((message, key) =>
        message.role === "system" ? null : message.role === "user" ? (
          <UserMessage message={message.content} key={key} />
        ) : (
          <AssistantMessage message={message.content} key={key} />
        )
      )}
    </ScrollArea>
  );
}

export default memo(Chat);

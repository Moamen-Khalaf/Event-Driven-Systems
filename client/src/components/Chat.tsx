import { useCurrentChatStore } from "@/store/curretChat";
import MarkdownRenderer from "@/utils/MarkdownRenderer";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Copy, Reply } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

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
function ResponceSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-4 rounded-full animate-bounce" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

function Chat() {
  const messages = useCurrentChatStore((state) => state.messages);
  const loading = useCurrentChatStore((state) => state.loading);
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
    <ScrollArea
      className="grow ml-2 md:ml-12 h-[50vh] flex gap-4 flex-col px-4 overflow-auto pt-10"
      id="chat"
    >
      {messages.map((message, key) =>
        message.role === "system" ? null : message.role === "user" ? (
          <UserMessage message={message.content} key={key} />
        ) : (
          <AssistantMessage message={message.content} key={key} />
        )
      )}
      {loading && <ResponceSkeleton />}
    </ScrollArea>
  );
}

export default memo(Chat);

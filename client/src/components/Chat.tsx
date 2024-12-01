import { useCurrentChatStore } from "@/store/curretChat";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Copy, Pencil } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import ReactMarkdown from "react-markdown";

function UserMessage({ message }: { message: string }) {
  const [edit, setEdit] = useState(false);
  return (
    <div
      className="flex gap-2 w-full flex-row-reverse items-center"
      onMouseOver={() => setEdit(true)}
      onMouseLeave={() => setEdit(false)}
    >
      <div className="bg-sidebar w-fit p-4 rounded-lg md:max-w-[80%]">
        {message}
      </div>
      {edit && (
        <Pencil
          className="w-4  ml-3 hover:text-foreground/60 cursor-pointer"
          onClick={() => {}}
        />
      )}
    </div>
  );
}
function AssistantMessage({
  message,
  animate,
}: {
  message: string;
  animate: boolean;
}) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    if (!animate) {
      setVisibleText(message);
      return;
    }
    let index = 0; // Start from the first character
    const interval = setInterval(() => {
      if (index < message.length) {
        setVisibleText((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(interval); // Stop the animation when done
      }
    }, 40); // Adjust the speed of typing (in ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, [animate, message]);
  return (
    <div className="flex w-full flex-col">
      <div className="p-2 rounded-lg prose text-foreground  md:max-w-[80%]">
        <ReactMarkdown>{visibleText}</ReactMarkdown>
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
function scrollToBottom(element: RefObject<HTMLDivElement>) {
  setTimeout(() => {
    element.current?.scrollTo({
      top: element.current.scrollHeight,
      behavior: "smooth",
    });
  }, 0);
}

export default function Chat() {
  const messages = useCurrentChatStore((state) => state.messages);
  const chatElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const unsubscribe = useCurrentChatStore.subscribe(
      (state) => state.messages.length,
      (currentLength, previousLength) => {
        if (currentLength > previousLength) {
          scrollToBottom(chatElement);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <ScrollArea
      className="grow mx-2 md:mx-12 h-[50vh] flex gap-4 flex-col px-4 overflow-auto relative"
      ref={chatElement}
    >
      {messages.map((message, key) =>
        message.role === "system" ? null : message.role === "user" ? (
          <UserMessage message={message.content} key={key} />
        ) : (
          <AssistantMessage
            message={message.content}
            animate={
              new Date(message.timestamp).getTime() === new Date().getTime()
            }
            key={key}
          />
        )
      )}
    </ScrollArea>
  );
}

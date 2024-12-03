import { useSetting } from "@/store/setting";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useRef } from "react";
import { useCurrentChatStore } from "@/store/curretChat";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Settings } from "lucide-react";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "@/hooks/use-toast";

export default function Setting() {
  const notification = useSetting((state) => state.notification);
  const loading = useSetting((state) => state.loading);
  const token = useSetting((state) => state.token);
  const endpoint = useSetting((state) => state.endpoint);
  const modelName = useSetting((state) => state.modelName);
  const setSetting = useSetting((state) => state.setSetting);
  const clearMessages = useCurrentChatStore((state) => state.clearMessages);
  const tokenElement = useRef<HTMLInputElement>(null);
  const endpointElement = useRef<HTMLInputElement>(null);
  const modelNameElement = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  useEffect(() => {
    if (notification.type === "error") {
      toast({
        title: "Settings Error",
        variant: "destructive",
        description: notification.message,
        action: <ToastAction altText="Dismiss">OK</ToastAction>,
      });
    } else if (notification.type) {
      toast({
        title: notification.type,
        description: notification.message,
        action: <ToastAction altText="Dismiss">OK</ToastAction>,
      });
    }
  }, [notification, toast]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Settings className="hover:text-sidebar-foreground/50" />
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <label>
            <span>Token</span>
            <Input
              ref={tokenElement}
              type="password"
              defaultValue={token}
              placeholder="Enter your Token"
            />
          </label>
          <label>
            <span>Endpoint</span>
            <Input
              ref={endpointElement}
              type="text"
              defaultValue={endpoint}
              placeholder="Enter the Endpoint"
            />
          </label>
          <label>
            <span>Model Name</span>
            <Input
              ref={modelNameElement}
              type="text"
              defaultValue={modelName}
              placeholder="Enter the Model Name"
            />
          </label>
        </div>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button
            disabled={loading}
            onClick={() => {
              setSetting(
                tokenElement.current!.value.trim(),
                endpointElement.current!.value.trim(),
                modelNameElement.current!.value.trim()
              );
            }}
          >
            {loading ? "Loading..." : "Save"}
          </Button>
          <DialogClose asChild>
            <Button
              className=""
              variant={"destructive"}
              onClick={() => {
                clearMessages();
                toast({
                  title: "Chat Cleared",
                  description: "The chat has been successfully cleared.",
                  action: <ToastAction altText="Dismiss">OK</ToastAction>,
                });
              }}
            >
              Clear Chat
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

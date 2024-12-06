import { useSetting } from "@/store/setting";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { memo, useState } from "react";
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
import useToastNotification from "@/hooks/useToastNotification";

function Setting() {
  const notification = useSetting((state) => state.notification);
  const loading = useSetting((state) => state.loading);
  const token = useSetting((state) => state.token);
  const endpoint = useSetting((state) => state.endpoint);
  const modelName = useSetting((state) => state.modelName);

  const setSetting = useSetting((state) => state.setSetting);

  const [localToken, setLocalToken] = useState(token);
  const [localEndpoint, setLocalEndpoint] = useState(endpoint);
  const [localModelName, setLocalModelName] = useState(modelName);

  useToastNotification(notification, () => {
    useSetting.setState((state) => {
      state.notification = { type: null, message: "" };
    });
  });
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
              value={localToken}
              onChange={(e) => setLocalToken(e.target.value)}
              type="password"
              placeholder="Enter your Token"
            />
          </label>
          <label>
            <span>Endpoint</span>
            <Input
              value={localEndpoint}
              onChange={(e) => setLocalEndpoint(e.target.value)}
              type="text"
              placeholder="Enter the Endpoint"
            />
          </label>
          <label>
            <span>Model Name</span>
            <Input
              value={localModelName}
              onChange={(e) => setLocalModelName(e.target.value)}
              type="text"
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
            onClick={() =>
              setSetting(
                localToken.trim(),
                localEndpoint.trim(),
                localModelName.trim()
              )
            }
          >
            {loading ? "Loading..." : "Save"}
          </Button>
          <DialogClose asChild>
            <ClearChatButton />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default memo(Setting);

function ClearChatButton() {
  const clearMessages = useCurrentChatStore((state) => state.clearMessages);
  const notification = useCurrentChatStore((state) => state.notification);
  useToastNotification(notification, () => {
    useCurrentChatStore.setState((state) => {
      state.notification = { type: null, message: "" };
    });
  });
  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        clearMessages();
      }}
    >
      Clear Chat
    </Button>
  );
}

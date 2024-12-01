import { useSetting } from "@/store/setting";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef } from "react";
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

export default function Setting() {
  const error = useSetting((state) => state.error);
  const loading = useSetting((state) => state.loading);
  const token = useSetting((state) => state.token);
  const endpoint = useSetting((state) => state.endpoint);
  const modelName = useSetting((state) => state.modelName);
  const setError = useSetting((state) => state.setError);
  const setSetting = useSetting((state) => state.setSetting);
  const clearMessages = useCurrentChatStore((state) => state.clearMessages);
  const tokenElement = useRef<HTMLInputElement>(null);
  const endpointElement = useRef<HTMLInputElement>(null);
  const modelNameElement = useRef<HTMLInputElement>(null);
  function handleSave() {
    const isValidUrl = (urlString: string) => {
      try {
        new URL(urlString);
        return true;
      } catch {
        return false;
      }
    };

    if (
      tokenElement.current?.value &&
      endpointElement.current?.value &&
      modelNameElement.current?.value
    ) {
      if (!isValidUrl(endpointElement.current.value.trim())) {
        setError("Please enter a valid URL for the endpoint");
        return;
      }

      setSetting(
        tokenElement.current.value.trim(),
        endpointElement.current.value.trim(),
        modelNameElement.current.value.trim()
      );
      setError("");
    } else {
      setError("Please fill all the fields");
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Settings />
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
          {error && <span className="text-red-500">{error}</span>}
        </div>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button disabled={loading} onClick={handleSave}>
            {loading ? "Loading..." : "Save"}
          </Button>
          <DialogClose asChild>
            <Button
              className=""
              variant={"destructive"}
              onClick={() => {
                clearMessages();
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

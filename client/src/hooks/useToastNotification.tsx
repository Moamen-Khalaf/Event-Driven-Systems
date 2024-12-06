import type { INotification } from "@/store/table";
import { useEffect } from "react";
import { useToast } from "./use-toast";

export default function useToastNotification(
  notification: INotification,
  clearMessage: () => void
) {
  const { toast } = useToast();
  useEffect(() => {
    if (notification.type) {
      toast({
        title: notification.type,
        variant: notification.type === "error" ? "destructive" : "default",
        description: notification.message,
      });
      clearMessage();
    }
  }, [clearMessage, notification, toast]);
}

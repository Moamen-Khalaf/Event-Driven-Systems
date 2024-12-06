import { ToolTip } from "@/components/ToolTip";
import useToastNotification from "@/hooks/useToastNotification";
import { useTable } from "@/store/table";
import { LoaderCircle, ScanLine } from "lucide-react";

export default function SimulateButton() {
  const notification = useTable((state) => state.notification);
  const loading = useTable((state) => state.loading);
  const simulate = useTable((state) => state.simulate);
  useToastNotification(notification, () => {
    useTable.setState((state) => {
      state.notification = { type: null, message: "" };
    });
  });
  if (loading) {
    return (
      <LoaderCircle className="animate-spin w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer hover:animate-pulse" />
    );
  }
  return (
    <ToolTip message="Simulate">
      <ScanLine
        className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer hover:animate-pulse"
        onClick={() => {
          simulate();
        }}
      />
    </ToolTip>
  );
}

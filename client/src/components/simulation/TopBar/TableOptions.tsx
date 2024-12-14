import { CircleX, Copy } from "lucide-react";
import SimulateButton from "./SimulateButton";
import DownloadButton from "./DownloadButton";
import { ToolTip } from "@/components/ToolTip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ChartDrawer } from "../ChartDrawer";
import { useTable } from "@/store/table";
import FullScreenButton from "./FullScreenButton";

export default function TableOptions() {
  return (
    <>
      <TooltipProvider>
        <SimulateButton />
        <ChartDrawer />
        <DownloadButton />
        <ToolTip message="Copy">
          <Copy
            className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(useTable.getState().getCopy());
            }}
          />
        </ToolTip>
        <FullScreenButton />
        <ToolTip message="Clear">
          <CircleX
            className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer"
            onClick={() => useTable.getState().clearTable()}
          />
        </ToolTip>
      </TooltipProvider>
    </>
  );
}

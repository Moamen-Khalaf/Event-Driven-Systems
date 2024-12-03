import { useTable } from "@/store/table";
import { CircleX, Copy, Undo2 } from "lucide-react";
import SimulateButton from "./SimulateButton";
import DownloadButton from "./DownloadButton";
import { ToolTip } from "@/components/ToolTip";
export function TableTopBar() {
  const selectedCell = useTable((state) => state.selectedCell);
  return (
    <div className="flex items-center bg-secondary w-full border border-foreground text-primary">
      <input
        type="text"
        placeholder="A1"
        value={selectedCell.pos || ""}
        className="bg-transparent focus:outline-none w-14 text-center px-auto py-2 border-r border-gray-400 font-bold"
      />
      <input
        type="text"
        value={selectedCell.f || selectedCell.v || ""}
        className="outline-none bg-transparent focus:outline-none w-full px-4 py-2"
        placeholder="=SUM(A1:A2) etc."
      />

      <ToolTip message="Forward Chat">
        <Undo2 className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer hover:animate-pulse" />
      </ToolTip>
      <SimulateButton />
      <DownloadButton />
      <ToolTip message="Copy">
        <Copy
          className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(useTable.getState().getCopy());
          }}
        />
      </ToolTip>
      <ToolTip message="Clear">
        <CircleX
          className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer"
          onClick={() => useTable.getState().clearTable()}
        />
      </ToolTip>
    </div>
  );
}

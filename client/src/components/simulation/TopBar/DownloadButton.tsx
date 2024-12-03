import { ToolTip } from "@/components/ToolTip";
import { useTable } from "@/store/table";
import { writeToExcel } from "@/utils/writeToExcel";
import { CircleArrowDown } from "lucide-react";

export default function DownloadButton() {
  return (
    <ToolTip message="Download">
      <CircleArrowDown
        className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer"
        onClick={() => {
          const table = useTable.getState().table;
          const buffer = writeToExcel(table);
          const blob = new Blob([buffer], { type: "application/octet-stream" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "table.xlsx";
          a.click();
          a.remove();
        }}
      />
    </ToolTip>
  );
}

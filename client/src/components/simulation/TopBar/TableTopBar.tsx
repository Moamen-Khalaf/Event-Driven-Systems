import { useTable } from "@/store/table";
import TableOptions from "./TableOptions";

// import { useState } from "react";

export function TableTopBar() {
  const selectedCell = useTable((state) => state.selectedCell);
  // const [cell, setCell] = useState(selectedCell);
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
      <TableOptions />
    </div>
  );
}

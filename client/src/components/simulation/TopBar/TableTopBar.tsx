import { useTable } from "@/store/table";
import TableOptions from "./TableOptions";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export function TableTopBar() {
  const selectedCell = useTable((state) => state.selectedCell);
  const [cell, setCell] = useState(selectedCell);
  useEffect(() => {
    const unsubscribe = useTable.subscribe(
      (state) => state.selectedCell,
      (current) => {
        setCell(current);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center bg-secondary w-full border border-foreground text-primary">
      <input
        type="text"
        placeholder="A1"
        value={cell.pos || ""}
        className="bg-transparent focus:outline-none w-14 text-center px-auto py-2 border-r border-gray-400 font-bold"
      />
      <input
        type="text"
        value={cell.f || cell.v || ""}
        onChange={(event) => {
          if (event.target.value.startsWith("=")) {
            setCell({ ...cell, f: event.target.value });
          } else {
            setCell({ ...cell, v: event.target.value });
          }
        }}
        className="outline-none bg-transparent focus:outline-none w-full px-4 py-2"
        placeholder="=SUM(A1:A2) etc."
      />
      {JSON.stringify(cell) !== JSON.stringify(selectedCell) &&
        (selectedCell.pos.length ? (
          <Check
            className="w-14 hover:text-green-500 hover:dark:text-white cursor-pointer"
            onClick={() => {
              useTable.getState().setCell(cell);
            }}
          />
        ) : null)}
      <TableOptions />
    </div>
  );
}

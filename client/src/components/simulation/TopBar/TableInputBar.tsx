import { useTable } from "@/store/table";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
export default function TableInputBar() {
  const selectedCell = useTable((state) => state.selectedCell);
  const [cell, setCell] = useState(selectedCell);
  useEffect(() => {
    const unsubscribe = useTable.subscribe(
      (state) => state.selectedCell,
      (current) => {
        setCell(current);
        document.getElementById("Tableinput")?.focus();
      }
    );
    return () => unsubscribe();
  }, []);
  const handleChange = (newValue: string) => {
    if (newValue.startsWith("=")) {
      setCell({ ...cell, f: newValue });
    } else {
      setCell({ ...cell, v: newValue });
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="A1"
        value={cell.pos || ""}
        className="bg-transparent focus:outline-none w-14 text-center px-auto py-2 border-r border-gray-400 font-bold"
      />
      <input
        id="Tableinput"
        type="text"
        value={cell.f || cell.v || ""}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            useTable.getState().setCell(cell);
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
    </>
  );
}

import { useTable } from "@/store/table";
import extractPositions from "@/utils/extractPositions";
import { useMemo } from "react";
import { utils } from "xlsx";

export default function TableContnet() {
  const table = useTable((state) => state.table);
  const selectedCell = useTable((state) => state.selectedCell);
  const seletedCellPos = utils.decode_cell(selectedCell.pos);
  const setSelectedCell = useTable((state) => state.setSelectedCell);
  const positions = useMemo(
    () => extractPositions(selectedCell.f.replaceAll("$", "")),
    [selectedCell.f]
  );

  return (
    <tbody className={"text-primary bg-primary-foreground"}>
      {table.map((_, rowIndex: number) => (
        <tr key={rowIndex}>
          <td
            className={`sticky left-0 border border-gray-400 px-4 py-2 bg-[#2563eb] text-white ${
              seletedCellPos.r === rowIndex ? "bg-[#2d4e94]" : ""
            }`}
          >
            {rowIndex + 1}
          </td>
          {table[rowIndex].map((cell, cellIndex) => (
            <td
              key={cellIndex}
              className={`border border-gray-400 px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                seletedCellPos.r === rowIndex && seletedCellPos.c === cellIndex
                  ? "bg-[#2d4e94]/50 text-white"
                  : ""
              } ${
                positions.includes(cell.pos)
                  ? "bg-foreground/10 border-foreground border-dashed border-2"
                  : ""
              }`}
              onClick={() => {
                setSelectedCell(cell);
              }}
            >
              {cell.v}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

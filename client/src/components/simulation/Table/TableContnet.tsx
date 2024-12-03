import { useTable } from "@/store/table";
import { utils } from "xlsx";
export default function TableContnet() {
  const table = useTable((state) => state.table);
  const seletedCellPos = useTable((state) => state.selectedCell.pos);
  const setSelectedCell = useTable((state) => state.setSelectedCell);
  return (
    <tbody>
      {table.map((_, rowIndex: number) => (
        <tr key={rowIndex}>
          <td
            className={`sticky left-0 border border-gray-400 px-4 py-2 bg-[#2563eb] text-white ${
              utils.decode_cell(seletedCellPos || "").r === rowIndex
                ? "bg-[#2d4e94]"
                : ""
            }`}
          >
            {rowIndex + 1}
          </td>
          {table[rowIndex].map((cell, cellIndex) => (
            <td
              key={cellIndex}
              className={`border border-gray-400 px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                seletedCellPos ===
                utils.encode_cell({ c: cellIndex, r: rowIndex })
                  ? "bg-[#2d4e94]/50 text-white"
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

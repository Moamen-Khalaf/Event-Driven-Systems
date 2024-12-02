import { useTable } from "@/store/table";
import { Sparkles } from "lucide-react";
import * as XLSX from "xlsx";

function generateColumnHeaders(length: number) {
  const headers = [];
  for (let i = 0; i < length; i++) {
    let header = "";
    let temp = i;
    while (temp >= 0) {
      header = String.fromCharCode((temp % 26) + 65) + header;
      temp = Math.floor(temp / 26) - 1;
    }
    headers.push(header);
  }
  return headers;
}

function TopBar() {
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
      <Sparkles className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer hover:animate-pulse" />
    </div>
  );
}
function TableHeader() {
  const seletedCellPos = useTable((state) => state.selectedCell.pos);
  const headerLength = useTable((state) => state.table[0].length);
  return (
    <thead>
      <tr>
        <th
          className={`border border-gray-400 px-4 py-2 bg-[#2563eb] text-white`}
        >
          #
        </th>
        {generateColumnHeaders(headerLength).map(
          (header: string, colIndex: number) => (
            <th
              key={colIndex}
              className={`border border-gray-400 px-4 py-2 bg-[#2563eb] text-white ${
                XLSX.utils.decode_cell(seletedCellPos || "").c === colIndex
                  ? "bg-[#2d4e94]"
                  : ""
              }`}
            >
              {header}
            </th>
          )
        )}
      </tr>
    </thead>
  );
}
function TableContnet() {
  const table = useTable((state) => state.table);
  const seletedCellPos = useTable((state) => state.selectedCell.pos);
  const setSelectedCell = useTable((state) => state.setSelectedCell);
  return (
    <tbody>
      {table.map((_, rowIndex: number) => (
        <tr key={rowIndex}>
          <td
            className={`border border-gray-400 px-4 py-2 bg-[#2563eb] text-white ${
              XLSX.utils.decode_cell(seletedCellPos || "").r === rowIndex
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
                XLSX.utils.encode_cell({ c: cellIndex, r: rowIndex })
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
export default function Table() {
  return (
    <>
      <TopBar />
      <div className="flex-grow w-full transition-opacity duration-300 opacity-100 max-h-[95vh] overflow-auto">
        <table className="table-auto w-full border-collapse text-center select-none">
          <TableHeader />
          <TableContnet />
        </table>
      </div>
    </>
  );
}

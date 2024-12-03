import { useTable } from "@/store/table";
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
export function TableHeader() {
  const seletedCellPos = useTable((state) => state.selectedCell.pos);
  const headerLength = useTable((state) => state.table[0].length);
  return (
    <thead>
      <tr>
        <th
          className={`border border-gray-400 px-4 py-2 bg-[#2563eb] text-white`}
          onClick={() =>
            useTable.getState().setSelectedCell({ v: "", f: "", pos: "" })
          }
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
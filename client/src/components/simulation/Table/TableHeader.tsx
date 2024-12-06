import { useTable } from "@/store/table";
import generateColumnHeaders from "@/utils/generateColumnHeaders";

export function TableHeader() {
  const seletedCellPos = useTable((state) => state.selectedCellPos);
  const headerLength = useTable((state) => state.table[0].length);
  return (
    <thead>
      <tr className="sticky top-0 z-10">
        <th
          className={`sticky left-0 border border-gray-400 px-4 py-2 bg-[#2563eb] text-white`}
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
                seletedCellPos.c === colIndex ? "bg-[#2d4e94]" : ""
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

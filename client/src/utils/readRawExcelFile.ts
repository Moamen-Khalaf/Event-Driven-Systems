import { useSimulationConfig } from "@/store/simulationConfig";
import * as XLSX from "xlsx";
export type CellType = {
  v: string | number;
  f: string;
  pos: string;
};
export function resizeTable(data: (string | number)[][]): CellType[][] {
  const maxCol = data.reduce((acc, row) => Math.max(acc, row.length), 0);
  const maxRow = data.length;
  return Array.from({ length: maxRow }, () =>
    Array.from({ length: maxCol }, () => null)
  ).map((row, r) =>
    row.map(
      (_, c) =>
        ({
          v: data[r][c] || "",
          f: "",
          pos: XLSX.utils.encode_cell({ r, c }),
        } as CellType)
    )
  );
}
export const readRawExcelFile = (file: ArrayBuffer) => {
  try {
    const workbook: XLSX.WorkBook = XLSX.read(file, { type: "buffer" });
    const sheetName: string = workbook.SheetNames[0];
    const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      blankrows: true,
      raw: true,
    }) as unknown[][];
    const customerNumber = useSimulationConfig.getState().numberOfClients;
    for (let i = 1; i <= customerNumber; i++) {
      data.push([i]);
    }

    const table = resizeTable(data as (string | number)[][]);
    return table;
  } catch (error) {
    console.log(error);
    throw "Error reading Excel file:";
  }
};

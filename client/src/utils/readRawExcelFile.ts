import { useSimulationConfig } from "@/store/simulationConfig";
import { read, utils, type WorkBook, type WorkSheet } from "xlsx";
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
          pos: utils.encode_cell({ r, c }),
        } as CellType)
    )
  );
}
export const readRawExcelFile = (file: ArrayBuffer) => {
  try {
    const workbook: WorkBook = read(file, { type: "buffer" });
    const sheetName: string = workbook.SheetNames[0];
    const sheet: WorkSheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(sheet, {
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

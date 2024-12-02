import * as XLSX from "xlsx";
type CellType = {
  v: string | number;
  f: string;
  pos: string;
};
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
    const maxCol = data.reduce((acc, row) => Math.max(acc, row.length), 0);
    const maxRow = data.length;
    const table = Array.from({ length: maxRow }, () =>
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
    return table;
  } catch (error) {
    throw "Error reading Excel file:";
    console.log(error);
  }
};

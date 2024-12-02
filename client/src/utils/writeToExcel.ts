import * as XLSX from "xlsx";
import type { CellType } from "./readRawExcelFile";

export const writeToExcel = (data: CellType[][]): Buffer => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });
  return excelBuffer;
};

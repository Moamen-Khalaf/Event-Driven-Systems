import * as XLSX from "xlsx";
import type { CellType } from "./readRawExcelFile";

export const writeToExcel = (data: CellType[][]): Buffer => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data, {
    cellDates: true,
    dateNF: "hh:mm:ss AM/PM",
  });
  data = data.map((row) =>
    row.map((cell) => {
      if (/^\d{1,2}:\d{2}(:\d{2})?\s?(AM|PM)?$/i.test(cell.v.toString())) {
        return { ...cell, z: "hh:mm:ss AM/PM", t: "d" };
      }
      return cell;
    })
  );
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });
  return excelBuffer;
};

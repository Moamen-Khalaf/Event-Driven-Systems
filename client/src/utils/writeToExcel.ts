import { utils, write } from "xlsx";
import type { CellType } from "./readRawExcelFile";

export const writeToExcel = (data: CellType[][]): Buffer => {
  const workbook = utils.book_new();
  const worksheet = utils.aoa_to_sheet(data, {
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
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });
  return excelBuffer;
};

import type { WritableDraft } from "immer";
import type { CellType } from "./readRawExcelFile";
import { utils } from "xlsx";

export default function writeTable(
  srcTable: CellType[][],
  destTable: WritableDraft<CellType>[][]
) {
  if (!srcTable) return;
  srcTable.forEach((row) =>
    row.forEach((cell) => {
      const { r, c } = utils.decode_cell(cell.pos);
      destTable[r][c] = cell;
    })
  );
}

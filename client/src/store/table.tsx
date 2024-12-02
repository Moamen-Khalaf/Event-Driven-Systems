import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import * as XSLX from "xlsx";

interface CellType {
  v: string | number;
  f: string;
  pos: string;
}

interface TableProps {
  selectedCell: CellType;
  table: CellType[][];
  setSelectedCell: (cell: CellType) => void;
  setTable: (table: CellType[][]) => void;
  clearTable: () => void;
  getCopy: () => string;
}
const defaultTable = Array.from({ length: 30 }, (_, r) =>
  Array.from({ length: 40 }, (_, c) => ({
    v: "",
    f: "",
    pos: XSLX.utils.encode_cell({ c, r }),
  }))
);
const defaultCell = { v: "", f: "", pos: "" };
export const useTable = create<TableProps>()(
  immer((set, get) => ({
    selectedCell: defaultCell,
    table: defaultTable,
    setSelectedCell: (cell) =>
      set((state) => {
        state.selectedCell = cell;
      }),
    setTable: (table) =>
      set((state) => {
        table.forEach((row) =>
          row.forEach((cell) => {
            const { r, c } = XSLX.utils.decode_cell(cell.pos);
            state.table[r][c] = cell;
          })
        );
      }),
    clearTable: () =>
      set((state) => {
        state.table = defaultTable;
        state.selectedCell = defaultCell;
      }),
    getCopy: () =>
      JSON.stringify(get().table.map((row) => row.map((cell) => cell.v))),
  }))
);

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type CellType } from "@/utils/readRawExcelFile";
import { devtools } from "zustand/middleware";
import { utils } from "xlsx";
import writeTable from "@/utils/writeTable";
import { simulate } from "@/utils/simulate";
export type INotification = {
  type: "error" | "success" | null;
  message: string;
};
interface TableProps {
  selectedCell: CellType;
  selectedCellPos: { r: number; c: number };
  table: CellType[][];
  notification: INotification;
  loading: boolean;
  setSelectedCell: (cell: CellType) => void;
  setTable: (table: CellType[][]) => void;
  clearTable: () => void;
  getCopy: () => string;
  simulate: () => Promise<void>;
}

const defaultTable = Array.from({ length: 70 }, (_, r) =>
  Array.from({ length: 70 }, (_, c) => ({
    v: "",
    f: "",
    pos: utils.encode_cell({ c, r }),
  }))
);
const defaultCell = { v: "", f: "", pos: "" };

export const useTable = create<TableProps>()(
  devtools(
    immer((set, get) => ({
      selectedCell: defaultCell,
      selectedCellPos: { r: -1, c: -1 },
      table: defaultTable,
      notification: {
        type: null,
        message: "",
      },
      loading: false,
      setSelectedCell: (cell) =>
        set((state) => {
          state.selectedCell = cell;
          state.selectedCellPos = utils.decode_cell(cell.pos);
        }),
      setTable: (table) =>
        set((state) => {
          writeTable(table, state.table);
        }),
      clearTable: () =>
        set((state) => {
          state.table = defaultTable;
          state.selectedCell = defaultCell;
        }),
      getCopy: () =>
        get().table.reduce((acc, row) => {
          const line = row
            .reduce((acc, cell) => {
              return acc + cell.v + "\t";
            }, "")
            .trim();
          return line ? acc + line + "\n" : acc;
        }, ""),
      simulate: async () => {
        set((state) => {
          state.loading = true;
          state.notification = {
            type: null,
            message: "",
          };
        });
        try {
          const result = (await simulate()) as {
            table: CellType[][];
            arrivals: CellType[][];
            services: CellType[][];
          };
          set((state) => {
            writeTable(result.table, state.table);
            writeTable(result.arrivals, state.table);
            writeTable(result.services, state.table);
          });
        } catch (error) {
          set((state) => {
            state.notification = {
              type: "error",
              message: String(error),
            };
          });
        } finally {
          set((state) => {
            state.loading = false;
          });
        }
      },
    })),
    {
      name: "table",
    }
  )
);

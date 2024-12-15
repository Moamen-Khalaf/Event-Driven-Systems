import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type CellType } from "@/utils/readRawExcelFile";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { utils } from "xlsx";
import writeTable from "@/utils/writeTable";
import { simulate } from "@/utils/simulate";
import { TableParser } from "@/utils/TableParser";
export type INotification = {
  type: "error" | "success" | null;
  message: string;
};
interface TableProps {
  selectedCell: CellType;
  table: CellType[][];
  chartData: {
    Clock: string;
    Customers: number;
  }[];
  notification: INotification;
  loading: boolean;
  setSelectedCell: (cell: CellType) => void;
  setTable: (table: CellType[][]) => void;
  clearTable: () => void;
  getCopy: () => string;
  simulate: () => Promise<void>;
  getParcedTable: () => CellType[][][];
  setCell: (cell: CellType) => void;
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
  subscribeWithSelector(
    devtools(
      immer((set, get) => ({
        selectedCell: defaultCell,
        chartData: [],
        table: defaultTable,
        notification: {
          type: null,
          message: "",
        },
        loading: false,
        setSelectedCell: (cell) =>
          set((state) => {
            state.selectedCell = cell;
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
              chartData: {
                Clock: string;
                Customers: number;
              }[];
            };
            set((state) => {
              writeTable(result.table, state.table);
              writeTable(result.arrivals, state.table);
              writeTable(result.services, state.table);
              state.chartData = result.chartData;
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
        getParcedTable: () => {
          const table = get().table;
          const parsedTables = new TableParser(table).getParsedTables();
          return parsedTables;
        },
        setCell: (cell) => {
          set((state) => {
            const pos = utils.decode_cell(cell.pos);

            // Clone the specific row and update the cell
            const updatedRow = [...state.table[pos.r]];
            updatedRow[pos.c] = { ...updatedRow[pos.c], v: cell.v, f: cell.f };

            // Replace only the specific row in the table
            const updatedTable = [...state.table];
            updatedTable[pos.r] = updatedRow;

            state.table = updatedTable;
            state.selectedCell = cell;
          });
        },
      })),
      {
        name: "table",
      }
    )
  )
);

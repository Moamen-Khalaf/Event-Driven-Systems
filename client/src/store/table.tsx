import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import * as XSLX from "xlsx";
import { type CellType } from "@/utils/readRawExcelFile";
import { useSimulationConfig } from "./simulationConfig";
import { devtools, persist } from "zustand/middleware";
import { TableParser } from "@/utils/TableParser";
import type { WritableDraft } from "immer";

interface TableProps {
  selectedCell: CellType;
  table: CellType[][];
  error: string;
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
    pos: XSLX.utils.encode_cell({ c, r }),
  }))
);
const defaultCell = { v: "", f: "", pos: "" };
function parceTable(table: CellType[][]) {
  const result = {
    arrivals: [] as CellType[][],
    services: [] as CellType[][],
    startTime: {} as CellType,
    table: [] as CellType[][],
  };

  let i = 0;
  const tableParser = new TableParser(table);
  const parseSection = (
    index: number
  ): { section: CellType[][]; nextIndex: number } => {
    index = tableParser.skipSpaces(index);
    const { curtable, nextIndex } = tableParser.createTable(index);
    return { section: curtable, nextIndex };
  };

  // Parse "services" section
  let parseResult = parseSection(i);
  result.services = parseResult.section;
  i = parseResult.nextIndex;

  // Parse "arrivals" section
  parseResult = parseSection(i);
  result.arrivals = parseResult.section;
  i = parseResult.nextIndex;

  // Parse "startTime" section
  i = tableParser.skipSpaces(i);
  if (table[i] && table[i][0]?.v === "Start Time:") {
    result.startTime = table[i][1];
    i++;
  }

  // Parse main "table" section
  parseResult = parseSection(i);
  result.table = parseResult.section;

  return result;
}

async function simulate() {
  const parcedTable = parceTable(useTable.getState().table);
  const tableType = useSimulationConfig.getState().simulationType;
  const version = tableType === "normal" ? "v1" : "v2";
  const data = await fetch(`/api/simulate/${version}`, {
    method: "POST",
    body: JSON.stringify(parcedTable),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.ok) {
    throw `Error in simulation ${data.status}`;
  }
  const result = await data.json();
  return result;
}
function writeTable(
  srcTable: CellType[][],
  destTable: WritableDraft<CellType>[][]
) {
  if (!srcTable) return;
  srcTable.forEach((row) =>
    row.forEach((cell) => {
      const { r, c } = XSLX.utils.decode_cell(cell.pos);
      destTable[r][c] = cell;
    })
  );
}
export const useTable = create<TableProps>()(
  devtools(
    persist(
      immer((set, get) => ({
        selectedCell: defaultCell,
        table: defaultTable,
        error: "",
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
            state.error = "";
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
              state.error = String(error);
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
    ),
    {
      name: "table",
    }
  )
);

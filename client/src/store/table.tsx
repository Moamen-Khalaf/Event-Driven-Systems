import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import * as XSLX from "xlsx";
import { type CellType } from "@/utils/readRawExcelFile";
import { useSimulationConfig } from "./simulationConfig";
import { devtools, persist } from "zustand/middleware";

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
function parseNormalTable(table: CellType[][]) {
  const result = {
    arrivals: [] as CellType[][],
    services: [] as CellType[][],
    startTime: {} as CellType,
    table: [] as CellType[][],
  };

  const skipSpaces = (i: number): number => {
    while (i < table.length && table[i][0]?.v === "") {
      i++;
    }
    return i;
  };

  const createTable = (
    startIndex: number
  ): { curtable: CellType[][]; nextIndex: number } => {
    const curtable = [] as CellType[][];
    let i = startIndex;
    const tableWidth = table[i].filter((cell) => cell.v !== "").length;

    while (i < table.length && table[i][0]?.v !== "") {
      curtable.push(table[i].slice(0, tableWidth));
      i++;
    }
    curtable.shift(); // Remove the first row which is the header
    return { curtable, nextIndex: i };
  };

  let i = 0;

  // Parse "services" section
  i = skipSpaces(i);
  let tableRes = createTable(i);
  result.services = tableRes.curtable;
  i = tableRes.nextIndex;

  // Parse "arrivals" section
  i = skipSpaces(i);
  tableRes = createTable(i);
  result.arrivals = tableRes.curtable;
  i = tableRes.nextIndex;

  // Parse "startTime" section
  i = skipSpaces(i);
  if (table[i] && table[i][0]?.v === "Start Time:") {
    result.startTime = table[i][1]; // Assuming the start time is always in the second column
    i++;
  }

  // Parse main "table" section
  i = skipSpaces(i);
  tableRes = createTable(i);
  result.table = tableRes.curtable;

  console.log(result);
  return result;
}

function parceProbTable(table: CellType[][]) {}

function parceTable(table: CellType[][], tableType: "normal" | "probability") {
  switch (tableType) {
    case "normal":
      return parseNormalTable(table);
    case "probability":
      return parceProbTable(table);
  }
}
async function simulate() {
  const tableType = useSimulationConfig.getState().simulationType;
  const parcedTable = parceTable(useTable.getState().table, tableType!);
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
            const result = (await simulate()) as { table: CellType[][] };
            console.log(result);
            set((state) => {
              result.table.forEach((row) => {
                row.forEach((cell) => {
                  const { r, c } = XSLX.utils.decode_cell(cell.pos);
                  state.table[r][c] = cell;
                });
              });
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

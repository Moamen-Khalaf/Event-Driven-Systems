import type { CellType } from "./readRawExcelFile";
import { TableParser } from "./TableParser";

export function parceTable(table: CellType[][]) {
  const result = {
    arrivals: [] as CellType[][],
    services: [] as CellType[][],
    startTime: {} as CellType,
    table: [] as CellType[][],
  };

  const tableParser = new TableParser(table);
  const parsedTable = tableParser.getParsedTables();
  // Parse "services" section
  result.services = parsedTable[0] as CellType[][];

  // Parse "arrivals" section
  result.arrivals = parsedTable[1];

  // Parse "startTime" section
  result.startTime = parsedTable[2][0][1];

  // Parse main "table" section
  result.table = parsedTable[3];
  console.log(result);

  return result;
}

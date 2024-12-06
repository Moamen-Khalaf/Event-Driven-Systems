import type { CellType } from "./readRawExcelFile";
import { TableParser } from "./TableParser";

export function parceTable(table: CellType[][]) {
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

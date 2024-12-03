import type { CellType } from "./readRawExcelFile";

export class TableParser {
  private table: CellType[][] = [] as CellType[][];

  constructor(table: CellType[][]) {
    this.table = table;
  }

  public skipSpaces(i: number): number {
    while (i < this.table.length && this.table[i][0]?.v === "") {
      i++;
    }
    return i;
  }

  public createTable(startIndex: number): {
    curtable: CellType[][];
    nextIndex: number;
  } {
    const curtable = [] as CellType[][];
    let i = startIndex;
    const tableWidth = this.table[i].filter((cell) => cell.v !== "").length;

    while (i < this.table.length && this.table[i][0]?.v !== "") {
      curtable.push(this.table[i].slice(0, tableWidth));
      i++;
    }
    curtable.shift(); // Remove the first row which is the header
    return { curtable, nextIndex: i };
  }
}

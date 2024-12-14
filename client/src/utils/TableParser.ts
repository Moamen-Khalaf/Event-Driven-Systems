import type { CellType } from "./readRawExcelFile";

export class TableParser {
  private table: CellType[][] = [] as CellType[][];

  constructor(table: CellType[][]) {
    this.table = table;
  }

  private skipSpaces(i: number): number {
    while (i < this.table.length && this.table[i][0]?.v === "") {
      i++;
    }
    return i;
  }

  private createTable(startIndex: number): {
    curtable: CellType[][];
    nextIndex: number;
  } {
    const curtable = [] as CellType[][];
    let i = startIndex;

    const tableWidth = this.table[i]?.filter((cell) => cell.v !== "").length;

    while (i < this.table.length && this.table[i][0]?.v !== "") {
      curtable.push(this.table[i].slice(0, tableWidth));
      i++;
    }
    return { curtable, nextIndex: i };
  }
  public getParsedTables(): CellType[][][] {
    let i = 0;
    const parsedTables = [] as CellType[][][];
    while (i < this.table.length) {
      i = this.skipSpaces(i);
      const { curtable, nextIndex } = this.createTable(i);
      parsedTables.push(curtable);
      i = nextIndex;
    }
    return parsedTables;
  }
}

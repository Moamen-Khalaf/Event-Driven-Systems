import { CellType } from "./types";

class TableUtilities {
  private table: CellType[][];

  constructor(table: CellType[][]) {
    this.table = table;
  }
  private randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Converts a cell position (e.g., "A1") into Excel-style absolute references (e.g., "$A$1").
  private fixPosition(cell: CellType): string {
    const match = cell.pos.match(/([A-Z]+)(\d+)/);
    if (!match) {
      throw new Error(`Invalid cell position: ${cell.pos}`);
    }
    const [col, row] = match.slice(1);
    return `$${col}$${row}`;
  }

  // Generates an Excel RANDBETWEEN formula for a range within the table.
  private getRandBetweenFormula(
    lookupColStart: number,
    lookupColEnd: number
  ): string {
    const start = this.fixPosition(this.table[0][lookupColStart]);
    const end = this.fixPosition(
      this.table[this.table.length - 1][lookupColEnd]
    );
    return `=RANDBETWEEN(${start},${end})`;
  }

  // Returns a random number between values in the specified range of the table.
  private getRandBetweenValue(
    lookupColStart: number,
    lookupColEnd: number
  ): number {
    const min = +this.table[0][lookupColStart].v;
    const max = +this.table[this.table.length - 1][lookupColEnd].v;
    return this.randomBetween(min, max);
  }

  public getRandBetween(lookupColStart: number, lookupColEnd: number) {
    const formula = this.getRandBetweenFormula(lookupColStart, lookupColEnd);
    const value = this.getRandBetweenValue(lookupColStart, lookupColEnd);
    return { value, formula };
  }
  // Generates an Excel LOOKUP formula.
  private getLookupFormula(
    cell: CellType,
    lookupColStart: number,
    lookupColEnd: number,
    resultCol: number
  ): string {
    const lookupStart = this.fixPosition(this.table[0][lookupColStart]);
    const lookupEnd = this.fixPosition(
      this.table[this.table.length - 1][lookupColEnd]
    );
    const resultStart = this.fixPosition(this.table[0][resultCol]);
    const resultEnd = this.fixPosition(
      this.table[this.table.length - 1][resultCol]
    );

    return `=LOOKUP(${cell.pos},${lookupStart}:${lookupEnd},${resultStart}:${resultEnd})`;
  }

  // Finds a value in the result column for a specific cell value.
  private getLookupValue(
    cell: CellType,
    lookupColStart: number,
    lookupColEnd: number,
    resultCol: number
  ): string | number {
    const resultRow = this.table.find((row) => {
      const startValue = +row[lookupColStart].v;
      const endValue = +row[lookupColEnd].v;
      return startValue <= +cell.v && +cell.v <= endValue;
    });
    if (!resultRow) {
      throw new Error(`No value found for ${cell.v}`);
    }
    return resultRow[resultCol].v;
  }

  public getLookup(
    cell: CellType,
    lookupColStart: number,
    lookupColEnd: number,
    resultCol: number
  ) {
    const formula = this.getLookupFormula(
      cell,
      lookupColStart,
      lookupColEnd,
      resultCol
    );
    const value = this.getLookupValue(
      cell,
      lookupColStart,
      lookupColEnd,
      resultCol
    );
    return { value, formula };
  }
}

export default TableUtilities;

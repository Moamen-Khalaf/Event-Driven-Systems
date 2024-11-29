import randomBetween from "./randomBetween";
import { CellType } from "./types";

const fixPositin = (cell: CellType) => {
  const [col, row] = cell.pos.match(/([A-Z]+)(\d+)/)!.slice(1);
  return `$${col}$${row}`;
};

export function getRandBetweenFormula(
  table: CellType[][],
  lookupColStart: number,
  lookupColEnd: number
) {
  return `=RANDBETWEEN(${fixPositin(table[0][lookupColStart])},${fixPositin(
    table[table.length - 1][lookupColEnd]
  )})`;
}

export function getRandBetweenValue(
  table: CellType[][],
  lookupColStart: number,
  lookupColEnd: number
) {
  return randomBetween(
    +table[0][lookupColStart].v,
    +table[table.length - 1][lookupColEnd].v
  );
}

export default function createLookupUtilities(table: CellType[][]) {
  return {
    getLookupFormula: (
      cell: CellType,
      lookupColStart: number,
      lookupColEnd: number,
      resultCol: number
    ) => {
      return `=LOOKUP(${cell.pos},${fixPositin(
        table[0][lookupColStart]
      )}:${fixPositin(table[table.length - 1][lookupColEnd])}, ${fixPositin(
        table[0][resultCol]
      )}:${fixPositin(table[table.length - 1][resultCol])})`;
    },
    getLookupValue: (
      cell: CellType,
      lookupColStart: number,
      lookupColEnd: number
    ) => {
      const foundCell = table.find((row) => {
        return (
          +row[lookupColStart].v <= +cell.v && +row[lookupColEnd].v >= +cell.v
        );
      });
      if (!foundCell) {
        throw new Error("Cell not found in the table");
      }
      return foundCell[0];
    },
  };
}

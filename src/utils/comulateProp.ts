import { CellType } from "./types";

export default function comulateProp(propTable: CellType[][]) {
  const base = 1000;
  let lastRow = propTable[0];
  // Cumulative Probablity
  lastRow[2].v = +lastRow[1].v * base;
  lastRow[2].f = `=${lastRow[1].pos} * ${base}`;
  // From
  lastRow[3].v = 0;
  // To
  lastRow[4].v = lastRow[2].v;
  lastRow[4].f = `=${lastRow[3].pos}`;
  propTable[0] = lastRow;
  for (let i = 1; i < propTable.length; i++) {
    let row = propTable[i];
    // Cumulative Probablity
    row[2].v = +lastRow[2].v + +row[1].v * base;
    row[2].f = `=${lastRow[2].pos}+${row[1].pos}`;
    // From
    row[3].v = +lastRow[4].v + 1;
    row[3].f = `=${lastRow[4].pos}+1`;
    // To
    row[4].v = +row[2].v;
    row[4].f = `=${row[3].pos}`;
    lastRow = row;
    propTable[i] = row;
  }

  return propTable;
}

import { CellType } from "../types";

export default function updateProbabilityTable(propTable: CellType[][]) {
  const base = 1000;
  let lastRow = propTable[0];
  const compulateIndex = 2;
  const fromIndex = 3;
  const toIndex = 4;
  // Cumulative Probablity
  lastRow[compulateIndex].v = +lastRow[1].v * base;
  lastRow[compulateIndex].f = `=${lastRow[1].pos} * ${base}`;
  // From
  lastRow[fromIndex].v = 0;
  // To
  lastRow[toIndex].v = lastRow[compulateIndex].v;
  lastRow[toIndex].f = `=${lastRow[fromIndex].pos}`;
  propTable[0] = lastRow;
  for (let i = 1; i < propTable.length; i++) {
    let row = propTable[i];
    // Cumulative Probablity
    row[compulateIndex].v = +lastRow[compulateIndex].v + +row[1].v * base;
    row[compulateIndex].f = `=${lastRow[compulateIndex].pos}+${row[1].pos}`;
    // From
    row[fromIndex].v = +lastRow[toIndex].v + 1;
    row[fromIndex].f = `=${lastRow[toIndex].pos}+1`;
    // To
    row[toIndex].v = +row[2].v;
    row[toIndex].f = `=${row[fromIndex].pos}`;
    lastRow = row;
    propTable[i] = row;
  }

  return propTable;
}

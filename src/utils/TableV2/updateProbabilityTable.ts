import { CellType } from "../types";

export default function updateProbabilityTable(propTable: CellType[][]) {
  const base = 1000;
  let lastRow = propTable[0];
  const probablityIndex = 1;
  const comulateIndex = 2;
  const fromIndex = 3;
  const toIndex = 4;
  // Cumulative Probablity
  lastRow[comulateIndex].v = +lastRow[probablityIndex].v * base;
  lastRow[comulateIndex].f = `=${lastRow[probablityIndex].pos} * ${base}`;
  // From
  lastRow[fromIndex].v = 0;
  lastRow[fromIndex].f= "=0";
  // To
  lastRow[toIndex].v = lastRow[comulateIndex].v;
  lastRow[toIndex].f = `=${lastRow[comulateIndex].pos}`;
  propTable[0] = lastRow;
  for (let i = 1; i < propTable.length; i++) {
    let row = propTable[i];
    // Cumulative Probablity
    row[comulateIndex].v =
      +lastRow[comulateIndex].v + +row[probablityIndex].v * base;
    row[
      comulateIndex
    ].f = `=${lastRow[comulateIndex].pos}+${row[probablityIndex].pos}*${base}`;
    // From
    row[fromIndex].v = +lastRow[toIndex].v + 1;
    row[fromIndex].f = `=${lastRow[toIndex].pos}+1`;
    // To
    row[toIndex].v = +row[comulateIndex].v;
    row[toIndex].f = `=${row[comulateIndex].pos}`;
    lastRow = row;
    propTable[i] = row;
  }

  return propTable;
}

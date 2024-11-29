import { SimulationHeadersV2 } from "./simulateV2";
import { BaseUserRow, CellType } from "./types";

export function parseUsers(users: CellType[][], simulationHeaders: string[]) {
  return users.map((row) => {
    return row.reduce((acc, cell, i) => {
      acc[simulationHeaders[i] as SimulationHeadersV2] = cell;
      return acc;
    }, {} as BaseUserRow);
  });
}

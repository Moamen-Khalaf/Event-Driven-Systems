import { SimulationHeadersV1 } from "../TableV1/simulateV1";
import { CellType } from "../types";

export type SimulationHeadersV2 =
  | SimulationHeadersV1
  | "RandService"
  | "RandArrival";

export type UserRow = Record<SimulationHeadersV2, CellType>;

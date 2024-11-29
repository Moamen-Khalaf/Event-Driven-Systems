import { z } from "zod";
import { cellVSchema, rowVSchema } from "./simualteV1Valid";

export const simualtionV2VSchema = z.object({
  arrivals: z.array(rowVSchema),
  services: z.array(rowVSchema),
  startTime: cellVSchema,
  table: z.array(rowVSchema),
});

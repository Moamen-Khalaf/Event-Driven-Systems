import { z } from "zod";

export const cellVSchema = z.object({
  v: z.union([z.string(), z.number()]),
  f: z.string(),
  pos: z.string(),
});
export const rowVSchema = z.array(cellVSchema);
export const simualtionV1VSchema = z.object({
  table: z.array(rowVSchema),
  startTime: cellVSchema,
});

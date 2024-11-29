import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import comulateProp from "../utils/comulateProp";
import { fillProbabilities } from "../utils/fillProbabilities";
import { parseUsers } from "../utils/parceUsers";
import setFormatedTime from "../utils/setFormatedTime";
import simulateV1, { UserRow } from "../utils/simulateV1";
import { UserRow as UserRowV2 } from "../utils/simulateV2";
import { simualtionV1VSchema } from "../validation/simualteV1Valid";
import { simualtionV2VSchema } from "../validation/simualteV2Valid";

export const simulateRoute = new Hono()
  .basePath("/simulate")
  .post("/v1", zValidator("json", simualtionV1VSchema), (c) => {
    try {
      const { table, startTime } = c.req.valid("json");
      const simulationHeaders = [
        "CLIENT_ID",
        "INTERARRIVAL_TIME",
        "ISSUE_CODE",
        "ARRIVAL_TIME",
        "ISSUE",
        "TIME_SER_BEG",
        "SERVICE_TIME",
        "TIME_SER_ENDS",
        "CUST_STATE",
        "SYSTEM_STATE",
      ];
      const parsedUsers = parseUsers(table, simulationHeaders) as UserRow[];
      const simulatedTable = simulateV1(parsedUsers);
      const formatedTable = setFormatedTime(simulatedTable, startTime);
      return c.json({
        table: formatedTable.map((user) => Object.values(user)),
      });
    } catch (error) {
      return c.json({ error }, 400);
    }
  })
  .post("/v2", zValidator("json", simualtionV2VSchema), (c) => {
    try {
      const { table, arrivals, services, startTime } = c.req.valid("json");
      const simulationHeaders = [
        "CLIENT_ID",
        "RandArrival",
        "INTERARRIVAL_TIME",
        "ARRIVAL_TIME",
        "TIME_SER_BEG",
        "RandService",
        "SERVICE_TIME",
        "TIME_SER_ENDS",
        "CUST_STATE",
        "SYSTEM_STATE",
      ];
      const parsedUsers = parseUsers(table, simulationHeaders) as UserRowV2[];
      const comArrivals = comulateProp(arrivals);
      const comServices = comulateProp(services);
      const filledUsers = fillProbabilities(
        comServices,
        comArrivals,
        parsedUsers
      );
      const simulatedTable = simulateV1(filledUsers);
      const formatedTable = setFormatedTime(simulatedTable, startTime);
      return c.json({
        table: formatedTable.map((user) => Object.values(user)),
        arrivals: comArrivals,
        services: comServices,
      });
    } catch (error) {
      console.log(error);
      return c.json({ error }, 400);
    }
  });

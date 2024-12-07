import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import getChartData from "../utils/getChartData";
import { parseUsers } from "../utils/parceUsers";
import setFormatedTime from "../utils/setFormatedTime";
import setLookupV1 from "../utils/TableV1/setLookupV1";
import simulateV1, { UserRow } from "../utils/TableV1/simulateV1";
import { fillProbabilities } from "../utils/TableV2/fillProbabilities";
import { UserRow as UserRowV2 } from "../utils/TableV2/simulateV2";
import updateProbabilityTable from "../utils/TableV2/updateProbabilityTable";
import { simualtionV1VSchema } from "../validation/simualteV1Valid";
import { simualtionV2VSchema } from "../validation/simualteV2Valid";

export const simulateRoute = new Hono()
  .basePath("/simulate")
  .post("/v1", zValidator("json", simualtionV1VSchema), (c) => {
    try {
      const { table, arrivals, services, startTime } = c.req.valid("json");
      const simulationHeaders = [
        "CLIENT_ID",
        "INTERARRIVAL_TIME",
        "ARRIVAL_TIME",
        "ISSUE_CODE",
        "ISSUE",
        "TIME_SER_BEG",
        "SERVICE_TIME",
        "TIME_SER_ENDS",
        "CUST_STATE",
        "SYSTEM_STATE",
      ];
      let parsedUsers = parseUsers(table, simulationHeaders) as UserRow[];
      parsedUsers = setLookupV1(parsedUsers, arrivals, services);
      const simulatedTable = simulateV1(parsedUsers, startTime);
      const chartData = getChartData(simulatedTable);
      const formatedTable = setFormatedTime(simulatedTable, startTime);
      return c.json({
        table: formatedTable.map((user) => Object.values(user)),
        chartData,
      });
    } catch (error) {
      console.log(error);
      return c.json({ error: String(error) }, 400);
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
      const comArrivals = updateProbabilityTable(arrivals);
      const comServices = updateProbabilityTable(services);
      // version 2 specific code
      const filledUsers = fillProbabilities(
        comServices,
        comArrivals,
        parsedUsers
      );
      const simulatedTable = simulateV1(filledUsers, startTime);
      const chartData = getChartData(simulatedTable);
      const formatedTable = setFormatedTime(simulatedTable, startTime);
      return c.json({
        table: formatedTable.map((user) => Object.values(user)),
        arrivals: comArrivals,
        services: comServices,
        chartData,
      });
    } catch (error) {
      console.log(error);
      return c.json({ error: String(error) }, 400);
    }
  });

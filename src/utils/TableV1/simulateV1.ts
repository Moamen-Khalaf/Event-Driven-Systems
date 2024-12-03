import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CellType } from "../types";
dayjs.extend(customParseFormat);
export type SimulationHeadersV1 =
  | "CLIENT_ID"
  | "INTERARRIVAL_TIME"
  | "ISSUE_CODE"
  | "ARRIVAL_TIME"
  | "ISSUE"
  | "TIME_SER_BEG"
  | "SERVICE_TIME"
  | "TIME_SER_ENDS"
  | "CUST_STATE"
  | "SYSTEM_STATE";
export type UserRow = Record<SimulationHeadersV1, CellType>;

export default function simulateV1(users: UserRow[], startTime: CellType) {
  let lastUser = users[0];
  lastUser.ARRIVAL_TIME.v = lastUser.INTERARRIVAL_TIME.v;
  lastUser.TIME_SER_BEG.v = lastUser.ARRIVAL_TIME.v;
  lastUser.TIME_SER_ENDS.v =
    +lastUser.TIME_SER_BEG.v + +lastUser.SERVICE_TIME.v;
  lastUser.CUST_STATE.v = 0;
  lastUser.SYSTEM_STATE.v = lastUser.ARRIVAL_TIME.v;

  // formulas
  lastUser.ARRIVAL_TIME.f = `=TIME(0,${lastUser.INTERARRIVAL_TIME.pos},0)+${startTime.pos}`;
  lastUser.TIME_SER_ENDS.f = `=${lastUser.TIME_SER_BEG.pos}+TIME(0,${lastUser.SERVICE_TIME.pos},0)`;
  lastUser.SYSTEM_STATE.f = `=${lastUser.INTERARRIVAL_TIME.pos}`;
  users[0] = lastUser;
  for (let i = 1; i < users.length; i++) {
    const user = users[i];
    user.ARRIVAL_TIME.v = +lastUser.ARRIVAL_TIME.v + +user.INTERARRIVAL_TIME.v;
    user.TIME_SER_BEG.v = Math.max(
      +lastUser.TIME_SER_ENDS.v,
      +user.ARRIVAL_TIME.v
    );
    user.TIME_SER_ENDS.v = +user.TIME_SER_BEG.v + +user.SERVICE_TIME.v;
    user.CUST_STATE.v = user.TIME_SER_BEG.v - user.ARRIVAL_TIME.v;
    user.SYSTEM_STATE.v = Math.max(
      0,
      user.ARRIVAL_TIME.v - +lastUser.TIME_SER_ENDS.v
    );

    // formulas
    user.ARRIVAL_TIME.f = `=${lastUser.ARRIVAL_TIME.pos}+TIME(0,${user.INTERARRIVAL_TIME.pos},0)`;
    user.TIME_SER_BEG.f = `=MAX(${lastUser.TIME_SER_ENDS.pos},${user.ARRIVAL_TIME.pos})`;
    user.TIME_SER_ENDS.f = `=${user.TIME_SER_BEG.pos}+TIME(0,${user.SERVICE_TIME.pos},0)`;
    user.CUST_STATE.f = `=MINUTE(${user.TIME_SER_BEG.pos}-${user.ARRIVAL_TIME.pos})`;
    user.SYSTEM_STATE.f = `=MINUTE(MAX(0,${user.ARRIVAL_TIME.pos}-${lastUser.TIME_SER_ENDS.pos}))`;
    users[i] = user;
    lastUser = user;
  }
  return users;
}

import createLookupUtilities from "./auxillaryTablesUtils";
import { UserRow } from "./simulateV1";
import { CellType } from "./types";

export default function setLookupV1(
  table: UserRow[],
  arrivals: CellType[][],
  services: CellType[][]
) {
  const arrivalLookupUtils = createLookupUtilities(arrivals);
  const serviceLookupUtils = createLookupUtilities(services);
  for (let i = 0; i < table.length; i++) {
    const user = table[i];
    user.INTERARRIVAL_TIME.f = arrivalLookupUtils.getLookupFormula(
      user.CLIENT_ID,
      0,
      0,
      1
    );
    user.ISSUE_CODE.f = arrivalLookupUtils.getLookupFormula(
      user.CLIENT_ID,
      0,
      0,
      2
    );
    user.ISSUE.f = serviceLookupUtils.getLookupFormula(
      user.ISSUE_CODE,
      0,
      0,
      1
    );
    user.SERVICE_TIME.f = serviceLookupUtils.getLookupFormula(
      user.ISSUE_CODE,
      0,
      0,
      2
    );
    table[i] = user;
  }
  return table;
}

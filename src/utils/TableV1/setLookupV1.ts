import TableUtilities from "../TableUtilities ";
import { CellType } from "../types";
import { UserRow } from "./simulateV1";

export default function setLookupV1(
  table: UserRow[],
  arrivals: CellType[][],
  services: CellType[][]
) {
  const arrivalLookupUtils = new TableUtilities(arrivals);
  const serviceLookupUtils = new TableUtilities(services);
  for (let i = 0; i < table.length; i++) {
    const user = table[i];
    const lookupColStart = 0;
    const lookupColEnd = 0;
    const interArrivalLookup = arrivalLookupUtils.getLookup(
      user.CLIENT_ID,
      lookupColStart,
      lookupColEnd,
      1
    );
    user.INTERARRIVAL_TIME.v = interArrivalLookup.value;
    user.INTERARRIVAL_TIME.f = interArrivalLookup.formula;

    const issueCodeLookup = arrivalLookupUtils.getLookup(
      user.CLIENT_ID,
      lookupColStart,
      lookupColEnd,
      2
    );
    user.ISSUE_CODE.v = issueCodeLookup.value;
    user.ISSUE_CODE.f = issueCodeLookup.formula;

    const issueLookup = serviceLookupUtils.getLookup(
      user.ISSUE_CODE,
      lookupColStart,
      lookupColEnd,
      1
    );
    user.ISSUE.v = issueLookup.value;
    user.ISSUE.f = issueLookup.formula;

    const serviceTimeLookup = serviceLookupUtils.getLookup(
      user.ISSUE_CODE,
      lookupColStart,
      lookupColEnd,
      2
    );
    user.SERVICE_TIME.v = serviceTimeLookup.value;
    user.SERVICE_TIME.f = serviceTimeLookup.formula;

    table[i] = user;
  }
  return table;
}

import TableUtilities from "../TableUtilities ";
import { UserRow } from "./simulateV2";
import updateProbabilityTable from "./updateProbabilityTable";

type AuxTable = ReturnType<typeof updateProbabilityTable>;

export function fillProbabilities(
  comServices: AuxTable,
  comArrivals: AuxTable,
  parsedUsers: UserRow[]
) {
  const arrivalLookupUtils = new TableUtilities(comArrivals);
  const serviceLookupUtils = new TableUtilities(comServices);
  for (let i = 0; i < parsedUsers.length; i++) {
    const randomArrivalLookup = arrivalLookupUtils.getRandBetween(3, 4);

    parsedUsers[i].RandArrival.f = randomArrivalLookup.formula;
    parsedUsers[i].RandArrival.v = randomArrivalLookup.value;

    const interArrivalLookup = arrivalLookupUtils.getLookup(
      parsedUsers[i].RandArrival,
      3,
      4,
      0
    );
    parsedUsers[i].INTERARRIVAL_TIME.f = interArrivalLookup.formula;
    parsedUsers[i].INTERARRIVAL_TIME.v = interArrivalLookup.value;

    const randomServiceLookup = serviceLookupUtils.getRandBetween(3, 4);
    parsedUsers[i].RandService.f = randomServiceLookup.formula;
    parsedUsers[i].RandService.v = randomServiceLookup.value;

    const serviceLookup = serviceLookupUtils.getLookup(
      parsedUsers[i].RandService,
      3,
      4,
      0
    );
    parsedUsers[i].SERVICE_TIME.f = serviceLookup.formula;
    parsedUsers[i].SERVICE_TIME.v = serviceLookup.value;
  }
  return parsedUsers;
}

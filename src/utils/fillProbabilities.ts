import createLookupUtilities, {
  getRandBetweenFormula,
  getRandBetweenValue,
} from "./auxillaryTablesUtils";
import comulateProp from "./comulateProp";
import { UserRow } from "./simulateV2";

type AuxTable = ReturnType<typeof comulateProp>;

export function fillProbabilities(
  comServices: AuxTable,
  comArrivals: AuxTable,
  parsedUsers: UserRow[]
) {
  for (let i = 0; i < parsedUsers.length; i++) {
    const arrivalLookupUtils = createLookupUtilities(comArrivals);
    const serviceLookupUtils = createLookupUtilities(comServices);

    parsedUsers[i].RandArrival.f = getRandBetweenFormula(comArrivals, 3, 4);
    parsedUsers[i].RandArrival.v = getRandBetweenValue(comArrivals, 3, 4);

    parsedUsers[i].INTERARRIVAL_TIME.f = arrivalLookupUtils.getLookupFormula(
      parsedUsers[i].RandArrival,
      3,
      4,
      0
    );
    parsedUsers[i].INTERARRIVAL_TIME.v = arrivalLookupUtils.getLookupValue(
      parsedUsers[i].RandArrival,
      3,
      4
    ).v;

    parsedUsers[i].RandService.f = getRandBetweenFormula(comServices, 3, 4);
    parsedUsers[i].RandService.v = getRandBetweenValue(comServices, 3, 4);

    parsedUsers[i].SERVICE_TIME.f = serviceLookupUtils.getLookupFormula(
      parsedUsers[i].RandService,
      3,
      4,
      0
    );
    parsedUsers[i].SERVICE_TIME.v = serviceLookupUtils.getLookupValue(
      parsedUsers[i].RandService,
      3,
      4
    ).v;
  }
  return parsedUsers;
}

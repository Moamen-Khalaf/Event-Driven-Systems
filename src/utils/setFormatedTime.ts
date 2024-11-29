import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { UserRow } from "./simulateV1";
import { CellType } from "./types";
dayjs.extend(customParseFormat);

export default function setFormatedTime(users: UserRow[], startTime: CellType) {
  // conver times into `hh:mm:ss a` format
  const timeFormat = "hh:mm:ss a";
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    user.ARRIVAL_TIME.v = dayjs(startTime.v, timeFormat)
      .add(+user.ARRIVAL_TIME.v, "minutes")
      .format(timeFormat);
    user.TIME_SER_BEG.v = dayjs(startTime.v, timeFormat)
      .add(+user.TIME_SER_BEG.v, "minutes")
      .format(timeFormat);
    user.TIME_SER_ENDS.v = dayjs(startTime.v, timeFormat)
      .add(+user.TIME_SER_ENDS.v, "minutes")
      .format(timeFormat);
    users[i] = user;
  }
  return users;
}

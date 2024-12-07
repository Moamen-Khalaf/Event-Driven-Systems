import { UserRow } from "./TableV1/simulateV1";

export default function getChartData(simulatedTable: UserRow[]) {
  const start = +simulatedTable[0].ARRIVAL_TIME.v;
  const end = +simulatedTable[simulatedTable.length - 1].TIME_SER_ENDS.v;
  const chartData: {
    Clock: string;
    Customers: number;
  }[] = Array.from({ length: end + 1 }, (_, i) => {
    return {
      Clock: i.toString(),
      Customers: 0,
    };
  });

  simulatedTable.forEach((user) => {
    const arrival = +user.ARRIVAL_TIME.v;
    const end = +user.TIME_SER_ENDS.v;
    for (let i = arrival; i <= end; i++) {
      chartData[i].Customers++;
    }
  });

  const combinedData: {
    Clock: string;
    Customers: number;
  }[] = [];

  let currentIntervalStart = 0;
  let currentCustomers = chartData[0].Customers;

  for (let i = 1; i <= end; i++) {
    if (chartData[i].Customers !== currentCustomers) {
      combinedData.push({
        Clock: `${currentIntervalStart}-${i - 1}`,
        Customers: currentCustomers,
      });
      currentIntervalStart = i;
      currentCustomers = chartData[i].Customers;
    }
  }

  // Add the last interval
  combinedData.push({
    Clock: `${currentIntervalStart}-${end}`,
    Customers: currentCustomers,
  });

  return combinedData;
}

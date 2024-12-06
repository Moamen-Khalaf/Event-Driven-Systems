import { useSimulationConfig } from "@/store/simulationConfig";
import { parceTable } from "./parceTable";
import { useTable } from "@/store/table";

export async function simulate() {
  const parcedTable = parceTable(useTable.getState().table);
  const tableType = useSimulationConfig.getState().simulationType;
  const version = tableType === "normal" ? "v1" : "v2";
  const data = await fetch(`/api/simulate/${version}`, {
    method: "POST",
    body: JSON.stringify(parcedTable),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.ok) {
    throw `Error in simulation ${data.status}`;
  }
  const result = await data.json();
  return result;
}

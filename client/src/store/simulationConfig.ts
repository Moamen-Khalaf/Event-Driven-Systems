import { readRawExcelFile } from "@/utils/readRawExcelFile";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useTable } from "./table";
import { devtools } from "zustand/middleware";

type SimulationType = "normal" | "probability";
interface SimulationConfig {
  simulationType: SimulationType | null;
  numberOfClients: number;
  file: File | null;
  notification: {
    type: "error" | "success" | null;
    message: string;
  };
  loading: boolean;
  setFile: (file: File | null) => void;
  setSimulationType: (type: "normal" | "probability") => void;
  setNumberOfClients: (clients: number) => void;
  save: () => Promise<void>;
}

export const useSimulationConfig = create<SimulationConfig>()(
  devtools(
    immer((set, get) => ({
      simulationType: null,
      numberOfClients: 0,
      file: null,
      notification: {
        type: null,
        message: "",
      },
      loading: false,
      setFile: (file) =>
        set((state) => {
          state.file = file;
        }),
      setSimulationType: (type) =>
        set((state) => {
          state.simulationType = type;
        }),
      setNumberOfClients: (clients) =>
        set((state) => {
          state.numberOfClients = clients;
        }),
      save: async () => {
        try {
          set((state) => {
            state.loading = true;
            state.notification = {
              type: null,
              message: "",
            };
          });
          if (get().file === null) throw "no file selected";
          if (get().simulationType === null)
            throw "no simulation type selected";
          if (get().numberOfClients === 0)
            throw "no number of clients selected";
          const file = await get().file?.arrayBuffer();
          const table = readRawExcelFile(file!);
          useTable.getState().clearTable();
          useTable.getState().setTable(table);
          set((state) => {
            state.notification = {
              type: "success",
              message: "data saved successfully",
            };
          });
        } catch (error) {
          console.log(error);
          set((state) => {
            state.notification = {
              type: "error",
              message: error as string,
            };
          });
        }
        set((state) => {
          state.loading = false;
        });
      },
    })),
    {
      name: "simulationConfig",
    }
  )
);

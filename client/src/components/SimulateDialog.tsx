import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";

import { LoaderCircle, Sheet } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useRef } from "react";
import { readRawExcelFile } from "@/utils/readRawExcelFile";
import { useTable } from "@/store/table";
type SimulationType = "normal" | "probability";
interface SimulationConfig {
  simulationType: SimulationType | null;
  numberOfClients: number;
  file: File | null;
  error: string | null;
  loading: boolean;
  setFile: (file: File | null) => void;
  setSimulationType: (type: "normal" | "probability") => void;
  setNumberOfClients: (clients: number) => void;
  save: () => Promise<void>;
}

const useSimulationConfig = create<SimulationConfig>()(
  immer((set, get) => ({
    simulationType: null,
    numberOfClients: 5,
    file: null,
    error: null,
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
          state.error = null;
        });
        if (get().file === null) throw "no file selected";
        if (get().simulationType === null) throw "no simulation type selected";
        const file = await get().file?.arrayBuffer();
        const table = readRawExcelFile(file!);
        useTable.getState().setTable(table);
        console.log(table);
      } catch (error) {
        set((state) => {
          state.error = error as string;
        });
      }
      set((state) => {
        state.loading = false;
      });
    },
  }))
);

function SimulationType() {
  const setSimulationType = useSimulationConfig(
    (state) => state.setSimulationType
  );
  return (
    <Select
      onValueChange={(value) => setSimulationType(value as SimulationType)}
    >
      <SelectTrigger className="grow">
        <SelectValue placeholder="choose simulation version" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="normal">normal simulation</SelectItem>
          <SelectItem value="probability">
            probability based simulation
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SimulateDialog() {
  const setNumberOfClients = useSimulationConfig(
    (state) => state.setNumberOfClients
  );
  const setFile = useSimulationConfig((state) => state.setFile);
  const file = useRef<HTMLInputElement>(null);
  const error = useSimulationConfig((state) => state.error);
  const loading = useSimulationConfig((state) => state.loading);
  const save = useSimulationConfig((state) => state.save);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Label className="flex justify-between items-center grow p-2 hover:bg-primary/10 select-none">
          <Sheet />
          <span className="ml-4">Simulate</span>
        </Label>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Simulation Config</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <SimulationType />
          <Input
            type="number"
            placeholder="Number of Clients"
            defaultValue={5}
            onChange={(e) => setNumberOfClients(+e.target.value)}
            max={30}
            min={5}
          />
          <Input
            type="file"
            accept=".xlsx"
            ref={file}
            onChange={(e) => {
              if (e.target.files) setFile(e.target.files[0]);
            }}
          />
          {error && <p className="text-red-500">{String(error)}</p>}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              save();
            }}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin self-end" />
            ) : (
              "Save changes"
            )}
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              file.current!.value = "";
              file.current!.files = null;
              setFile(null);
            }}
          >
            Clear
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

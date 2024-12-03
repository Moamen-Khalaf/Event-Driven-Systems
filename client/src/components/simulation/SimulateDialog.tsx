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
import { useEffect, useRef } from "react";
import { useSimulationConfig } from "@/store/simulationConfig";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

function SimulationType() {
  const setSimulationType = useSimulationConfig(
    (state) => state.setSimulationType
  );
  const { toast } = useToast();
  const notification = useSimulationConfig((state) => state.notification);
  useEffect(() => {
    if (notification.type === "error") {
      toast({
        title: "Simulation Error",
        variant: "destructive",
        description: notification.message,
      });
    } else if (notification.type === "success") {
      toast({
        title: "Data Saved Successfully",
        description: notification.message,
      });
    }
  }, [notification, toast]);
  return (
    <Select
      onValueChange={(value) =>
        setSimulationType(value as "normal" | "probability")
      }
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
            onChange={(e) => {
              const value = +e.target.value;
              if (value < 5 || value > 30) {
                return false;
              }
              setNumberOfClients(value);
            }}
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

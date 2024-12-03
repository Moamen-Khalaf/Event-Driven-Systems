import { ToolTip } from "@/components/ToolTip";
import { useToast } from "@/hooks/use-toast";
import { useTable } from "@/store/table";
import { LoaderCircle, ScanLine } from "lucide-react";
import { useEffect } from "react";

export default function SimulateButton() {
  const error = useTable((state) => state.notification);
  const loading = useTable((state) => state.loading);
  const simulate = useTable((state) => state.simulate);
  const { toast } = useToast();
  useEffect(() => {
    if (error.type === "error") {
      toast({
        title: "Simulation Error",
        variant: "destructive",
        description: error.message,
      });
    } else if (error.type === "success") {
      toast({
        title: "Simulation Completed",
        description: error.message,
      });
    }
  }, [error, toast]);
  if (loading) {
    return (
      <LoaderCircle className="animate-spin w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer hover:animate-pulse" />
    );
  }
  return (
    <ToolTip message="Simulate">
      <ScanLine
        className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer hover:animate-pulse"
        onClick={() => {
          toast({
            title: "Simulation Started",
            description: "The simulation has been successfully started.",
          });
          simulate();
        }}
      />
    </ToolTip>
  );
}

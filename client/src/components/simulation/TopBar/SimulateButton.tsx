import { ToolTip } from "@/components/ToolTip";
import { useToast } from "@/hooks/use-toast";
import { useTable } from "@/store/table";
import { ToastAction } from "@radix-ui/react-toast";
import { ScanLine } from "lucide-react";
import { useEffect } from "react";

export default function SimulateButton() {
  const error = useTable((state) => state.error);
  const simulate = useTable((state) => state.simulate);
  const { toast } = useToast();
  useEffect(() => {
    if (error) {
      toast({
        title: "Simulation Error",
        variant: "destructive",
        description: error,
        action: <ToastAction altText="Dismiss">OK</ToastAction>,
      });
    }
  }, [error, toast]);
  return (
    <ToolTip message="Simulate">
      <ScanLine
        className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer hover:animate-pulse"
        onClick={() => {
          toast({
            title: "Simulation Started",
            description: "The simulation has been successfully started.",
            action: <ToastAction altText="Dismiss">OK</ToastAction>,
          });
          simulate();
        }}
      />
    </ToolTip>
  );
}

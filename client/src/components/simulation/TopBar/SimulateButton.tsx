import { useToast } from "@/hooks/use-toast";
import { useTable } from "@/store/table";
import { ToastAction } from "@radix-ui/react-toast";
import { ScanLine } from "lucide-react";
import { useEffect } from "react";

export default function SimulateButton() {
  const { toast } = useToast();
  const simulate = useTable((state) => state.simulate);
  const error = useTable((state) => state.error);
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
  );
}

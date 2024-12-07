import { ChartLine } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Chart } from "./Chart";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ChartLine className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full md:w-[50%] md:h-1/2 mx-auto my-2">
          <Chart />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
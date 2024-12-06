import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Paperclip } from "lucide-react";
import { SimulateDialog } from "./simulation/SimulateDialog";

export function UploadMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Paperclip />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuGroup>
          <SimulateDialog />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

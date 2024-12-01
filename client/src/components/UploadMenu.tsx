import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Paperclip, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { SimulateDialog } from "./SimulateDialog";

export function UploadMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Paperclip />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuGroup>
          <SimulateDialog />
          <DropdownMenuItem>
            <Label
              htmlFor="file"
              className="flex justify-between items-center grow"
            >
              <Upload />
              <span className="ml-4">Upload</span>
            </Label>
            <Input
              id="file"
              type="file"
              className="scale-0 w-0 h-0 m-0 p-0"
              accept=".txt"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

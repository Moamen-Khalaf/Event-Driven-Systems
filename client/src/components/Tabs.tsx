import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useTabs, type ChatTab } from "@/store/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";

function ChatTab({ item }: { item: ChatTab }) {
  const removeTab = useTabs((state) => state.removeTab);
  const renameTab = useTabs((state) => state.renameTab);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>{item.name}</SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction>
            <MoreHorizontal />
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          align="start"
          className="bg-card/50 py-2 *:cursor-pointer rounded-md shadow-md text-center"
        >
          <DropdownMenuItem
            className="hover:text-secondary-foreground/75 px-3 py-1"
            onClick={() => removeTab(item)}
          >
            Delete
          </DropdownMenuItem>
          <SidebarSeparator className="bg-foreground" />
          <DropdownMenuItem
            className="hover:text-secondary-foreground/75 px-4 py-2"
            onClick={() => renameTab(item)}
          >
            Rename
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}

export default function Tabs() {
  const tabs = useTabs((state) => state.tabs);
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Tabs
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <ScrollArea className="overflow-auto">
                  {tabs.map((tab) => (
                    <ChatTab item={tab} key={tab.id} />
                  ))}
                </ScrollArea>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

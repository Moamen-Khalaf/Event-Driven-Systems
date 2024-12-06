import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import SideBarHead from "./SideBarHead";
import AddNewChat from "./AddNewChat";
import Tabs from "./Tabs";
import { memo } from "react";

function AppSidebar() {
  return (
    <Sidebar>
      <SideBarHead />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <AddNewChat />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Tabs />
      </SidebarContent>
    </Sidebar>
  );
}
export default memo(AppSidebar);

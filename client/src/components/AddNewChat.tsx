import { MessageCircle } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useTabs } from "@/store/tabs";

export default function AddNewChat() {
  const addTab = useTabs((state) => state.addTab);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={() => addTab()}>
        <MessageCircle />
        Add Item
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

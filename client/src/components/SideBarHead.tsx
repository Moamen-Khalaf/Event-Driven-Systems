import { Moon, Sun } from "lucide-react";
import { SidebarHeader, SidebarMenu, SidebarMenuItem } from "./ui/sidebar";
import { useSetting } from "@/store/setting";
import Setting from "./Setting";
function ThemeButton() {
  const theme = useSetting((state) => state.theme);
  const toggleTheme = useSetting((state) => state.toggleTheme);
  return (
    <SidebarMenuItem
      className="p-2 rounded-md hover:text-sidebar-foreground/50"
      onClick={() => toggleTheme()}
    >
      {theme === "dark" ? (
        <>
          <Sun />
        </>
      ) : (
        <>
          <Moon />
        </>
      )}
    </SidebarMenuItem>
  );
}

export default function SideBarHead() {
  return (
    <SidebarHeader>
      <SidebarMenu className="flex flex-row items-center justify-between *:cursor-pointer">
        <Setting />
        <ThemeButton />
      </SidebarMenu>
    </SidebarHeader>
  );
}

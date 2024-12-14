import { ToolTip } from "@/components/ToolTip";
import useFullScreen from "@/hooks/useFullScreen";
import { Expand, Shrink } from "lucide-react";

export default function FullScreenButton() {
  const [isFullScreen, setIsFullScreen] = useFullScreen();
  return (
    <ToolTip message="Full Screen">
      {isFullScreen ? (
        <Shrink
          className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer"
          onClick={() => {
            document.exitFullscreen().then(() => setIsFullScreen(false));
          }}
        />
      ) : (
        <Expand
          className="w-14 hover:text-blue-500 hover:dark:text-white cursor-pointer"
          onClick={() => {
            const table = document.getElementById("table");
            if (table) {
              table.requestFullscreen().then(() => setIsFullScreen(true));
            }
          }}
        />
      )}
    </ToolTip>
  );
}

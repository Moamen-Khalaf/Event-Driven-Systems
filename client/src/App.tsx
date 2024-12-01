import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import ChatInput from "./components/ChatInput";
import Layout from "./components/layout/layout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import Table from "./components/simulation/Table";
const table = Array.from({ length: 100 }, () =>
  Array.from({ length: 100 }, () => "")
);
function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="bg-secondary min-h-[100vh]">
      <Layout>
        <ResizablePanelGroup
          direction={isSmallScreen ? "vertical" : "horizontal"}
          className="w-[50vh]"
        >
          <ResizablePanel
            defaultSize={100}
            minSize={50}
            className="flex flex-col gap-2"
          >
            <Chat className="grow mx-2 md:mx-12 h-[50vh] flex gap-4 flex-col px-4 overflow-auto pt-10" />
            <div className="mx-2 md:mx-12 flex place-content-center">
              <ChatInput />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-sidebar-foreground" />
          <ResizablePanel>
            <Table table={table} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </Layout>
    </div>
  );
}

export default App;

/**
 <ResizablePanelGroup
          direction={isSmallScreen ? "vertical" : "horizontal"}
        >
          <ResizablePanel
            defaultSize={100}
            minSize={50}
            className="flex flex-col gap-2 w-full h-full"
          >
            <Chat className="grow mx-2 md:mx-12 h-[50vh] flex gap-4 flex-col px-4 overflow-auto pt-10" />
            <div className="mx-2 md:mx-12 flex place-content-center">
              <ChatInput />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-sidebar-foreground" />
          <ResizablePanel>
            <Table table={table} />
          </ResizablePanel>
        </ResizablePanelGroup>
 */

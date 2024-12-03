import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import ChatInput from "./components/ChatInput";
import Layout from "./components/layout/layout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import Table from "./components/simulation/Table/Table";

function ChatSection() {
  return (
    <ResizablePanel
      defaultSize={100}
      minSize={35}
      className="flex flex-col gap-2"
    >
      <Chat className="grow ml-2 md:ml-12 h-[50vh] flex gap-4 flex-col px-4 overflow-auto pt-10" />
      <div className="mx-2 md:mx-12 flex place-content-center">
        <ChatInput />
      </div>
    </ResizablePanel>
  );
}

function TableSection() {
  return (
    <ResizablePanel collapsedSize={0}>
      <Table />
    </ResizablePanel>
  );
}

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
    <div className="bg-secondary h-[100vh] overflow-hidden">
      <Layout>
        <ResizablePanelGroup
          direction={isSmallScreen ? "vertical" : "horizontal"}
          className="w-[50vh]"
        >
          <ChatSection />
          <ResizableHandle withHandle className="bg-sidebar-foreground" />
          <TableSection />
        </ResizablePanelGroup>
      </Layout>
    </div>
  );
}

export default App;

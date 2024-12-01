import Chat from "./components/Chat";
import ChatInput from "./components/ChatInput";
import Layout from "./components/layout/layout";

function App() {
  return (
    <div className="bg-secondary min-h-[100vh] overflow-hidden">
      <Layout>
        <div className="flex flex-col gap-4 w-full h-full">
          <Chat />
          <div className="mx-2 md:mx-12 flex place-content-center">
            <ChatInput />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default App;

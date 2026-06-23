import ChatSidebar from "./ChatSidebar";
import ChatArea from "./ChatArea";
import MemoryPanel from "./MemoryPanel";

function ChatLayout() {
  return (
    <div className="flex h-screen bg-slate-950">
      <ChatSidebar />
      <ChatArea />
      <MemoryPanel />
    </div>
  );
}

export default ChatLayout;
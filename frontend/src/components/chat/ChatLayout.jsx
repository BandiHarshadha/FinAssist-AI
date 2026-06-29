import ChatSidebar from "./ChatSidebar";
import ChatArea from "./ChatArea";

function ChatLayout() {
  return (
    <div className="flex h-screen bg-slate-950">
      <ChatSidebar />
      <ChatArea />
    </div>
  );
}

export default ChatLayout;
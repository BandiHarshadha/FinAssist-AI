import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import AgentStatus from "./AgentStatus";

function ChatLayout() {
  const [agentInfo, setAgentInfo] = useState({
    agent: "Waiting...",
    intent: "GENERAL",
    tool: "None",
    confidence: "98%",
    privacy: {
      enabled: false,
      risk: "NOT_SCANNED",
      findingsCount: 0,
    },
  });

  return (
    <div className="flex h-screen bg-slate-950">
      <ChatSidebar />
      <ChatWindow setAgentInfo={setAgentInfo} />
      <AgentStatus {...agentInfo} />
    </div>
  );
}

export default ChatLayout;
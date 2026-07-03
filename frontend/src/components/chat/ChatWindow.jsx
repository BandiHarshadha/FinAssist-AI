import VoiceAssistant from "./VoiceAssistant";

function ChatWindow() {
  return (
    <main className="flex-1 min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        FinAssist AI Chat
      </h1>

      <VoiceAssistant />
    </main>
  );
}

export default ChatWindow;
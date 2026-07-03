import Sidebar from "../components/dashboard/Sidebar";
import VoiceAssistant from "../components/chat/VoiceAssistant";

function Chat() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <VoiceAssistant />
      </main>
    </div>
  );
}

export default Chat;
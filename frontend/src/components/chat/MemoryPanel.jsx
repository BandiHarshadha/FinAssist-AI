import { useEffect, useState } from "react";
import { getChatMemory, resetChatMemory } from "../../services/chatService";

function MemoryPanel() {
  const [memory, setMemory] = useState(null);

  const loadMemory = async () => {
    try {
      const res = await getChatMemory();
      setMemory(res.memory);
    } catch (error) {
      console.error("Memory fetch failed:", error);
    }
  };

  const clearMemory = async () => {
    await resetChatMemory();
    loadMemory();
  };

  useEffect(() => {
    loadMemory();
  }, []);

  return (
    <aside className="w-80 border-l border-slate-800 bg-slate-900 p-5 text-white">
      <h2 className="mb-4 text-xl font-bold text-cyan-300">
        🧠 Memory Agent
      </h2>

      {!memory ? (
        <p className="text-slate-400">No memory loaded</p>
      ) : (
        <div className="space-y-3 text-sm">
          <p><b>Name:</b> {memory.name || "Not set"}</p>
          <p><b>Income:</b> ₹{memory.income || 0}</p>
          <p><b>Expenses:</b> ₹{memory.expenses || 0}</p>
          <p><b>EMI:</b> ₹{memory.emi || 0}</p>
          <p><b>Goal:</b> {memory.goal || "Not set"}</p>
          <p><b>Target:</b> ₹{memory.targetAmount || 0}</p>
        </div>
      )}

      <button
        onClick={loadMemory}
        className="mt-5 w-full rounded-lg bg-cyan-600 py-2 font-semibold hover:bg-cyan-700"
      >
        Refresh Memory
      </button>

      <button
        onClick={clearMemory}
        className="mt-3 w-full rounded-lg bg-red-600 py-2 font-semibold hover:bg-red-700"
      >
        Reset Memory
      </button>
    </aside>
  );
}

export default MemoryPanel;
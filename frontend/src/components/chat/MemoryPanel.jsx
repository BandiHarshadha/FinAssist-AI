import { useEffect, useState } from "react";
import { getMemory, clearMemory } from "../../services/memoryService";

function MemoryPanel() {
  const [memory, setMemory] = useState([]);

  const loadMemory = async () => {
    try {
      const data = await getMemory();
      setMemory(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = async () => {
    await clearMemory();
    setMemory([]);
  };

  useEffect(() => {
    loadMemory();
  }, []);

  return (
    <div className="mt-6 rounded-xl bg-slate-800 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white">🧠 Memory</h3>

        <button
          onClick={handleClear}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Clear
        </button>
      </div>

      <button
        onClick={loadMemory}
        className="mt-3 w-full rounded-lg bg-cyan-500 py-2 text-sm font-semibold text-white"
      >
        Refresh Memory
      </button>

      <div className="mt-4 max-h-52 space-y-2 overflow-y-auto">
        {memory.length === 0 ? (
          <p className="text-sm text-slate-400">No memory yet.</p>
        ) : (
          memory.map((item, index) => (
            <div key={index} className="rounded-lg bg-slate-900 p-2 text-sm">
              <p className="text-cyan-300">{item.role}</p>
              <p className="text-slate-300">{item.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MemoryPanel;
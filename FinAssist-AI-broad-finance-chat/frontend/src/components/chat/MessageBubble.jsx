import { Bot, User } from "lucide-react";
import DigitalTwinCard from "./DigitalTwinCard";
import AiCfpCard from "./AiCfpCard";

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
          <Bot size={20} />
        </div>
      )}

      <div
        className={`max-w-[78%] rounded-2xl px-5 py-4 shadow-sm ${
          isUser
            ? "bg-blue-700 text-white"
            : "border border-slate-200 bg-white text-slate-800"
        }`}
      >
        {msg.agent && !isUser && (
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            {msg.agent}
          </p>
        )}

        <p className="leading-relaxed">{msg.text}</p>

        {msg.data?.type === "digital_twin" && <DigitalTwinCard data={msg.data} />}
        {msg.data?.type === "ai_cfp" && <AiCfpCard data={msg.data} />}

        {msg.time && (
          <p className={`mt-2 text-xs ${isUser ? "text-blue-100" : "text-slate-400"}`}>
            {msg.time}
          </p>
        )}
      </div>

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700">
          <User size={20} />
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
function MessageBubble({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-cyan-500 text-white"
            : "bg-slate-800 text-white"
        }`}
      >
        <p className="text-sm mb-2 font-semibold">
          {isUser ? "🧑 You" : "🤖 FinAssist AI"}
        </p>

        <p>{text}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
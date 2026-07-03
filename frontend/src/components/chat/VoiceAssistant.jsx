import { useEffect, useRef, useState } from "react";

function VoiceAssistant() {
  const [messages, setMessages] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const latestTranscriptRef = useRef("");

  useEffect(() => {
    fetch("http://localhost:5001/api/voice/history")
      .then((res) => res.json())
      .then((data) => setMessages(data.history || []))
      .catch(() => {});
  }, []);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const sendToBackend = async (text) => {
    if (!text.trim()) return;

    try {
      const res = await fetch("http://localhost:5001/api/voice/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages(data.history || []);
        speak(data.reply);
      } else {
        speak("Sorry, I could not understand that.");
      }
    } catch {
      speak("Backend is not responding.");
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      latestTranscriptRef.current = text;
    };

    recognition.onend = () => {
      setListening(false);
      if (latestTranscriptRef.current) {
        sendToBackend(latestTranscriptRef.current);
      }
    };

    recognition.onerror = () => {
      setListening(false);
      speak("Voice input failed. Please try again.");
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const handleSend = () => {
    const text = transcript.trim();
    if (!text) return;

    latestTranscriptRef.current = text;
    sendToBackend(text);
    setTranscript("");
  };

  const clearChat = async () => {
    await fetch("http://localhost:5001/api/voice/history", {
      method: "DELETE",
    });

    setMessages([]);
    setTranscript("");
    latestTranscriptRef.current = "";
    window.speechSynthesis.cancel();
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 rounded-2xl p-5 shadow-xl border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">FinAssist AI</h2>
          <p className="text-sm text-slate-400">
            Your intelligent money companion for smarter financial decisions.
          </p>
        </div>

        <button
          onClick={clearChat}
          className="bg-slate-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm border border-slate-700"
        >
          Clear Chat
        </button>
      </div>

      <div className="h-[480px] overflow-y-auto bg-slate-950 rounded-xl p-4 space-y-4 mb-4 border border-slate-800">
        {messages.length === 0 ? (
          <p className="text-slate-500 text-center mt-40">
            Start a conversation about your money, goals, loans, or investments.
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl max-w-[90%] border ${
                msg.role === "user"
                  ? "bg-blue-600/20 border-blue-500/40 text-white ml-auto"
                  : "bg-slate-900 border-slate-700 text-white mr-auto"
              }`}
            >
              {msg.agent && msg.role !== "user" && (
                <p className="text-xs text-cyan-400 mb-2 font-semibold uppercase tracking-wide">
                  {msg.agent}
                </p>
              )}

              <p className="text-sm leading-relaxed text-slate-100">
                {msg.text || msg.content}
              </p>

              {msg.data?.type === "digital_twin" && (
                <div className="mt-4 rounded-xl border border-indigo-500/40 bg-slate-950 overflow-hidden">
                  <div className="bg-indigo-600/20 px-4 py-3 border-b border-indigo-500/30">
                    <h3 className="text-lg font-bold text-indigo-200">
                      Virtual Financial Digital Twin
                    </h3>
                    <p className="text-sm text-slate-300 mt-1">
                      {msg.data.message}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-0 text-sm">
                    <div className="p-4 border-b border-r border-slate-800">
                      <p className="text-slate-400">Monthly Income</p>
                      <p className="text-xl font-bold">₹{msg.data.income}</p>
                    </div>
                    <div className="p-4 border-b border-r border-slate-800">
                      <p className="text-slate-400">Expenses</p>
                      <p className="text-xl font-bold">₹{msg.data.expenses}</p>
                    </div>
                    <div className="p-4 border-b border-slate-800">
                      <p className="text-slate-400">EMI Load</p>
                      <p className="text-xl font-bold">{msg.data.emiLoad}%</p>
                    </div>
                    <div className="p-4 border-r border-slate-800">
                      <p className="text-slate-400">Monthly Savings</p>
                      <p className="text-xl font-bold text-emerald-300">
                        ₹{msg.data.savings}
                      </p>
                    </div>
                    <div className="p-4 border-r border-slate-800">
                      <p className="text-slate-400">Health Score</p>
                      <p className="text-xl font-bold">
                        {msg.data.healthScore}/100
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="text-slate-400">Risk Level</p>
                      <p className="text-xl font-bold">{msg.data.risk}</p>
                    </div>
                  </div>
                </div>
              )}

              {msg.data?.type === "ai_cfp" && (
                <div className="mt-4 rounded-xl border border-emerald-500/40 bg-slate-950 overflow-hidden">
                  <div className="bg-emerald-600/20 px-4 py-3 border-b border-emerald-500/30">
                    <h3 className="text-lg font-bold text-emerald-200">
                      AI CFP Financial Planning Report
                    </h3>
                    <p className="text-sm text-slate-300 mt-1">
                      {msg.data.verdict}
                    </p>
                  </div>

                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-slate-800">
                        <td className="p-3 text-slate-400">Income</td>
                        <td className="p-3 font-semibold">
                          ₹{msg.data.income}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="p-3 text-slate-400">Expenses</td>
                        <td className="p-3 font-semibold">
                          ₹{msg.data.expenses}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="p-3 text-slate-400">EMI</td>
                        <td className="p-3 font-semibold">₹{msg.data.emi}</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="p-3 text-slate-400">
                          Monthly Savings
                        </td>
                        <td className="p-3 font-semibold text-emerald-300">
                          ₹{msg.data.savings}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-slate-400">Savings Rate</td>
                        <td className="p-3 font-semibold">
                          {msg.data.savingsRate}%
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="p-4 border-t border-slate-800">
                    <p className="text-sm font-semibold text-slate-300 mb-2">
                      Recommended Actions
                    </p>

                    <div className="space-y-2">
                      {msg.data.plan?.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-slate-200"
                        >
                          {i + 1}. {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {msg.time && (
                <p className="text-[10px] text-slate-500 mt-2">{msg.time}</p>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Speak or type here..."
          className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg outline-none border border-slate-700"
        />

        <button
          onClick={handleSend}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg"
        >
          Send
        </button>

        {!listening ? (
          <button
            onClick={startListening}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            Start Mic
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-3 rounded-lg"
          >
            Stop Mic
          </button>
        )}
      </div>
    </div>
  );
}

export default VoiceAssistant;
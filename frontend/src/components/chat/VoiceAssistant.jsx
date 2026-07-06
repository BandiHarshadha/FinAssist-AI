import { useEffect, useRef, useState } from "react";
import { Send, Mic, Square, Trash2, Bot } from "lucide-react";
import MessageBubble from "./MessageBubble";

function VoiceAssistant() {
  const [messages, setMessages] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const latestTranscriptRef = useRef("");

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const sendToBackend = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
        time: new Date().toLocaleTimeString(),
      },
    ]);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/privacy-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (data.requiresPrivacyDecision) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "",
            agent: "UPLAI Privacy Layer",
            data: {
              type: "privacy_decision",
              privacyId: data.privacyId,
              findings: data.findings,
              redactedPreview: data.redactedPreview,
              options: data.options,
            },
            time: new Date().toLocaleTimeString(),
          },
        ]);

        speak("Sensitive data detected. Please choose Redact and Continue or Send Original.");
        return;
      }

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.reply,
            agent: data.agent || "FinAssist AI",
            data: data.data || null,
            privacy: data.privacy || null,
            time: new Date().toLocaleTimeString(),
          },
        ]);

        speak(data.reply);
      } else {
        speak("Sorry, I could not understand that.");
      }
    } catch (error) {
      console.error("Backend Error:", error);
      speak("Backend is not responding.");
    }
  };

  const continuePrivacyChat = async (privacyId, decision) => {
    const protectionMessageId = `protecting_${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      {
        id: protectionMessageId,
        role: "assistant",
        text: "",
        agent: "UPLAI Privacy Protection",
        data: {
          type: "privacy_processing",
          decision,
        },
        time: new Date().toLocaleTimeString(),
      },
    ]);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/privacy-chat/continue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ privacyId, decision }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev.filter((msg) => msg.id !== protectionMessageId),
          {
            role: "assistant",
            text: data.reply,
            agent: data.agent || "FinAssist AI",
            data: data.data || null,
            privacy: data.privacy || null,
            time: new Date().toLocaleTimeString(),
          },
        ]);

        speak(data.reply);
      } else {
        speak(data.message || "Privacy decision failed.");
      }
    } catch (error) {
      console.error("Privacy continue error:", error);
      speak("Privacy layer is not responding.");
    }
  };

  useEffect(() => {
    const handler = (event) => {
      const { privacyId, decision } = event.detail;
      continuePrivacyChat(privacyId, decision);
    };

    window.addEventListener("privacy-decision", handler);

    return () => {
      window.removeEventListener("privacy-decision", handler);
    };
  }, []);

  const handleSend = () => {
    const text = transcript.trim();
    if (!text) return;

    sendToBackend(text);
    setTranscript("");
    latestTranscriptRef.current = "";
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
        latestTranscriptRef.current = "";
        setTranscript("");
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

  const clearChat = () => {
    setMessages([]);
    setTranscript("");
    latestTranscriptRef.current = "";
    window.speechSynthesis.cancel();
  };

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            AI Banking Assistant
          </p>

          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
            FinAssist AI Chat
          </h1>

          <p className="mt-1 text-slate-500">
            Ask about savings, loans, investments, insurance, cards or financial planning.
          </p>
        </div>

        <button
          onClick={clearChat}
          className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
        >
          <Trash2 size={18} />
          Clear Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50 px-8 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-xl text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Bot size={32} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Start your financial conversation
              </h2>

              <p className="mt-3 text-slate-500">
                Try asking: “Show my financial digital twin” or “Create my AI CFP report.”
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((msg, index) => (
              <MessageBubble key={msg.id || index} msg={msg} />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 bg-white px-8 py-5">
        <div className="flex gap-3">
          <input
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask your financial question..."
            className="flex-1 rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none focus:border-blue-600"
          />

          <button
            onClick={handleSend}
            className="rounded-2xl bg-blue-700 px-6 py-4 font-bold text-white hover:bg-blue-800"
          >
            <Send size={22} />
          </button>

          {!listening ? (
            <button
              onClick={startListening}
              className="rounded-2xl bg-emerald-600 px-6 py-4 font-bold text-white hover:bg-emerald-700"
            >
              <Mic size={22} />
            </button>
          ) : (
            <button
              onClick={stopListening}
              className="rounded-2xl bg-amber-500 px-6 py-4 font-bold text-white hover:bg-amber-600"
            >
              <Square size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VoiceAssistant;
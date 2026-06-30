import { useRef, useState } from "react";
import DigitalTwinCard from "./DigitalTwinCard";
import AiCfpCard from "./AiCfpCard";

function VoiceAssistant() {
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [digitalTwin, setDigitalTwin] = useState(null);
  const [aiCfpData, setAiCfpData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const latestTranscriptRef = useRef("");

  const speakText = (text) => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;

    window.speechSynthesis.speak(utterance);
  };

  const sendToBackend = async (textToSend) => {
    const cleanText = String(textToSend || "").trim();

    if (!cleanText) {
      alert("I did not catch your voice. Please try again.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        agent: "You",
        text: cleanText,
      },
    ]);

    setTranscript("");
    latestTranscriptRef.current = "";

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5001/api/voice/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: cleanText,
        }),
      });

      const data = await response.json();

      if (data.agent === "Financial Digital Twin Agent" && data.data) {
        setDigitalTwin(data.data);
      }

      if (
        (data.agent === "AI CFP Agent" ||
          data.agent === "Financial Planning Review") &&
        data.data
      ) {
        setAiCfpData(data.data);
      }

      const assistantText = data.reply || data.message || "No reply received.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          agent: data.agent || "FinAssist",
          text: assistantText,
          data: data.data || null,
        },
      ]);

      speakText(assistantText);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          agent: "System",
          text: "Backend connection failed. Please check backend server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use Google Chrome. Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;

    latestTranscriptRef.current = "";
    setTranscript("");

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      let spokenText = "";

      for (let i = 0; i < event.results.length; i++) {
        spokenText += event.results[i][0].transcript + " ";
      }

      spokenText = spokenText.trim();

      latestTranscriptRef.current = spokenText;
      setTranscript(spokenText);
    };

    recognition.onerror = (event) => {
      setListening(false);
      alert("Mic error: " + event.error);
    };

    recognition.onend = () => {
      setListening(false);

      const finalText = latestTranscriptRef.current.trim();

      if (finalText) {
        sendToBackend(finalText);
      } else {
        alert("I did not catch your voice. Please speak louder.");
      }
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const sendTypedMessage = () => {
    sendToBackend(transcript);
  };

  const clearChat = () => {
    setMessages([]);
    setTranscript("");
    setDigitalTwin(null);
    setAiCfpData(null);
    latestTranscriptRef.current = "";
    window.speechSynthesis.cancel();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">FinAssist Voice Assistant</h2>
          <p className="text-sm text-slate-400">
            Ask about savings, goals, loans, investments, digital twin, or financial planning.
          </p>
        </div>

        <button
          onClick={clearChat}
          className="px-3 py-2 bg-slate-800 rounded-lg"
        >
          Clear
        </button>
      </div>

      <div className="min-h-[280px] max-h-[420px] overflow-y-auto bg-slate-950 border border-slate-800 rounded-xl p-4 mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-slate-500 space-y-2">
            <p>Chat history appears here.</p>
            <p>Try: My income is 75000 and expenses are 25000</p>
            <p>Try: My EMI is 15000</p>
            <p>Try: Show my financial digital twin</p>
            <p>Try: Run financial review</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl ${
                message.role === "user"
                  ? "bg-blue-600 ml-10"
                  : "bg-slate-800 mr-10"
              }`}
            >
              <p className="text-xs text-slate-300 mb-1">{message.agent}</p>
              <p className="whitespace-pre-line">{message.text}</p>

              {(message.agent === "AI CFP Agent" ||
                message.agent === "Financial Planning Review") &&
                message.data && <AiCfpCard data={message.data} />}
            </div>
          ))
        )}

        {loading && (
          <div className="bg-slate-800 mr-10 p-3 rounded-xl">
            <p className="text-xs text-slate-300 mb-1">FinAssist</p>
            <p>Thinking...</p>
          </div>
        )}
      </div>

      <DigitalTwinCard data={digitalTwin} />
      <AiCfpCard data={aiCfpData} />

      <textarea
        className="w-full min-h-[90px] bg-slate-950 border border-slate-700 rounded-xl p-4 text-white outline-none mt-4"
        placeholder="Speak or type here..."
        value={transcript}
        onChange={(e) => {
          setTranscript(e.target.value);
          latestTranscriptRef.current = e.target.value;
        }}
      />

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={startListening}
          disabled={listening || loading}
          className="px-4 py-2 rounded-lg bg-purple-600 disabled:opacity-60"
        >
          {listening ? "Listening..." : "Start Mic"}
        </button>

        <button
          onClick={stopListening}
          className="px-4 py-2 rounded-lg bg-red-600"
        >
          Stop Mic
        </button>

        <button
          onClick={sendTypedMessage}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-600 disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>

      {listening && (
        <p className="mt-3 text-purple-300">Listening now. Speak clearly.</p>
      )}
    </div>
  );
}

export default VoiceAssistant;
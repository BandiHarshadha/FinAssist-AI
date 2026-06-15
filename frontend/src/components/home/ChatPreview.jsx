import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";

function ChatPreview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center text-5xl font-bold text-white"
        >
          Experience FinAssist AI
        </motion.h2>

        <p className="mb-16 text-center text-slate-400">
          A preview of how your AI banking assistant responds.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl"
        >

          {/* User Message */}
          <div className="mb-6 flex items-start gap-4">
            <div className="rounded-full bg-cyan-500 p-3">
              <User className="text-white" size={20} />
            </div>

            <div className="rounded-2xl bg-slate-800 px-5 py-4 text-slate-200">
              How can I improve my credit score?
            </div>
          </div>

          {/* AI Message */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-600 p-3">
              <Bot className="text-white" size={20} />
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-5 py-4 text-slate-200">
              Improving your credit score involves paying bills on time,
              maintaining low credit utilization, avoiding unnecessary credit
              inquiries, monitoring your credit report regularly, and keeping
              older accounts active.
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default ChatPreview;
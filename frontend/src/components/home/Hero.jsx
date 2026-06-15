import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl text-center"
      >
        <p className="font-semibold uppercase tracking-[8px] text-cyan-400">
          AI Powered Banking
        </p>

        <h1 className="mt-6 text-7xl font-black text-white">
          FinAssist AI
        </h1>

        <p className="mt-8 text-2xl text-slate-300">
          Smarter Banking Starts Here
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          Manage savings, investments, loans, credit cards,
          insurance and financial planning through one
          intelligent AI assistant.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-10 rounded-xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-cyan-600"
        >
          Get Started
        </button>
      </motion.div>
    </section>
  );
}

export default Hero;
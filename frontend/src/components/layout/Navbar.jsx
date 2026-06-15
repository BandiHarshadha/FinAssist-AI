import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-bold text-cyan-400"
        >
          FinAssist AI
        </h1>

        <div className="hidden md:flex items-center gap-8 text-slate-300">

          <button onClick={() => navigate("/")} className="hover:text-cyan-400">
            Home
          </button>

          <button className="hover:text-cyan-400">
            Features
          </button>

          <button className="hover:text-cyan-400">
            About
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-xl text-white"
          >
            Get Started
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
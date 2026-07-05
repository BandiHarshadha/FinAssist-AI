import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-slate-950 text-white border-b border-slate-800">
      <Link to="/" className="text-2xl font-bold text-cyan-400">
        🤖 FinAssist AI
      </Link>

      <div className="flex gap-4">
        {!token ? (
          <>
            <Link
              to="/login"
              className="rounded-lg px-5 py-2 text-white hover:text-cyan-400"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-white hover:bg-cyan-400"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-white hover:bg-cyan-400"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg px-5 py-2 text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
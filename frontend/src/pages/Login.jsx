import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { loginUser, googleLogin } from "../services/authService";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser({ identifier, password });

      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        window.location.href = "/dashboard";
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900/90 p-10 shadow-2xl">
        <h1 className="text-center text-5xl font-extrabold text-white">
          Welcome Back
        </h1>

        <p className="mt-3 text-center text-lg text-slate-400">
          Login to continue to FinAssist AI
        </p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/20 p-4 text-red-300">
            {error}
          </div>
        )}

        <div className="mt-8">
          <LoginForm
            identifier={identifier}
            setIdentifier={setIdentifier}
            password={password}
            setPassword={setPassword}
            loading={loading}
            handleLogin={handleLogin}
          />
        </div>

        <button
          onClick={googleLogin}
          className="mt-5 w-full rounded-xl bg-white py-4 text-lg font-bold text-black hover:bg-slate-100"
        >
          Continue with Google
        </button>

        <p className="mt-8 text-center text-slate-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-bold text-cyan-400">
            Register
          </Link>
        </p>

        <p className="mt-4 text-center">
          <Link to="/" className="text-sm text-slate-500 hover:text-cyan-400">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
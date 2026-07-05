import { useState } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { registerUser, googleLogin } from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await registerUser({
        name,
        username,
        email,
        password,
      });

      console.log("Register Response:", response);

      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        window.location.href = "/dashboard";
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to register. Please check backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-slate-400 text-center mb-6">
          Join FinAssist AI
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-300 border border-red-500/40 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <RegisterForm
          name={name}
          setName={setName}
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          handleRegister={handleRegister}
        />

        <button
          onClick={googleLogin}
          className="w-full mt-4 bg-white text-black p-3 rounded-lg font-semibold"
        >
          Continue with Google
        </button>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
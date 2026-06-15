function LoginForm() {
  return (
    <form className="space-y-5">
      <input
        type="email"
        placeholder="Email Address"
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-400"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
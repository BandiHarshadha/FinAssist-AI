import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="px-6 py-20 bg-slate-950 text-center">
      <h2 className="text-4xl font-bold text-white">
        Ready to take control of your money?
      </h2>

      <p className="mt-4 text-slate-400">
        Login and start using your AI financial assistant.
      </p>

      <Link
        to="/login"
        className="mt-8 inline-block rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-white hover:bg-cyan-400"
      >
        Get Started
      </Link>
    </section>
  );
}

export default CTA;
import { motion } from "framer-motion";

function CategoryCard({ title, description, icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -8,
      }}
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-lg shadow-xl cursor-pointer"
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${color}`}
      >
        <Icon className="text-white" size={28} />
      </div>

      <h3 className="text-xl font-bold text-white">{title}</h3>

      <p className="mt-3 text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}

export default CategoryCard;
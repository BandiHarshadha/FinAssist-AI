import CategoryCard from "./CategoryCard";
import { bankingCategories } from "../../data/bankingCategories";

function Categories() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-center text-4xl font-bold text-white">
          Banking Services
        </h2>

        <p className="mb-14 text-center text-slate-400">
          Explore AI-powered financial services.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {bankingCategories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              icon={category.icon}
              path={category.path}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
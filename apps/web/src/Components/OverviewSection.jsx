import { CheckCircle } from "lucide-react";

const overviewPoints = [
  {
    title: "Track expiry dates",
    description:
      "Add food items with expiry dates and notes so you know exactly what is in your kitchen.",
  },
  {
    title: "Reduce food waste",
    description:
      "See upcoming expirations early and use items before they go bad.",
  },
  {
    title: "Stay organized",
    description:
      "Group items by category, status, and freshness to manage your inventory faster.",
  },
  {
    title: "Secure data handling",
    description:
      "Authentication and protected routes keep your food data private.",
  },
];

const OverviewSection = () => {
  return (
    <section className="rounded-2xl px-4 py-14 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff6347] dark:text-[#ffa500]">
            Food Expiry Tracker Overview
          </h2>
          <p className="text-sm text-gray-600 dark:text-[#d1d5db] mt-3 max-w-3xl mx-auto">
            A web app that helps you add, view, update, and manage food items with
            expiry dates. It is designed to practice full-stack development with
            authentication, CRUD operations, and secure data handling while
            reducing food waste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {overviewPoints.map((point, index) => (
            <div
              key={index}
              className="flex gap-4 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md"
            >
              <CheckCircle className="text-[#ff6347] dark:text-[#ffa500] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#d1d5db]">
                  {point.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;

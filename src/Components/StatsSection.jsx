import CountUp from "react-countup";
import { FaUtensils, FaClock, FaStickyNote } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      icon: <FaUtensils className="text-4xl text-[#ff6347] dark:text-[#ffa500]" />,
      value: 500,
      suffix: "+",
      label: "Foods Tracked",
    },
    {
      icon: <FaClock className="text-4xl text-[#ff6347] dark:text-[#ffa500]" />,
      value: 10000,
      suffix: "+",
      label: "Expiry Alerts Sent",
    },
    {
      icon: <FaStickyNote className="text-4xl text-[#ff6347] dark:text-[#ffa500]" />,
      value: 3000,
      suffix: "+",
      label: "Notes Added",
    },
  ];

  return (
    <section className="rounded-2xl px-4 py-16 bg-[#fffaf5] dark:bg-[#1f1f1f] transition-colors duration-500">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-[#ff6347] dark:text-[#ffa500]">
          Our Impact in Numbers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-800 shadow-[0_4px_20px_rgba(255,99,71,0.2)] dark:shadow-[0_4px_20px_rgba(255,165,0,0.2)] rounded-2xl p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform"
            >
              <div className="mb-4">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-[#111827] dark:text-[#d1d5db]">
                <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
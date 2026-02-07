import { Bell, Clock3, AlertTriangle } from "lucide-react";

const alerts = [
  {
    title: "Early notice",
    description: "Get a heads-up while there is still time to plan meals.",
    icon: Clock3,
  },
  {
    title: "Approaching expiry",
    description: "Prioritize items that are close to expiring.",
    icon: AlertTriangle,
  },
  {
    title: "Timely reminders",
    description: "Stay informed with clear, actionable alerts.",
    icon: Bell,
  },
];

const AlertsSection = () => {
  return (
    <section className="rounded-2xl px-4 py-14 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff6347] dark:text-[#ffa500]">
            Expiry Alerts That Help You Act
          </h2>
          <p className="text-sm text-gray-600 dark:text-[#d1d5db] mt-3 max-w-2xl mx-auto">
            See upcoming expirations at a glance so you can use food before it
            goes to waste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md"
            >
              <alert.icon className="text-4xl text-[#ff6347] dark:text-[#ffa500]" />
              <h3 className="text-xl font-semibold text-[#111827] dark:text-[#d1d5db] mt-4">
                {alert.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {alert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlertsSection;

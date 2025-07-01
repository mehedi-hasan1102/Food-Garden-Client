import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../context/firebase/firebase.config";
import { motion as Motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { GiFruitBowl, GiPlantWatering } from "react-icons/gi";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const numberPulse = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" },
  },
};

const Overview = () => {
  const [user] = useAuthState(auth);
  const [stats, setStats] = useState({ total: 0, mine: 0 });

  useEffect(() => {
    if (!user?.email) return;

    const fetchFoods = async () => {
      try {
        const res = await fetch("https://project-web-b11-a11-food-garden-ser.vercel.app/foods");
        const data = await res.json();

        const myItems = data.filter(
          (item) => item.userEmail?.toLowerCase() === user.email.toLowerCase()
        );

        setStats({ total: data.length, mine: myItems.length });
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, [user?.email]);

  return (
    <div
      className="min-h-screen
        bg-[#fffaf5] dark:bg-[#1f1f1f]
        px-4 py-12
        transition-colors duration-300"
    >
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Welcome Section */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1
            className="text-4xl font-extrabold
            text-[#ff6347] dark:text-[#ffa500] mb-2"
          >
            Welcome to your Dashboard!
          </h1>
          <p className="text-[#111827] dark:text-[#d1d5db]">
            Here's a quick snapshot of your foods collection.
          </p>
        </Motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Motion.div
            className="bg-white dark:bg-[#1f1f1f] rounded-md p-6
              shadow-[0_4px_20px_rgba(255,99,71,0.3)]
              dark:shadow-[0_4px_20px_rgba(255,165,0,0.5)]
              text-center"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Motion.img
                src={user?.photoURL || "https://i.ibb.co/5r5C1fJ/user.png"}
                alt="User Avatar"
                className="w-full h-full rounded-full border-4 border-[#ff6347] dark:border-[#ffa500] object-cover shadow-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              <span
                className="absolute -top-2 -right-2
                bg-[#ff6347] dark:bg-[#ffa500]
                text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow"
              >
                ✅ User
              </span>
            </div>
            <h3
              className="text-xl font-semibold
              text-[#ff6347] dark:text-[#ffa500]
              flex items-center justify-center gap-2"
            >
              <FaUserCircle /> {user?.displayName || "Anonymous"}
            </h3>
            <p className="text-sm text-[#111827] dark:text-[#d1d5db]">
              {user?.email}
            </p>
          </Motion.div>

          {/* Total Foods Card */}
          <Motion.div
            className="bg-white dark:bg-[#1f1f1f] rounded-md p-6
              shadow-[0_4px_20px_rgba(255,99,71,0.3)]
              dark:shadow-[0_4px_20px_rgba(255,165,0,0.5)]
              text-center"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3
              className="text-lg font-semibold mb-2
              text-[#ff6347] dark:text-[#ffa500]
              flex items-center justify-center gap-2"
            >
              <GiFruitBowl /> Total Foods
            </h3>
            <Motion.p
              className="text-5xl font-extrabold
              text-[#ff6347] dark:text-[#ffa500]"
              variants={numberPulse}
              initial="rest"
              animate="rest"
              whileHover="hover"
            >
              {stats.total}
            </Motion.p>
          </Motion.div>

          {/* My Foods Card */}
          <Motion.div
            className="bg-white dark:bg-[#1f1f1f] rounded-md p-6
              shadow-[0_4px_20px_rgba(255,99,71,0.3)]
              dark:shadow-[0_4px_20px_rgba(255,165,0,0.5)]
              text-center"
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3
              className="text-lg font-semibold mb-2
              text-[#ff6347] dark:text-[#ffa500]
              flex items-center justify-center gap-2"
            >
              <GiPlantWatering /> My Foods
            </h3>
            <Motion.p
              className="text-5xl font-extrabold
              text-[#ff6347] dark:text-[#ffa500]"
              variants={numberPulse}
              initial="rest"
              animate="rest"
              whileHover="hover"
            >
              {stats.mine}
            </Motion.p>
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

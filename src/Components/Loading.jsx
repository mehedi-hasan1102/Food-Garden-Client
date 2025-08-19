import React, { useState, useEffect } from "react";

const Loading = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-300 dark:border-gray-700">
        
        {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-transparent border-[#ff6347] rounded-full animate-spin"></div>

        <p className="mt-6 text-xl font-bold text-gray-900 dark:text-gray-100">
          FoodGarden
        </p>

        {/* Loading text */}
        <p className="text-[#ff6347] font-medium mt-1">
          Loading{dots}
        </p>
      </div>
    </div>
  );
};

export default Loading;

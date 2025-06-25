import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { format } from "date-fns";

const DynamicSections = () => {
  const [visibleFoods, setVisibleFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://project-web-b11-a11-food-garden-ser.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        const fiveDaysLater = new Date();
        fiveDaysLater.setDate(today.getDate() + 5);  // 5 day expired time

        const nearlyExpired = data.filter((food) => {
          const expiry = new Date(food.expiryDate);
          return expiry >= today && expiry <= fiveDaysLater;
        });

        const sorted = nearlyExpired.sort(
          (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
        );

        setAllFoods(sorted);
        setVisibleFoods(sorted.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch food data", err);
        setLoading(false);
      });
  }, []);

  const handleShowAll = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleFoods(allFoods);
      setLoading(false);
      setShowAll(true);
    }, 500);
  };

  return (
    <section className="rounded-2xl mt-8 max-w-8xl mx-auto px-4 py-14 bg-gradient-to-b from-yellow-50 to-white dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-300">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-700 dark:text-orange-400">
          Nearly Expiry Food Items
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-base max-w-xl mx-auto">
          These items are expiring within the next 5 days. Use or donate them soon to prevent waste.
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : visibleFoods.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No nearly expiring food items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {visibleFoods.map((food) => 
          
          (
            <div
              key={food._id}
              className="text-center bg-gradient-to-br from-yellow-100 to-white dark:from-zinc-800 dark:to-zinc-900 p-5 rounded-xl shadow hover:shadow-xl transition-shadow duration-300"
            >
              {food.image ? (
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-48 object-cover rounded-md mb-4 mx-auto"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-200 dark:bg-zinc-700 rounded-md mb-4">
                  <span className="text-gray-500 dark:text-gray-300">No Image</span>
                </div>
              )}

              <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-300">
                {food.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Category: {food.category}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Quantity: {food.quantity}
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                Expiry: {format(new Date(food.expiryDate), "dd MMM yyyy")}
              </p>

              <button
                onClick={() => navigate(`/food-details/${food._id}`)}
                className="mt-4 px-4 py-2 rounded-md btn  dark:text-gray-900 bg-[#ff6347] hover:bg-[#e5533d] btn-sm text-white dark:bg-[#ffa500] dark:hover:bg-[#cc8400] transition-colors mx-auto block"
              >
                See Details
              </button>
            </div>
          ))}
        </div>
      )}

      {!showAll && !loading && visibleFoods.length >= 6 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleShowAll}
            className="px-6  py-2 rounded-md btn
            bg-[#ff6347] text-white font-semibold
            hover:bg-[#e5533c] dark:bg-[#ffa500] dark:text-gray-900 dark:hover:bg-[#cc8400]
            transition-colors duration-200 "
          >
            View All 
          </button>
        </div>
      )}
    </section>
  );
};

export default DynamicSections;

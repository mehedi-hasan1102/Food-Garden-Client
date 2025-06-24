import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const FridgePage = () => {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get("https://mehedi2.vercel.app/foods");
        setFoods(res.data);
      } catch (err) {
        Swal.fire({
          title: "Failed to fetch foods",
          icon: "error",
          draggable: true,
        });
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const options = ["All", "Dairy", "Meat", "Vegetables", "Snacks"];

  const filterFoods = foods.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" ? true : item.category === category)
  );

  // Helper function to check if food is expired
  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-green-700 dark:text-green-300 text-lg animate-pulse">
        Loading foods...
      </div>
    );
  }

  return (
    <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 dark:text-emerald-400 mb-6 text-center">
          My Fridge
        </h1>
        <div className="flex justify-center items-center flex-col">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              className="grow"
              placeholder="Search"
            />
            <kbd className="kbd kbd-sm">⌘</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
          <h3>Select By Category</h3>
          <select
            className="input"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {options.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="divider"></div>

        {filterFoods.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No food items found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterFoods.map((food) => (
              <div
                key={food._id}
                className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                {/* Food Image */}
                <img
                  src={food.image || "/default-food.jpg"} // fallback image
                  alt={food.title}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4 flex flex-col flex-grow">
                  {/* Food Title */}
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    {food.title || food.plantName || "Untitled Food"}
                  </h2>

                  {/* Category */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Category: {food.category || "N/A"}
                  </p>

                  {/* Quantity */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Quantity: {food.quantity || 0}
                  </p>

                  {/* Expired Badge */}
                  {isExpired(food.expiryDate) && (
                    <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold text-red-700 bg-red-200 rounded-full">
                      Expired
                    </span>
                  )}

                  {/* See Details Button */}
                  <button
                    onClick={() => navigate(`/food-details/${food._id}`)}
                    className="mt-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-center transition"
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FridgePage;

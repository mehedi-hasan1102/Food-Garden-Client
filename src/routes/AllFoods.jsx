import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../api/axios";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/foods");
        const payload = res.data;
        const items = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
          ? payload
          : [];
        setFoods(items);
      } catch (err) {
        Swal.fire({
          title: "Failed to fetch foods",
          icon: "error",
        });
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const options = ["All", "Dairy", "Meat", "Vegetables", "Snacks"];

  const isExpired = (expiryDate) => new Date(expiryDate) < new Date();

  const filteredFoods = foods.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" ? true : item.category === category)
  );

  const sortedFoods = [...filteredFoods].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.expiryDate) - new Date(a.expiryDate);
    if (sortBy === "oldest") return new Date(a.expiryDate) - new Date(b.expiryDate);
    if (sortBy === "title_asc") return a.title.localeCompare(b.title);
    if (sortBy === "title_desc") return b.title.localeCompare(a.title);
    return 0;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setCategory("All");
    setSortBy("newest");
  };

  return (
    <div className="px-4 py-10 min-h-screen bg-[#fffaf5] dark:bg-[#1f1f1f] transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#ff6347] dark:text-[#ffa500] mb-10 text-center">
          All Food Items
        </h1>

        {/* Filter Panel */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_20px_rgba(255,99,71,0.3)] dark:shadow-[0_4px_20px_rgba(255,165,0,0.5)]">
          <input
            type="search"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[#111827] dark:text-[#d1d5db] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6347] dark:focus:ring-[#ffa500]"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-48 px-4 py-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[#111827] dark:text-[#d1d5db] focus:outline-none focus:ring-2 focus:ring-[#ff6347] dark:focus:ring-[#ffa500]"
          >
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-48 px-4 py-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[#111827] dark:text-[#d1d5db] focus:outline-none focus:ring-2 focus:ring-[#ff6347] dark:focus:ring-[#ffa500]"
          >
            <option value="newest">Expiry: Newest First</option>
            <option value="oldest">Expiry: Oldest First</option>
            <option value="title_asc">Title: A → Z</option>
            <option value="title_desc">Title: Z → A</option>
          </select>

          <button
            onClick={resetFilters}
            className="btn-outline btn border-[#ff6347] text-[#ff6347] dark:border-[#ffa500] dark:text-[#ffa500] px-4 py-2 rounded-md font-medium transition-colors hover:bg-[#ff6347] hover:text-white dark:hover:bg-[#ffa500] dark:hover:text-black"
          >
            Reset Filters
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <Loading />
        ) : sortedFoods.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">No food items found.</p>
        ) : (
          <>
            {/* Table view for desktop */}
            <div className="hidden md:block overflow-x-auto bg-white dark:bg-zinc-800 rounded-lg shadow-[0_4px_20px_rgba(255,99,71,0.3)] dark:shadow-[0_4px_20px_rgba(255,165,0,0.5)]">
              <table className="min-w-full text-sm text-left border border-gray-200 dark:border-zinc-700">
                <thead className="bg-[#ffede8] dark:bg-[#2c2c2c] text-gray-800 dark:text-gray-200">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Expiry Date</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  {sortedFoods.map((food) => (
                    <tr
                      key={food._id}
                      className="border-t border-gray-100 dark:border-zinc-700 hover:bg-orange-50 dark:hover:bg-zinc-700 transition"
                    >
                      <td className="p-4 font-medium">{food.title}</td>
                      <td className="p-4">{food.category}</td>
                      <td className="p-4">{food.quantity}</td>
                      <td className="p-4">{new Date(food.expiryDate).toLocaleDateString()}</td>
                      <td className="p-4 text-center">
                        {isExpired(food.expiryDate) ? (
                          <span className="text-xs font-semibold bg-red-200 text-red-700 px-3 py-1 rounded-full">
                            Expired
                          </span>
                        ) : (
                          <span className="text-xs font-semibold bg-green-200 text-green-700 px-3 py-1 rounded-full">
                            Valid
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => navigate(`/dashboard/food-details/${food._id}`)}
                          className="px-4 py-2 bg-[#ff6347] hover:bg-[#e5533d] dark:bg-[#ffa500] dark:hover:bg-[#cc8400] text-white dark:text-black rounded-md transition"
                        >
                          See Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card view for mobile */}
            <div className="block md:hidden space-y-6">
              {sortedFoods.map((food) => (
                <div
                  key={food._id}
                  className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-[0_4px_20px_rgba(255,99,71,0.3)] dark:shadow-[0_4px_20px_rgba(255,165,0,0.5)]"
                >
                  <h2 className="text-lg font-bold text-[#111827] dark:text-[#d1d5db]">{food.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category: {food.category}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {food.quantity}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Expiry: {new Date(food.expiryDate).toLocaleDateString()}
                  </p>
                  <p className="mt-2">
                    {isExpired(food.expiryDate) ? (
                      <span className="text-xs font-semibold bg-red-200 text-red-700 px-3 py-1 rounded-full">
                        Expired
                      </span>
                    ) : (
                      <span className="text-xs font-semibold bg-green-200 text-green-700 px-3 py-1 rounded-full">
                        Valid
                      </span>
                    )}
                  </p>
                  <button
                    onClick={() => navigate(`/dashboard/food-details/${food._id}`)}
                    className="mt-4 px-4 py-2 bg-[#ff6347] hover:bg-[#e5533d] dark:bg-[#ffa500] dark:hover:bg-[#cc8400] text-white dark:text-black rounded-md transition w-full"
                  >
                    See Details
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllFoods;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Loading from "./Loading";
// import axiosSecure from "../api/axios";

// const DynamicSections = () => {
//   const [visibleFoods, setVisibleFoods] = useState([]);
//   const [allFoods, setAllFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFoods = async () => {
//       try {
//         const res = await axiosSecure.get("/foods");
//         if (res.data.ok) {
//           const data = res.data.data;
//           const today = new Date();
//           const fiveDaysLater = new Date();
//           fiveDaysLater.setDate(today.getDate() + 5);  // 5 day expired time

//           const nearlyExpired = data.filter((food) => {
//             const expiry = new Date(food.expiryDate);
//             return expiry >= today && expiry <= fiveDaysLater;
//           });

//           const sorted = nearlyExpired.sort(
//             (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
//           );

//           setAllFoods(sorted);
//           setVisibleFoods(sorted.slice(0, 6));
//         }
//       } catch (err) {
//         console.error("Failed to fetch food data", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFoods();
//   }, []);

//   const handleShowAll = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setVisibleFoods(allFoods);
//       setLoading(false);
//       setShowAll(true);
//     }, 500);
//   };

//   return (
//     <section className=" rounded-2xl max-w-8xl mx-auto px-4 py-14 bg-[#fffaf5] dark:bg-[#1f1f1f] transition-colors duration-300">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#ff6347] dark:text-[#ffa500]">
//           Nearly Expiry Food Items
//         </h2>
//         <p className="text-sm text-gray-500 dark:text-[#d1d5db] mt-3 max-w-xl mx-auto">
//           These items are expiring within the next 5 days. Use or donate them soon to prevent waste.
//         </p>
//       </div>

//       {loading ? (
//         <Loading />
//       ) : visibleFoods.length === 0 ? (
//         <p className="text-center text-gray-500 dark:text-[#d1d5db]">No nearly expiring food items found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {visibleFoods.map((food) => (
//             <div
//   key={food._id}
//   className="flex flex-col bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//   style={{ minHeight: "320px" }}
// >
//   {food.image ? (
//     <img
//       src={food.image}
//       alt={food.name}
//       className="w-full h-44 object-cover rounded-md mb-5 shadow-sm"
//     />
//   ) : (
//     <div className="w-full h-44 flex items-center justify-center bg-gray-100 dark:bg-zinc-700 rounded-md mb-5">
//       <span className="text-gray-400 dark:text-gray-500 italic">No Image</span>
//     </div>
//   )}

//   <h3 className="text-2xl font-semibold text-[#111827] dark:text-[#d1d5db] mb-3 truncate">
//     {food.title}
//   </h3>

//   <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3 leading-relaxed">
//     {food.description || "No description available."}
//   </p>

//   <button
//     onClick={() => navigate(`/food-details/${food._id}`)}
//     className="mt-auto inline-block px-5 py-2 rounded-md bg-[#ff6347] hover:bg-[#e5533d] text-white dark:bg-[#ffa500] dark:hover:bg-[#cc8400] font-medium transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#ff6347] dark:focus:ring-[#ffa500]"
//   >
//     See More
//   </button>
// </div>

//           ))}
//         </div>
//       )}

//       {!showAll && !loading && visibleFoods.length >= 6 && (
//         <div className="flex justify-center mt-12">
//           <button
//             onClick={handleShowAll}
//             className="px-6 py-2 rounded-lg bg-[#ff6347] text-white font-semibold hover:bg-[#e5533d] dark:bg-[#ffa500] dark:text-[#111827] dark:hover:bg-[#cc8400] transition-colors duration-200"
//           >
//             View All
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default DynamicSections;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axiosSecure from "../api/axios";

const DynamicSections = () => {
  const [visibleFoods, setVisibleFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axiosSecure.get("/foods");
        if (res.data.ok) {
          const data = res.data.data;

          // Sort by newest first
          const sorted = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          // Show only first 8 items
          setVisibleFoods(sorted.slice(0, 8));
        }
      } catch (err) {
        console.error("Failed to fetch food data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <section className="rounded-2xl max-w-8xl mx-auto px-4 py-14 bg-[#fffaf5] dark:bg-[#1f1f1f] transition-colors duration-300">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff6347] dark:text-[#ffa500]">
          Latest Food Items
        </h2>
        <p className="text-sm text-gray-500 dark:text-[#d1d5db] mt-3 max-w-xl mx-auto">
          Check out the most recently added food items in our system.
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : visibleFoods.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-[#d1d5db]">No food items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleFoods.map((food) => (
            <div
              key={food._id}
              className="flex flex-col bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{ minHeight: "320px" }}
            >
              {food.image ? (
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-44 object-cover rounded-md mb-5 shadow-sm"
                />
              ) : (
                <div className="w-full h-44 flex items-center justify-center bg-gray-100 dark:bg-zinc-700 rounded-md mb-5">
                  <span className="text-gray-400 dark:text-gray-500 italic">No Image</span>
                </div>
              )}

              <h3 className="text-2xl font-semibold text-[#111827] dark:text-[#d1d5db] mb-3 truncate">
                {food.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3 leading-relaxed">
                {food.description || "No description available."}
              </p>

              <button
                onClick={() => navigate(`/food-details/${food._id}`)}
                className="mt-auto inline-block px-5 py-2 rounded-md bg-[#ff6347] hover:bg-[#e5533d] text-white dark:bg-[#ffa500] dark:hover:bg-[#cc8400] font-medium transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#ff6347] dark:focus:ring-[#ffa500]"
              >
                See More
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && visibleFoods.length >= 8 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/fridge")}
            className="px-6 py-2 rounded-lg bg-[#ff6347] text-white font-semibold hover:bg-[#e5533d] dark:bg-[#ffa500] dark:text-[#111827] dark:hover:bg-[#cc8400] transition-colors duration-200"
          >
            View All
          </button>
        </div>
      )}
    </section>
  );
};

export default DynamicSections;

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Provider/AuthProvider";
import Swal from "sweetalert2";

const MyItems = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // ✅ Fetch items owned by the current user
  useEffect(() => {
    const fetchMyItems = async () => {
      if (!user?.email) return;
      setLoading(true);

      try {
        const res = await fetch("https://project-web-b11-a11-food-garden-ser.vercel.app/foods");
        const allItems = await res.json();
        const myItems = allItems.filter(item => item.userEmail === user.email);
        setItems(myItems);
      } catch (error) {
        Swal.fire({
          title: "Failed to load items!",
          icon: "error",
        });
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, [user?.email]);

  // ✅ Delete handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://project-web-b11-a11-food-garden-ser.vercel.app/foods/${id}`, {
        method: "DELETE",


headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(formData),
        credentials: "include",  
        // credential add here


      });
      if (!res.ok) throw new Error("Delete failed");

      setItems(prev => prev.filter(item => item._id !== id));
      Swal.fire({
        title: "Item deleted!",
        icon: "success",
      });
      setDeletingId(null);
    } catch (error) {
      Swal.fire({
        title: "Failed to delete item.",
        icon: "error",
      });
      console.error("Delete error:", error);
    }
  };

  // ✅ Update handler
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    const form = e.target;
    const formData = {
      // CHANGE 2: Now we can directly use form.title.value
      title: form.title.value,
      category: form.category.value,
      quantity: parseInt(form.quantity.value),
      expiryDate: form.expiryDate.value,
      description: form.description.value,
    };

    try {
      const res = await fetch(`https://project-web-b11-a11-food-garden-ser.vercel.app/foods/${updatingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",  
        // cre
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedItem = await res.json();
      setItems(prev => prev.map(item => (item._id === updatedItem._id ? updatedItem : item)));

      Swal.fire({
        title: "Item updated!",
        icon: "success",
      });
      setUpdatingItem(null);
    } catch (error) {
      Swal.fire({
        title: "Update failed.",
        icon: "error",
      });
      console.error("Update error:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="text-center mt-10 text-green-700 dark:text-green-300 text-lg animate-pulse">
        Loading your items...
      </div>
    );
  }

  return (
    <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6 text-green-700 dark:text-emerald-400">
          My Food Items
        </h2>

        {/* ✅ Empty state */}
        {items.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You haven’t added any food items yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-xl bg-white dark:bg-zinc-800 transition">
            <table className="min-w-full text-sm text-left border border-gray-200 dark:border-zinc-700">
              <thead className="bg-green-100 dark:bg-emerald-900 text-gray-800 dark:text-gray-100">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Expiry Date</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                {items.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-gray-100 dark:border-zinc-700 hover:bg-green-50 dark:hover:bg-zinc-700 transition"
                  >
                    <td className="p-4 font-medium">{item.title}</td>
                    <td className="p-4">{item.category}</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4">{new Date(item.expiryDate).toLocaleDateString()}</td>
                    <td className="p-4 flex justify-center gap-3">
                      <button
                        onClick={() => setUpdatingItem(item)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setDeletingId(item._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ Delete Modal */}
        {deletingId && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md w-[90%] max-w-md text-gray-800 dark:text-gray-100">
              <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
              <p className="mb-6">Are you sure you want to delete this item?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeletingId(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded hover:bg-gray-100 dark:hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deletingId)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Update Modal */}
        {updatingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-auto p-4">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md w-full max-w-lg text-gray-800 dark:text-gray-100">
              <h3 className="text-2xl font-semibold mb-6">Update Food Item</h3>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block mb-1 font-medium">
                    Food Title 
                  </label>
                  <input
                    name="title" 
                    id="title" 
                    defaultValue={updatingItem.title}
                    required
                    className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block mb-1 font-medium">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    defaultValue={updatingItem.category}
                    className="select select-bordered w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Snacks">Snacks</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quantity" className="block mb-1 font-medium">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    defaultValue={updatingItem.quantity}
                    min="1"
                    required
                    className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="expiryDate" className="block mb-1 font-medium">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    id="expiryDate"
                    defaultValue={new Date(updatingItem.expiryDate).toISOString().split("T")[0]}
                    required
                    className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block mb-1 font-medium">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    defaultValue={updatingItem.description}
                    required
                    className="textarea textarea-bordered w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setUpdatingItem(null)}
                    className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded hover:bg-gray-100 dark:hover:bg-zinc-700"
                    disabled={updateLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={updateLoading}
                  >
                    {updateLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyItems;

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../context/firebase/firebase.config";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import axiosSecure from "../api/axios";

const MyItems = () => {
  const [user, authLoading] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchMyItems = async () => {
      if (authLoading || !user) {
        return;
      }
      setLoading(true);
      try {
        const res = await axiosSecure.get("/foods");
        if (res.data.ok) {
          const allItems = res.data.data;
          const myItems = allItems.filter(
            (item) => item.userEmail === user.email
          );
          setItems(myItems);
        }
      } catch (error) {
        Swal.fire({ title: "Failed to load items!", icon: "error" });
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, [user, authLoading]);

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/foods/${id}`);
      if (res.data.ok) {
        setItems((prev) => prev.filter((item) => item._id !== id));
        Swal.fire({ title: "Item deleted!", icon: "success" });
        setDeletingId(null);
      }
    } catch (error) {
      Swal.fire({ title: "Failed to delete item.", icon: "error" });
      console.error("Delete error:", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    const form = e.target;
    const formData = {
      title: form.title.value,
      category: form.category.value,
      quantity: parseInt(form.quantity.value),
      expiryDate: form.expiryDate.value,
      description: form.description.value,
    };

    try {
      const res = await axiosSecure.put(`/foods/${updatingItem._id}`, formData);

      if (res.data.ok) {
        const updatedItem = res.data.data;
        setItems((prev) =>
          prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
        );

        Swal.fire({ title: "Item updated!", icon: "success" });
        setUpdatingItem(null);
      }
    } catch (error) {
      Swal.fire({ title: "Update failed.", icon: "error" });
      console.error("Update error:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading || authLoading) {
    return <Loading />;
  }

  return (
    <div className="px-4 py-10 min-h-screen bg-[#fffaf5] dark:bg-[#1f1f1f] transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6 text-[#ff6347] dark:text-[#ffa500]">
          My Food Items
        </h2>

        {items.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You haven’t added any food items yet.
          </p>
        ) : (
          <>
            <div className="hidden md:block rounded-xl bg-white dark:bg-[#1f1f1f] shadow-[0_4px_20px_rgba(255,99,71,0.3)] dark:shadow-[0_4px_20px_rgba(255,165,0,0.5)]">
              <table className="min-w-full text-sm text-left border border-[#ff6347] dark:border-[#ffa500]">
                <thead className=" bg-[#ff6347]/20 dark:bg-[#ffa500]/20 text-[#111827] dark:text-[#d1d5db]">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Expiry Date</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-[#111827] dark:text-[#d1d5db]">
                  {items.map((item) => (
                    <tr key={item._id} className="border-t border-[#ff6347]/50 dark:border-[#ffa500]/50 hover:bg-[#e5533d]/10 dark:hover:bg-[#cc8400]/20 transition">
                      <td className="p-4 font-medium">{item.title}</td>
                      <td className="p-4">{item.category}</td>
                      <td className="p-4">{item.quantity}</td>
                      <td className="p-4">{new Date(item.expiryDate).toLocaleDateString()}</td>
                      <td className="p-4 flex justify-center gap-3">
                        <button onClick={() => setUpdatingItem(item)} className="px-4 py-2 bg-[#ff6347] hover:bg-[#e5533d] text-white rounded-md">
                          Update
                        </button>
                        <button onClick={() => setDeletingId(item._id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-4 md:hidden">
              {items.map((item) => (
                <div key={item._id} className="p-4 bg-white dark:bg-[#1f1f1f] rounded-xl border border-[#ff6347] dark:border-[#ffa500] shadow-[0_4px_20px_rgba(255,99,71,0.3)] dark:shadow-[0_4px_20px_rgba(255,165,0,0.5)]">
                  <h3 className="text-xl font-semibold mb-1 text-[#ff6347] dark:text-[#ffa500]">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category: {item.category}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expiry: {new Date(item.expiryDate).toLocaleDateString()}</p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setUpdatingItem(item)} className="flex-1 px-4 py-2 bg-[#ff6347] hover:bg-[#e5533d] text-white rounded-md">
                      Update
                    </button>
                    <button onClick={() => setDeletingId(item._id)} className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {deletingId && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-zinc-900 text-[#111827] dark:text-[#d1d5db] p-6 rounded-lg w-full max-w-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
              <p className="mb-6">Are you sure you want to delete this item?</p>
              <div className="flex justify-end gap-4">
                <button onClick={() => setDeletingId(null)} className="px-4 py-2 border border-[#ff6347] dark:border-[#ffa500] rounded-md hover:bg-[#ff6347]/10 dark:hover:bg-[#ffa500]/10 transition">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deletingId)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {updatingItem && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 overflow-auto">
            <div className="bg-white dark:bg-zinc-900 text-[#111827] dark:text-[#d1d5db] p-6 rounded-lg w-full max-w-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Update Food Item</h3>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <input name="title" defaultValue={updatingItem.title} className="input input-bordered w-full bg-white dark:bg-zinc-800 text-[#111827] dark:text-[#d1d5db]" />
                <select name="category" defaultValue={updatingItem.category} className="select select-bordered w-full bg-white dark:bg-zinc-800 text-[#111827] dark:text-[#d1d5db]">
                  <option>Dairy</option>
                  <option>Meat</option>
                  <option>Vegetables</option>
                  <option>Snacks</option>
                </select>
                <input name="quantity" type="number" defaultValue={updatingItem.quantity} className="input input-bordered w-full bg-white dark:bg-zinc-800 text-[#111827] dark:text-[#d1d5db]" />
                <input name="expiryDate" type="date" defaultValue={new Date(updatingItem.expiryDate).toISOString().split("T")[0]} className="input input-bordered w-full bg-white dark:bg-zinc-800 text-[#111827] dark:text-[#d1d5db]" />
                <textarea name="description" defaultValue={updatingItem.description} className="textarea textarea-bordered w-full bg-white dark:bg-zinc-800 text-[#111827] dark:text-[#d1d5db]"></textarea>
                <div className="flex justify-end gap-4 pt-2">
                  <button type="button" onClick={() => setUpdatingItem(null)} className="px-4 py-2 border border-[#ff6347] dark:border-[#ffa500] rounded-md hover:bg-[#ff6347]/10 dark:hover:bg-[#ffa500]/10 transition">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-[#ff6347] hover:bg-[#e5533d] text-white rounded-md" disabled={updateLoading}>
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

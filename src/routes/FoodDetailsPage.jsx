import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/Provider/AuthProvider";
import Countdown from "react-countdown";
import { MdInfoOutline } from "react-icons/md";
import Loading from "../Components/Loading";

const FoodDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const res = await fetch(`https://food-garden-server-bd.vercel.app/foods/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch food details");
        const data = await res.json();
        setFood(data);
        setNotes(data.notes || []);
      } catch (err) {
        console.error("Failed to load food details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [id]);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await axiosSecure.post(`/foods/notes/${id}`, {
        note: newNote,
        postedBy: user.email,
        postedAt: new Date().toISOString(),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add note");
      }

      const savedNote = await res.json();
      setNotes((prev) => [...prev, savedNote]);
      setNewNote("");
    } catch (err) {
      console.error("Note submission error:", err);
      setError(err.message || "Failed to add note");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return  <Loading /> 
  if (error)
    return <div className="text-center mt-12 text-red-500">{error}</div>;
  if (!food)
    return <div className="text-center mt-12">Food not found.</div>;

  const isFoodCreator = user?.email === food?.userEmail;

  return (
    <div className="px-4 py-8 min-h-screen bg-[#fffaf5] dark:bg-[#1f1f1f] transition-colors duration-500">
      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 shadow-[0_4px_20px_rgba(255,99,71,0.3)] dark:shadow-[0_4px_20px_rgba(255,165,0,0.5)] rounded-2xl p-6 mb-8">
        {/* Image */}
        <img
          src={food.image}
          alt={food.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-food-image.jpg";
          }}
        />

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#ff6347] dark:text-[#ffa500] mb-4">
          {food.title}
        </h2>

        {/* Grid Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-[#111827] dark:text-[#d1d5db]">
          <div>
            <p className="mb-2"><strong>Category:</strong> {food.category}</p>
            <p className="mb-2"><strong>Quantity:</strong> {food.quantity}</p>
            <p className="mb-2"><strong>Expiry Date:</strong> {food.expiryDate}</p>
          </div>
          <div>
            <p className="mb-2"><strong>Description:</strong> {food.description || "No description"}</p>
            <p className="mb-2"><strong>Added Date:</strong> {food.addedDate}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <strong>Added by:</strong> {food.userEmail || "Unknown"}
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-6 p-4 bg-[#fdf1ec] dark:bg-zinc-800 rounded-lg border border-orange-100 dark:border-zinc-700">
          <p>
            <strong className="text-[#ff6347] dark:text-[#ffa500]">Expiration Status:</strong>{" "}
            {new Date(food.expiryDate) > new Date() ? (
              <span className="text-green-600 dark:text-green-400 font-semibold">
                <Countdown
                  date={new Date(food.expiryDate)}
                  daysInHours={true}
                  renderer={({ days, hours, minutes, seconds, completed }) =>
                    completed ? (
                      <span className="text-red-600 dark:text-red-400 font-semibold">Expired</span>
                    ) : (
                      <span>{`${days}d ${hours}h ${minutes}m ${seconds}s remaining`}</span>
                    )
                  }
                />
              </span>
            ) : (
              <span className="text-red-600 dark:text-red-400 font-semibold">Expired</span>
            )}
          </p>
        </div>

        {/* Notes Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-[#ff6347] dark:text-[#ffa500]">Notes</h3>

          {/* Notes */}
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
            {notes.length === 0 ? (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">No notes yet.</p>
            ) : (
              notes.map((note) => (
                <div
                  key={note._id || note.postedAt}
                  className="border border-gray-300 dark:border-zinc-700 rounded-md p-3 bg-gray-50 dark:bg-zinc-800 shadow-sm dark:shadow-md"
                >
                  <p className="mb-2 text-gray-800 dark:text-gray-100">{note.note}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Posted on {new Date(note.postedAt).toLocaleString()} by {note.postedBy}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Add Note */}
          {isFoodCreator ? (
            <div className="mt-6">
              <h4 className="text-lg font-medium text-[#ff6347] dark:text-[#ffa500] mb-3">Add a Note</h4>
              <textarea
                className="w-full p-3 mb-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[#111827] dark:text-[#d1d5db] resize-none focus:outline-none focus:ring-2 focus:ring-[#ff6347] dark:focus:ring-[#ffa500]"
                rows={4}
                placeholder="Write your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <button
                onClick={handleAddNote}
                disabled={submitting || !newNote.trim()}
                className={`px-6 py-2 rounded-md text-white transition font-medium ${
                  !submitting && newNote.trim()
                    ? "bg-[#ff6347] hover:bg-[#e5533d] dark:bg-[#ffa500] dark:hover:bg-[#cc8400]"
                    : "bg-gray-400 dark:bg-zinc-700 cursor-not-allowed"
                }`}
              >
                {submitting ? (
                  <>
                    <span className="inline-block animate-spin mr-2">↻</span>
                    Adding...
                  </>
                ) : (
                  "Add Note"
                )}
              </button>
            </div>
          ) : (
            <div className="mt-4 flex items-start gap-2 p-3 bg-[#fffaf5] dark:bg-[#1f1f1f] border border-[#ff6347] dark:border-[#ffa500] rounded-md shadow-md dark:shadow-md">
              <MdInfoOutline className="text-[#ff6347] dark:text-[#ffa500] mt-0.5 text-lg" />
              <p className="text-[#ff6347] dark:text-[#ffa500] text-sm font-medium">
                {user
                  ? "You can only add notes to food items you added."
                  : "Please sign in to manage food items."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsPage;


import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/Provider/AuthProvider";
import Countdown from "react-countdown";

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
        const res = await fetch(`https://mehedi2.vercel.app/foods/${id}`, {
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
      // const token = localStorage.getItem("token");
      // if (!token) throw new Error("Authentication required");

      const res = await fetch(`https://mehedi2.vercel.app/foods/notes/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({
          note: newNote,
          postedBy: user.email,
          postedAt: new Date().toISOString(),
        }),
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

  if (loading) return <div className="text-center mt-12">Loading...</div>;
  if (error) return <div className="text-center mt-12 text-red-500">{error}</div>;
  if (!food) return <div className="text-center mt-12">Food not found.</div>;

  const isFoodCreator = user?.email === food?.userEmail;

  return (
    <div className="px-4 py-8 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 mb-8">
        {/* Food Image */}
        <img
          src={food.image}
          alt={food.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-food-image.jpg";
          }}
        />

        {/* Food Title */}
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">
          {food.title}
        </h2>

        {/* Food Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Category:</strong> {food.category}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Quantity:</strong> {food.quantity}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Expiry Date:</strong> {food.expiryDate}
            </p>
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Description:</strong>{" "}
              {food.description || "No description"}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Added Date:</strong> {food.addedDate}
            </p>
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">
              <strong>Added by:</strong> {food.userEmail || "Unknown"}
            </p>
          </div>
        </div>

        {/* Expiration Countdown */}
        <div className="mb-6 p-4 bg-gray-100 dark:bg-zinc-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Expiration Status:</strong>{" "}
            {new Date(food.expiryDate) > new Date() ? (
              <span className="text-green-700 dark:text-green-400 font-semibold">
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
          <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-400">
            Notes
          </h3>

          {/* Notes List */}
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
            {notes.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No notes yet.
              </p>
            ) : (
              notes.map((note) => (
                <div
                  key={note._id || note.postedAt}
                  className="border border-gray-300 dark:border-zinc-700 rounded-lg p-3 bg-gray-50 dark:bg-zinc-800"
                >
                  <p className="mb-2 text-gray-800 dark:text-gray-200">
                    {note.note}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Posted on: {new Date(note.postedAt).toLocaleString()} by{" "}
                    {note.postedBy}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Note Submission Section */}
          {isFoodCreator ? (
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3 text-green-700 dark:text-green-400">
                Add a Note
              </h4>
              <textarea
                className="w-full p-3 mb-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={4}
                placeholder="Write your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                aria-label="Add note about this food item"
              />
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <button
                onClick={handleAddNote}
                disabled={submitting || !newNote.trim()}
                className={`px-6 py-2 rounded-lg text-white transition ${
                  !submitting && newNote.trim()
                    ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                    : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                }`}
                aria-disabled={submitting || !newNote.trim()}
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
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-700 dark:text-blue-300">
                {user
                  ? "You can only add notes to food items you've added."
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


import { useState } from "react";
import { useAuthState} from "react-firebase-hooks/auth";
import { auth } from "../context/firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState(null);

  if (loading) return <p className="text-center mt-20 text-gray-600 dark:text-gray-300 text-lg">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, {
        displayName: name || user.displayName,
        photoURL: photoURL || user.photoURL,
      });

      
Swal.fire({
  title: "Profile updated successfully!",
  icon: "success",
  draggable: true
});

      setName("");
      setPhotoURL("");
      setError(null);
    } catch (err) {
      setError(err.message);
      // toast.error("Failed to update profile!");

Swal.fire({
  title: "Failed to update profile!",
  icon: "error",
  draggable: true
});
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/5r5C1fJ/user.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-green-500 dark:border-green-400 shadow-md object-cover"
          />
          <h2 className="mt-4 text-3xl font-semibold text-green-600 dark:text-green-400">
            {user?.displayName || "Anonymous"}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 mt-1">{user.email}</p>
        </div>

        <form onSubmit={handleSave} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-100 dark:bg-red-700 bg-opacity-80 text-red-700 dark:text-red-300 p-2 rounded-md text-sm text-center transition-colors duration-500">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new name"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div>
            <label
              htmlFor="photoURL"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Photo URL
            </label>
            <input
              id="photoURL"
              type="url"
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter new photo URL"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold py-3 rounded-md shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={false}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

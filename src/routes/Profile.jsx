import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../context/firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import  Loading  from '../Components/Loading';

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState(null);

  if (loading)
    return (
      < Loading/>
    );

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
        confirmButtonColor: "#ff6347",
      });

      setName("");
      setPhotoURL("");
      setError(null);
    } catch (err) {
      setError(err.message);
      Swal.fire({
        title: "Failed to update profile!",
        icon: "error",
        confirmButtonColor: "#ff6347",
      });
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-[#fffaf5] dark:bg-[#1f1f1f] px-4 py-12 transition-colors duration-500  ">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 text-[#111827] dark:text-[#d1d5db] transition-colors duration-500 shadow-[0_4px_20px_rgba(255,99,71,0.3)] (light)
dark:shadow-[0_4px_20px_rgba(255,165,0,0.5)] (dark)">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/5r5C1fJ/user.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-[#ff6347] dark:border-[#ffa500] shadow-md object-cover"
          />
          <h2 className="mt-4 text-2xl font-bold text-[#ff6347] dark:text-[#ffa500]">
            {user?.displayName || "Anonymous"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {user.email}
          </p>
        </div>

        <form onSubmit={handleSave} className="mt-8 space-y-5">
          {error && (
            <div className="bg-red-100 dark:bg-red-700 bg-opacity-80 text-red-700 dark:text-red-300 p-2 rounded-md text-sm text-center">
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
              className="w-full px-4 py-2 bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-gray-600 rounded-md text-[#111827] dark:text-[#d1d5db] focus:outline-none focus:ring-2 focus:ring-[#ff6347] dark:focus:ring-[#ffa500] transition"
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
              className="w-full px-4 py-2 bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-gray-600 rounded-md text-[#111827] dark:text-[#d1d5db] focus:outline-none focus:ring-2 focus:ring-[#ff6347] dark:focus:ring-[#ffa500] transition"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter new photo URL"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff6347] hover:bg-[#e5533d] dark:bg-[#ffa500] dark:hover:bg-[#cc8400] text-white dark:text-[#111827] font-semibold py-3 rounded-md shadow transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

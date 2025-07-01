import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../context/firebase/firebase.config";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const provider = new GoogleAuthProvider();

const Signup = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      const msg = "Password must contain uppercase, lowercase, and be at least 6 characters.";
      setError(msg);
      Swal.fire("Invalid Password", msg, "error");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });
      Swal.fire("Success", "Signup successful!", "success");
      navigate("/");
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      Swal.fire("Success", "Signed up with Google!", "success");
      navigate("/");
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <section className="min-h-screen bg-[#fffaf5] dark:bg-[#1f1f1f] transition-colors duration-500 flex items-center justify-center px-6 py-12">
      <div className="max-w-7xl w-full flex flex-col md:flex-row bg-white dark:bg-zinc-900 rounded-3xl shadow-lg dark:shadow-2xl overflow-hidden">
        {/* Illustration - left side */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-[#ff6347]/30 to-[#ffa500]/20 items-center justify-center p-12">
          <img
            src="https://i.ibb.co/nMt5Tvrp/Update-bro.png"
            alt="Signup Illustration"
            className="max-w-full max-h-[400px] rounded-lg drop-shadow-xl"
            loading="lazy"
          />
        </div>

        {/* Signup form */}
        <form
          onSubmit={handleSignup}
          className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center space-y-6 text-[#111827] dark:text-[#d1d5db]"
        >
          <h2 className="text-4xl font-extrabold text-center text-[#ff6347] dark:text-[#ffa500] mb-8 tracking-wide">
            Sign Up
          </h2>

          {error && (
            <p className="text-sm text-center text-red-600 dark:text-red-400">{error}</p>
          )}

          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full dark:bg-zinc-700 dark:text-white focus:border-[#ff6347] focus:ring-1 focus:ring-[#ff6347] rounded-lg py-3 px-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="url"
            placeholder="Photo URL (optional)"
            className="input input-bordered w-full dark:bg-zinc-700 dark:text-white focus:border-[#ff6347] focus:ring-1 focus:ring-[#ff6347] rounded-lg py-3 px-4"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full dark:bg-zinc-700 dark:text-white focus:border-[#ff6347] focus:ring-1 focus:ring-[#ff6347] rounded-lg py-3 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full pr-10 dark:bg-zinc-700 dark:text-white focus:border-[#ff6347] focus:ring-1 focus:ring-[#ff6347] rounded-lg py-3 px-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#ff6347] hover:bg-[#e5533d] text-white font-semibold dark:bg-[#ffa500] dark:hover:bg-[#cc8400] dark:text-[#1f1f1f] transition duration-200"
          >
            Sign Up
          </button>

          <div className="relative flex items-center justify-center text-gray-400 dark:text-zinc-500 my-4">
            <span className="border-b border-gray-300 dark:border-zinc-700 w-full absolute left-0"></span>
            <span className="relative bg-[#fffaf5] dark:bg-[#1f1f1f] px-4 text-sm font-semibold text-[#ff6347] dark:text-[#ffa500]">
              OR
            </span>
            <span className="border-b border-gray-300 dark:border-zinc-700 w-full absolute right-0"></span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full py-3 rounded-md border-2 border-[#ff6347] text-[#ff6347] font-semibold hover:bg-[#ff6347] hover:text-white dark:border-[#ffa500] dark:text-[#ffa500] dark:hover:bg-[#ffa500] dark:hover:text-[#1f1f1f] transition duration-200"
          >
            Continue with Google
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#ff6347] dark:text-[#ffa500] font-medium hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;

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
    <div className="mt-2 p-4 md:p-10 flex justify-center items-center min-h-screen
      bg-gradient-to-r from-[#ffe5d9] to-[#ffd6a5] 
      dark:bg-gray-900"
    >
      <form
        onSubmit={handleSignup}
        className="card w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl dark:shadow-[0_0_15px_rgba(255,165,0,0.6)] p-8 rounded-xl space-y-5"
      >
        <h2
          className="text-3xl font-bold text-center
            text-[#ff6347] dark:text-[#ffa500]"
        >
          Register
        </h2>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full
            dark:bg-gray-800 dark:border-gray-600 dark:text-white
            focus:border-[#ff6347] focus:ring focus:ring-[#ff6347]/50"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="url"
          placeholder="Profile Image URL"
          className="input input-bordered w-full
            dark:bg-gray-800 dark:border-gray-600 dark:text-white
            focus:border-[#ff6347] focus:ring focus:ring-[#ff6347]/50"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full
            dark:bg-gray-800 dark:border-gray-600 dark:text-white
            focus:border-[#ff6347] focus:ring focus:ring-[#ff6347]/50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-10
              dark:bg-gray-800 dark:border-gray-600 dark:text-white
              focus:border-[#ff6347] focus:ring focus:ring-[#ff6347]/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer
              text-gray-500 dark:text-[#ffa500]"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

       
        <button
          type="submit"
          className="w-full py-2 rounded-md
            bg-[#ff6347] text-white font-semibold
            hover:bg-[#e5533c] dark:bg-[#ffa500] dark:text-gray-900 dark:hover:bg-[#cc8400]
            transition-colors duration-200"
        >
          Sign Up
        </button>

        <div className="divider dark:before:bg-[#ffa500] dark:after:bg-[#ffa500]">OR</div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full py-2 rounded-md border-2
            border-[#ff6347] text-[#ff6347] font-semibold
            hover:bg-[#ff6347] hover:text-white
            dark:border-[#ffa500] dark:text-[#ffa500]
            dark:hover:bg-[#ffa500] dark:hover:text-gray-900
            transition-colors duration-200"
        >
          Continue with Google
        </button>

        

        <p
          className="text-sm text-center
            text-[#ff6347] dark:text-[#ffa500]"
        >
          Already have an account?{" "}
          <a href="/login" className="hover:underline font-semibold">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;

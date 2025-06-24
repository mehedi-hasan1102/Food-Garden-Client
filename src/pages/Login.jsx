import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../context/firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase, one lowercase, and be at least 6 characters."
      );
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      Swal.fire({
        icon: "success",
        title: "Logged in with Google!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
      });
    }
  };

  const resetPassword = () => {
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Missing Email",
        text: "Please enter your email first.",
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Reset Email Sent",
          text: "Check your inbox for instructions.",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed to Send Email",
          text: err.message,
        });
      });
  };

  return (
    <div className="mt-2 p-4 md:p-10 flex justify-center items-center min-h-screen bg-gradient-to-r from-[#ffe5d9] to-[#ffd6a5] dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleLogin}
        className="card w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl p-8 rounded-xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-[#ff6347] dark:text-[#ffa500]">Login</h2>
        {error && <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full dark:bg-gray-800 dark:text-white focus:border-[#ff6347] focus:ring-1 focus:ring-[#ff6347]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-10 dark:bg-gray-800 dark:text-white focus:border-[#ff6347] focus:ring-1 focus:ring-[#ff6347]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={resetPassword}
            className="text-sm text-[#ff6347] dark:text-[#ffa500] hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md
            bg-[#ff6347] text-white font-semibold
            hover:bg-[#e5533c] dark:bg-[#ffa500] dark:text-gray-900 dark:hover:bg-[#cc8400]
            transition-colors duration-200"
        >
          Login
        </button>

        <div className="divider dark:before:bg-gray-700 dark:after:bg-gray-700">OR</div>

        
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2 rounded-md border-2
            border-[#ff6347] text-[#ff6347] font-semibold
            hover:bg-[#ff6347] hover:text-white
            dark:border-[#ffa500] dark:text-[#ffa500]
            dark:hover:bg-[#ffa500] dark:hover:text-gray-900
            transition-colors duration-200"
        >
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-[#ff6347] dark:text-[#ffa500] font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;

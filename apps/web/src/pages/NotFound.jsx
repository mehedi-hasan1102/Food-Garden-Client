import { Link } from "react-router-dom";
import Switch from "../Components/DarkModeSidebar";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fffaf5] dark:bg-[#1f1f1f] text-center px-4 transition-colors duration-500">
      
      <h1 className="text-6xl font-extrabold text-[#ff6347] dark:text-[#ffa500] mb-2">
        404
      </h1>

      <h2 className="text-2xl font-semibold text-[#111827] dark:text-[#d1d5db] mb-2">
        Oops! Page not found.
      </h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        The page you’re looking for doesn’t exist, is growing elsewhere, or might have been pruned.
      </p>

      <Link
        to="/"
        className="inline-block px-6 py-3 rounded-full font-medium bg-[#ff6347] text-white hover:bg-[#e5533d]
          dark:bg-[#ffa500] dark:text-[#1f1f1f] dark:hover:bg-[#cc8400] transition-colors duration-200"
      >
        Go Back Home
      </Link>

      <div className="mt-6">
        <Switch />
      </div>
    </div>
  );
};

export default NotFound;

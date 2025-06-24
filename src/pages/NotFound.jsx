import { Link } from "react-router-dom";
import Switch from "../Components/DarkModeSidebar";

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 text-center px-4">
        
        <h1 className="text-6xl font-bold text-[#ff6347] dark:text-[#ffa500] mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Oops! Page not found.
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md">
          The page you’re looking for doesn’t exist, is growing elsewhere, or might have been pruned.
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-[#ff6347] text-white rounded-full
            hover:bg-[#e5533c] dark:bg-[#ffa500] dark:text-gray-900 dark:hover:bg-[#cc8400]
            transition mb-4"
        >
          Go Back Home
        </Link>

        {/* Dark Mode Toggle under the button */}
        <div className="mt-2">
          <Switch />
        </div>
      </div>
    </>
  );
};

export default NotFound;

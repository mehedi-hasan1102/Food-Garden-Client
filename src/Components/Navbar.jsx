import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Provider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { GiFoodTruck } from "react-icons/gi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Switch from "./DarkModeSidebar";
import Swal from "sweetalert2";
import Tooltip from "./tooltip";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff6347",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      try {
        await logout();
        Swal.fire({
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire("Oops!", `Logout failed: ${error.message}`, "error");
      }
    }
  };

  const navItems = (
    <>
      <li>
        <Tooltip message="Home Page">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-[#ffa500] dark:hover:text-[#ff6347] ${
                isActive
                  ? "text-[#ff6347] dark:text-[#ffa500] font-semibold"
                  : ""
              }`
            }
          >
            Home
          </NavLink>
        </Tooltip>
      </li>
      <li>
        <Tooltip message="See all available food items">
          <NavLink
            to="/fridge"
            className={({ isActive }) =>
              `hover:text-[#ffa500] dark:hover:text-[#ff6347] ${
                isActive
                  ? "text-[#ff6347] dark:text-[#ffa500] font-semibold"
                  : ""
              }`
            }
          >
            Fridge
          </NavLink>
        </Tooltip>
      </li>
      {user && (
        <>
          <li>
            <Tooltip message="Add new food item">
              <NavLink
                to="/add-foods"
                className={({ isActive }) =>
                  `hover:text-[#ffa500] dark:hover:text-[#ff6347] ${
                    isActive
                      ? "text-[#ff6347] dark:text-[#ffa500] font-semibold"
                      : ""
                  }`
                }
              >
                Add Food
              </NavLink>
            </Tooltip>
          </li>
          <li>
            <Tooltip message="View your items">
              <NavLink
                to="/my-foods"
                className={({ isActive }) =>
                  `hover:text-[#ffa500] dark:hover:text-[#ff6347] ${
                    isActive
                      ? "text-[#ff6347] dark:text-[#ffa500] font-semibold"
                      : ""
                  }`
                }
              >
                My Items
              </NavLink>
            </Tooltip>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-[#ffa500] backdrop-blur-xl shadow-md transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 text-2xl font-bold text-[#ff6347] dark:text-[#ffa500]">
            <GiFoodTruck />

            <h1>Food Garden</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:space-x-8 lg:flex-1 lg:justify-center">
            <ul className="flex space-x-8 text-lg font-medium dark:text-white">
              {navItems}
            </ul>
          </div>

          {/* Right Controls */}

          <div className="flex items-center gap-3">
            <Switch />

            {!user ? (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="btn btn-outline btn-sm dark:border-white dark:text-white dark:hover:bg-[gray]"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="btn bg-[#ff6347] hover:bg-[#e5533d] btn-sm text-white dark:bg-[#ffa500] dark:hover:bg-[#cc8400]"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Tooltip message={user.displayName || "User"}>
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-9 h-9 rounded-full ring-2 ring-[#ff6347]"
                  />
                </Tooltip>
                <Tooltip message="Logout">
                  <button
                    onClick={handleLogout}
                    className="btn btn-ghost btn-circle text-red-500 dark:text-red-400"
                    aria-label="Logout"
                  >
                    <FiLogOut />
                  </button>
                </Tooltip>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden ml-1">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-md text-[#ff6347] dark:text-[#ffa500] hover:bg-[#ffe5d9] dark:hover:bg-[#522e2e] focus:outline-none"
              >
                {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white dark:bg-gray-900 border-t border-[#ffa500] transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="space-y-2 px-4 text-lg font-medium dark:text-white">
          {navItems}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

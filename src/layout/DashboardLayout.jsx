
import { Outlet, NavLink, Link } from "react-router-dom";
import { useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlineListAlt,
  MdOutlineAddBox,
  MdOutlineInventory,
  MdOutlinePerson,
  MdHome,
} from "react-icons/md";
import { GiFoodTruck } from "react-icons/gi";
import Switch from "../Components/DarkModeSidebar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { to: "/dashboard", label: "Overview", icon: <MdOutlineDashboard size={22} /> },
    { to: "/dashboard/all-foods", label: "All Foods", icon: <MdOutlineListAlt size={22} /> },
    { to: "/dashboard/add-food", label: "Add Food", icon: <MdOutlineAddBox size={22} /> },
    { to: "/dashboard/my-foods", label: "My Foods", icon: <MdOutlineInventory size={22} /> },
    { to: "/dashboard/user-profile", label: "User Profile", icon: <MdOutlinePerson size={22} /> },
  ];

  return (
    <div
      className={`min-h-screen flex
        bg-[#fffaf5] dark:bg-[#1f1f1f]
        transition-colors duration-300`}
    >
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white dark:bg-[#1f1f1f] border-r-2 border-[#ff6347] dark:border-[#ffa500] p-5 flex flex-col justify-between transition-all duration-300 rounded-md`}
      >
        {/* Top: Logo & Collapse */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-[#ff6347] dark:text-[#ffa500]"
            >
              <GiFoodTruck size={28} />
              {!collapsed && (
                <span className="text-2xl font-bold tracking-wide select-none">
                  FoodGarden
                </span>
              )}
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-[#ff6347] dark:text-[#ffa500] text-lg font-bold select-none rounded-md hover:bg-[#e5533d] dark:hover:bg-[#cc8400] transition px-2 py-1"
              aria-label="Toggle sidebar"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? "»" : "«"}
            </button>
          </div>

          {/* Home Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md mb-4 text-lg font-medium
              transition-colors hover:bg-[#e5533d] dark:hover:bg-[#cc8400] ${
                isActive
                  ? "bg-[#ff6347] dark:bg-[#ffa500] font-bold text-white dark:text-[#1f1f1f]"
                  : "text-[#111827] dark:text-[#d1d5db]"
              }`
            }
          >
            <MdHome size={22} />
            {!collapsed && "Home"}
          </NavLink>

          {/* Dashboard Navigation */}
          <nav className="space-y-3">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md text-lg font-medium
                  transition-colors hover:bg-[#e5533d] dark:hover:bg-[#cc8400] ${
                    isActive
                      ? "bg-[#ff6347] dark:bg-[#ffa500] font-bold text-white dark:text-[#1f1f1f]"
                      : "text-[#111827] dark:text-[#d1d5db]"
                  }`
                }
              >
                {icon}
                {!collapsed && label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom: Dark Mode Toggle */}
        <div className="pt-6 border-t border-[#ff6347] dark:border-[#ffa500] flex justify-center">
          {!collapsed && <Switch />}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1  overflow-y-auto
        text-[#111827] dark:text-[#d1d5db]
        bg-[#fffaf5] dark:bg-[#1f1f1f]
        transition-colors duration-300"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

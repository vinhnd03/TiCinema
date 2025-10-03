import { Link, useNavigate } from "react-router-dom";
import {
  FaFilm,
  FaUsers,
  FaTicketAlt,
  FaCogs,
  FaChartLine,
  FaBars,
  FaChevronDown,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [openMovieMenu, setOpenMovieMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-4 text-orange-500 border-b border-gray-800 ">
        <div className="flex items-center space-x-2">
          {!collapsed && (
            <Link
              to="/"
              className="flex items-center space-x-2 hover:text-white"
            >
              <FaFilm className="w-6 h-6" />
              {!collapsed && <span className="font-bold">TiCinema Admin</span>}
            </Link>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-orange-500 flex mr-4"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-6 space-y-2">
        <Link
          to="/admin/dashboard"
          className={`flex items-center ${
            collapsed ? "justify-center" : ""
          } px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-orange-500`}
        >
          <FaChartLine className={`${collapsed ? "" : "mr-2"}`} />
          {!collapsed && "Dashboard"}
        </Link>
        {/* Quản lý phim */}
        <button
          onClick={() => setOpenMovieMenu(!openMovieMenu)}
          className={`flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-orange-500`}
        >
          <div className="flex items-center">
            <FaFilm className={`${collapsed ? "mx-auto" : "mr-2"}`} />
            {!collapsed && "Quản lý phim"}
          </div>
          {!collapsed && (
            <FaChevronDown
              className={`transition-transform ${
                openMovieMenu ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {openMovieMenu && !collapsed && (
          <div className="ml-8 space-y-3">
            <Link
              to="/admin/movies"
              className="block text-gray-300 hover:text-orange-500"
            >
              Danh sách phim
            </Link>
            <Link
              to="/admin/movies/new"
              className="block text-gray-300 hover:text-orange-500"
            >
              Thêm phim mới
            </Link>
          </div>
        )}
        <Link
          to="/admin/showtimes"
          className={`flex items-center ${
            collapsed ? "justify-center" : ""
          } px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-orange-500`}
        >
          <FaTicketAlt className={`${collapsed ? "" : "mr-2"}`} />
          {!collapsed && "Lịch chiếu"}
        </Link>
        <Link
          to="/admin/users"
          className={`flex items-center ${
            collapsed ? "justify-center" : ""
          } px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-orange-500`}
        >
          <FaUsers className={`${collapsed ? "" : "mr-2"}`} />
          {!collapsed && "Người dùng"}
        </Link>
        <Link
          to="/admin/settings"
          className={`flex items-center ${
            collapsed ? "justify-center" : ""
          } px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-orange-500`}
        >
          <FaCogs className={`${collapsed ? "" : "mr-2"}`} />
          {!collapsed && "Cài đặt"}
        </Link>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            collapsed ? "justify-center" : ""
          } w-full px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-orange-500`}
        >
          <FiLogOut className={`${collapsed ? "" : "mr-2"}`} />
          {!collapsed && "Đăng xuất"}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

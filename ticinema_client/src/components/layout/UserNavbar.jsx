import { useEffect, useRef, useState } from "react";
import { FaFilm, FaLock, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdAdminPanelSettings, MdClose, MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import authService from "../../services/authService";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // PC dropdown
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Đóng dropdown khi click ra ngoài (PC)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Đóng mobile menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogout = async () => {
    // await authService.logout();
    await logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-orange-500 font-bold text-xl">
          <FaFilm className="w-6 h-6" />
          <span>TiCinema</span>
        </div>

        {/* Menu PC */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li className="hover:text-orange-500 cursor-pointer">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="hover:text-orange-500 cursor-pointer">Phim</li>
          <li className="hover:text-orange-500 cursor-pointer">Lịch chiếu</li>
          <li className="hover:text-orange-500 cursor-pointer">Khuyến mãi</li>
          <li className="hover:text-orange-500 cursor-pointer">Liên hệ</li>
        </ul>

        {/* PC: khu vực tài khoản */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          {!isAuthenticated ? (
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-2xl shadow">
              <Link to={"/login"}>Đăng nhập</Link>
            </button>
          ) : (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={user.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full border-2 border-orange-500"
              />
              <span className="font-medium">{user.name}</span>
              <IoIosArrowDropdownCircle className="w-5 h-5 text-orange-500" />
            </div>
          )}

          {/* Dropdown PC */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
              {user?.role?.name === "ADMIN" && (
                <Link to={"/admin"} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                  <FaLock className="w-4 h-4 mr-2 text-orange-500" /> Quản trị
                </Link>
              )}
              <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                <FaUser className="w-4 h-4 mr-2 text-orange-500" /> Hồ sơ
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => handleLogout()}
              >
                <FiLogOut className="w-4 h-4 mr-2 text-orange-500" /> Đăng xuất
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-orange-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-black px-4 pb-4 fixed pt-4 left-0 w-full z-40 shadow-lg"
        >
          <ul className="space-y-3 font-medium">
            <li className="hover:text-orange-500 cursor-pointer">Trang chủ</li>
            <li className="hover:text-orange-500 cursor-pointer">Phim</li>
            <li className="hover:text-orange-500 cursor-pointer">Lịch chiếu</li>
            <li className="hover:text-orange-500 cursor-pointer">Khuyến mãi</li>
            <li className="hover:text-orange-500 cursor-pointer">Liên hệ</li>
          </ul>

          {!isAuthenticated ? (
            <button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-2xl shadow">
              Đăng nhập
            </button>
          ) : (
            <div className="mt-6 border-t border-gray-700 pt-4 space-y-3">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-orange-500"
                />
                <span className="font-medium">{user.name}</span>
              </div>
              <button className="flex items-center w-full px-2 py-2 text-sm hover:text-orange-500">
                <FaUser className="w-4 h-4 mr-2 text-orange-500" /> Hồ sơ
              </button>
              <button className="flex items-center w-full px-2 py-2 text-sm hover:text-orange-500">
                <FiLogOut className="w-4 h-4 mr-2 text-orange-500" /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;

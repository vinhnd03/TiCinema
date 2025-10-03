import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaFilm } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const UserFooter = () => {
  return (
    <footer className="bg-black text-gray-300">
     <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + mô tả */}
        <div>
          <div className="flex items-center space-x-2 text-orange-500 font-bold text-xl mb-4">
            <FaFilm className="w-6 h-6" />
            <span>TiCinema</span>
          </div>
          <p className="text-sm leading-relaxed">
            TiCinema mang đến trải nghiệm đặt vé xem phim trực tuyến nhanh
            chóng, tiện lợi với nhiều ưu đãi hấp dẫn.
          </p>
        </div>

        {/* Menu nhanh */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Khám phá</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">Trang chủ</li>
            <li className="hover:text-orange-500 cursor-pointer">Phim</li>
            <li className="hover:text-orange-500 cursor-pointer">Lịch chiếu</li>
            <li className="hover:text-orange-500 cursor-pointer">Khuyến mãi</li>
            <li className="hover:text-orange-500 cursor-pointer">Liên hệ</li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Liên hệ</h3>

          <div className="space-y-2">
            <div className="flex items-center text-sm space-x-2">
              <span>
                <FaMapMarkerAlt />
              </span>
              <span>123 Đường ABC, Quận 1, TP. HCM</span>
            </div>
            <div className="flex items-center text-sm space-x-2">
              <span>
                <FaPhoneAlt />
              </span>
              <span>0123 456 789</span>
            </div>
            <div className="flex items-center text-sm space-x-2">
              <span>
                <IoMdMail />
              </span>
              <span>support@ticinema.com</span>
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="p-2 bg-orange-500 rounded-full hover:bg-orange-600"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-orange-500 rounded-full hover:bg-orange-600"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-orange-500 rounded-full hover:bg-orange-600"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} TiCinema. All rights reserved.
      </div>
    </footer>
  );
};

export default UserFooter;

import { FaFilm, FaUsers, FaTicketAlt, FaMoneyBillWave } from "react-icons/fa";

const DashBoard = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold text-orange-500 mb-6">
        📊 Bảng điều khiển (Dashboard)
      </h1>

      {/* Cards thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center space-x-4">
            <FaFilm className="text-orange-500 text-3xl" />
            <div>
              <p className="text-sm text-gray-400">Tổng số phim</p>
              <h2 className="text-xl font-bold">120</h2>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-orange-500 text-3xl" />
            <div>
              <p className="text-sm text-gray-400">Người dùng</p>
              <h2 className="text-xl font-bold">4,560</h2>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center space-x-4">
            <FaTicketAlt className="text-orange-500 text-3xl" />
            <div>
              <p className="text-sm text-gray-400">Vé đã bán</p>
              <h2 className="text-xl font-bold">9,876</h2>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center space-x-4">
            <FaMoneyBillWave className="text-orange-500 text-3xl" />
            <div>
              <p className="text-sm text-gray-400">Doanh thu</p>
              <h2 className="text-xl font-bold">$45,000</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng demo */}
      <div className="bg-gray-900 rounded-2xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-orange-500">🎬 Phim mới nhất</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-6 py-3">Tên phim</th>
              <th className="px-6 py-3">Thể loại</th>
              <th className="px-6 py-3">Ngày chiếu</th>
              <th className="px-6 py-3">Vé đã bán</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-800 transition">
              <td className="px-6 py-3">Avengers: Endgame</td>
              <td className="px-6 py-3">Hành động</td>
              <td className="px-6 py-3">2025-09-30</td>
              <td className="px-6 py-3">1200</td>
            </tr>
            <tr className="hover:bg-gray-800 transition">
              <td className="px-6 py-3">Frozen 3</td>
              <td className="px-6 py-3">Hoạt hình</td>
              <td className="px-6 py-3">2025-10-05</td>
              <td className="px-6 py-3">850</td>
            </tr>
            <tr className="hover:bg-gray-800 transition">
              <td className="px-6 py-3">Oppenheimer</td>
              <td className="px-6 py-3">Lịch sử</td>
              <td className="px-6 py-3">2025-10-10</td>
              <td className="px-6 py-3">430</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoard;

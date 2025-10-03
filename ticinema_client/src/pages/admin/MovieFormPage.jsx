import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieFormPage = () => {
  const { id } = useParams(); // nếu có id → edit
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    duration: "",
    releaseDate: "",
  });

  // Giả lập load dữ liệu khi edit
  useEffect(() => {
    if (id) {
      // gọi API backend để lấy dữ liệu
      setFormData({
        title: "Avengers: Endgame",
        genre: "Action",
        duration: 180,
        releaseDate: "2019-04-26",
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      console.log("Cập nhật phim:", formData);
    } else {
      console.log("Thêm phim:", formData);
    }
    navigate("/admin/movies");
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
      <h2 className="text-xl font-semibold text-orange-500 mb-4">
        {id ? "Sửa phim" : "Thêm phim mới"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300">Tên phim</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-black border border-gray-700 text-white focus:outline-none focus:border-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Thể loại</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-black border border-gray-700 text-white focus:outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-gray-300">Thời lượng (phút)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-black border border-gray-700 text-white focus:outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-gray-300">Ngày phát hành</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-black border border-gray-700 text-white focus:outline-none focus:border-orange-500"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          {id ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>
    </div>
  );
};

export default MovieFormPage;

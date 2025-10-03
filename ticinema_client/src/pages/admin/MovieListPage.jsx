import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieListPage = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Avengers: Endgame", genre: "Action", duration: 180, releaseDate: "2019-04-26" },
    { id: 2, title: "Joker", genre: "Drama", duration: 122, releaseDate: "2019-10-04" },
  ]);

  const handleDelete = (id) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
      <h2 className="text-xl font-semibold text-orange-500 mb-4">Danh sách phim</h2>
      <div className="mb-4">
        <Link
          to="/admin/movies/new"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          + Thêm phim mới
        </Link>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-800 text-gray-300">
            <th className="p-2">Tên phim</th>
            <th className="p-2">Thể loại</th>
            <th className="p-2">Thời lượng</th>
            <th className="p-2">Ngày phát hành</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id} className="border-b border-gray-800 hover:bg-gray-800">
              <td className="p-2">{movie.title}</td>
              <td className="p-2">{movie.genre}</td>
              <td className="p-2">{movie.duration} phút</td>
              <td className="p-2">{movie.releaseDate}</td>
              <td className="p-2 flex space-x-3">
                <Link to={`/admin/movies/edit/${movie.id}`} className="text-blue-400 hover:text-blue-500">
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieListPage;

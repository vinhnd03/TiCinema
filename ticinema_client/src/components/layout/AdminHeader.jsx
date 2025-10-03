import { useAuth } from "../../contexts/AuthContext";

const AdminHeader = () => {
  const { user } = useAuth();

  return (
    <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      {/* Bên trái: Tiêu đề */}
      <h1 className="text-lg font-semibold text-orange-500">Trang quản trị</h1>

      {/* Bên phải: User info */}
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-300">
          {user.name}
        </span>
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=FF7F50&color=fff`}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default AdminHeader;

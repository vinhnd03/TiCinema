import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const location = useLocation();

  const isErrorPage = ["/not-found"].includes(location.pathname);
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  const shouldShowSidebar = !isErrorPage && !isAuthPage;
  const shouldShowHeader = !isErrorPage && !isAuthPage;

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar trái */}
      {shouldShowSidebar && <AdminSidebar />}

      {/* Phần nội dung bên phải */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {shouldShowHeader && <AdminHeader />}
        <main className="flex-1 p-6 bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

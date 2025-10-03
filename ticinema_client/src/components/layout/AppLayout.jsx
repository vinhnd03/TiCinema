import { Outlet, useLocation } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";
const AppLayout = () => {
  const location = useLocation();

  const isAuthPage = [
    // "/login",
    // "/register",
    "/reset-password",
    "/forgot-password",
    "/verification",
  ].includes(location.pathname);

  const isAdminPage = location.pathname.startsWith("/admin");
  const isLegalPage = ["/terms", "/privacy"].includes(location.pathname);
  const isErrorPage = ["/not-found"].includes(location.pathname);

  const shouldShowNavbar =
    !isAuthPage && !isAdminPage && !isLegalPage && !isErrorPage;

  const shouldShowFooter = !isAuthPage && !isAdminPage && !isErrorPage;

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto">
      {shouldShowNavbar && <UserNavbar />}
      <main className="flex-1 mt-12 bg-black">
        <Outlet />
      </main>
      {shouldShowFooter && <UserFooter />}
    </div>
  );
};

export default AppLayout;

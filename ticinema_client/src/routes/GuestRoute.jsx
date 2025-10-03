import { Navigate } from "react-router-dom";
import Preloader from "../components/ui/Preloader";
import { useAuth } from "../contexts/AuthContext";

const GuestRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <Preloader />;

  if (isAuthenticated) {
    return user.role.name === "ADMIN" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return children;
};

export default GuestRoute;

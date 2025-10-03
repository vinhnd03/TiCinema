import { Navigate } from "react-router-dom";
import Preloader from "../components/ui/Preloader";
import { useAuth } from "../contexts/AuthContext"

const AdminRoute = ({children}) => {
    const {user, isAuthenticated, loading} = useAuth();

    if(loading) {
        return <Preloader />;
    }

    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace />
    }

    if (user.role.name !== "ADMIN") {
        return <Navigate to={"/unauthorized"} replace />
    }

    return children;
}

export default AdminRoute;
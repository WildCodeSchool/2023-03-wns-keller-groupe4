import { Navigate, Outlet, useLocation } from "react-router-dom";
import { decodeToken, getAccessToken } from "./accessToken";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const token = getAccessToken();
    const location = useLocation();

    if (!token) {
        // If user is not authenticated, use the Navigate component to navigate to the login page
        return <Navigate to="/connect" state={{ from: location }} replace />;
    }

    const payload = decodeToken(token);

    if (!allowedRoles.includes(payload.role)) {
        // If the route is admin-only and the user is not an admin, use Navigate to navigate to a forbidden page or home
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // If user is authenticated and has the required role, render the route
    return <Outlet />;
};

export default ProtectedRoute;

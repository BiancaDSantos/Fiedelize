import { Navigate, useLocation } from "react-router-dom";
import { store } from "../store/store";

const PrivateRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    
    const state = store.getState();
    const isAuthenticated = state.auth.isAuthenticated;

    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login-page" state={{ from: location }} replace />;
    }
    return children;
};

export default PrivateRoute;
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import loadingRipple from "../assets/ripple-blue-thick.svg";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, userLoading } = useAuth();

    if (userLoading) {
        return (
            <div className="flex items-center justify-center space-x-2 z-[60]">
                <img src={loadingRipple} alt="Loading User..." />
            </div>
        )
    }

    if (user) {
        return children;
    }
    // return <Navigate to="/login" state={location?.pathname}></Navigate>
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;

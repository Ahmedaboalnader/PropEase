import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const token = Cookies.get('accessToken');

    if (!isAuthenticated && !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
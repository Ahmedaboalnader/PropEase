import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

export const useAuth = () => {
    const auth = useSelector((state) => state.auth);
    const storedUser = Cookies.get('user');

    return {
        user: auth.user || (storedUser ? JSON.parse(storedUser) : null),
        isAuthenticated: auth.isAuthenticated || !!Cookies.get('accessToken'),
        isVerified: auth.isVerified || !!Cookies.get('accessToken'),
        accessToken: auth.accessToken || Cookies.get('accessToken'),
        refreshToken: auth.refreshToken || Cookies.get('refreshToken')
    };
};
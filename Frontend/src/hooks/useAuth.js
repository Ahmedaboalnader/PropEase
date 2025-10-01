import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useGetAccountQuery } from '../Store/Account/accountApi';

export const useAuth = () => {
    const auth = useSelector((state) => state.auth);
    const isAuthenticated = auth.isAuthenticated || !!Cookies.get('accessToken');
    
    const { data: getAccount } = useGetAccountQuery(undefined, {
        skip: !isAuthenticated
    });

    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    
    return {
        user: getAccount,
        userChecked: user,
        isAuthenticated,
        isVerified: auth.isVerified || !!Cookies.get('accessToken'),
        accessToken: auth.accessToken || Cookies.get('accessToken'),
        refreshToken: auth.refreshToken || Cookies.get('refreshToken')
    };
};
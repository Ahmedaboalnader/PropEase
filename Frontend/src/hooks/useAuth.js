import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useGetAccountQuery } from '../Store/Account/accountApi';

export const useAuth = () => {
    const auth = useSelector((state) => state.auth);
    const isAuthenticated = auth.isAuthenticated || !!Cookies.get('accessToken');
    
    const { data: getAccount } = useGetAccountQuery(undefined, {
        skip: !isAuthenticated
    });
    
    return {
        user: getAccount,
        isAuthenticated,
        isVerified: auth.isVerified || !!Cookies.get('accessToken'),
        accessToken: auth.accessToken || Cookies.get('accessToken'),
        refreshToken: auth.refreshToken || Cookies.get('refreshToken')
    };
};
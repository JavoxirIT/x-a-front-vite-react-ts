import { type ReactNode } from 'react';
import useLocalStorage from '../Hook/useLocalStorage';
import { Navigate } from 'react-router-dom';

const Redirect = ({ children }: { children: ReactNode }) => {
    const [token] = useLocalStorage('', 'token');

    return !token ? <Navigate to='/login' /> : children;
};

export default Redirect;

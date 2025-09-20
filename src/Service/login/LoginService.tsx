import { LoginContext } from '../../Context/context';
import useCustomNavigate from '../../Hook/useCustomNavigate';
import useLocalStorage from '../../Hook/useLocalStorage';
import type { ILAuthData, ServiceProps } from '../../Interface/inteface';
import axiosInstance from '../../Config/axios';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

const LoginService = ({ children }: ServiceProps) => {
    const [, setLocal] = useLocalStorage('', 'token'); // accessToken
    const navigate = useCustomNavigate(null);

    async function handelAuth({ username, password }: ILAuthData) {
        try {
            const response = await axiosInstance.post(`login`, {
                username,
                password,
            });

            const { accessToken } = response.data;
            // console.log(response);
            if (response.status === 200) {
                setLocal(accessToken); // сохраняем accessToken
                navigate('/');
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                Swal.fire({
                    theme: 'auto',
                    title: error.response?.data.message,
                    timer: 2000,
                });
            }
        }
    }

    // обновление access токена через refresh (кука уйдёт сама)
    async function refreshAuth() {
        try {
            const res = await axiosInstance.post(
                '/refresh',
                {},
                { withCredentials: true }
            );

            const { accessToken } = res.data;
            setLocal(accessToken);

            return accessToken;
        } catch (err) {
            console.error('Refresh error', err);
            navigate('/login');
        }
    }

    async function logout() {
        try {
            const resonse = await axiosInstance.post(
                '/logout',
                {},
                { withCredentials: true }
            );
            const data = await resonse.data;
            if (resonse.status === 200) {
                console.log(data);
                setLocal('');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LoginContext value={{ handelAuth, refreshAuth, logout }}>
            {children}
        </LoginContext>
    );
};

export default LoginService;

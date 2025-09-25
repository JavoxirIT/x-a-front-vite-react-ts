import { LoginContext } from '../../Context/context';
import useCustomNavigate from '../../Hook/useCustomNavigate';
import useLocalStorage from '../../Hook/useLocalStorage';
import type { ILAuthData, ServiceProps } from '../../Interface/inteface';
import axiosInstance from '../../Config/axios';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import {
    confirmButtonColorOrange,
    no,
    save,
} from '../../Constant/textConstant';

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

    async function change() {
        const { value: formValues } = await Swal.fire({
            theme: 'auto',
            title: "Parol va Login o'zgartiramiz",
            confirmButtonColor: confirmButtonColorOrange,
            html: `
				<label>Yangi login</label>
					<br/>
				<input id="swal-login" inputmode="numeric" type="text" class="swal2-input" placeholder="Loginni kiriting">
					<br/>
				<label>Yangi parol</label>
					<br/>
				<input id="swal-password" type="text" class="swal2-input" placeholder="Izoh kiriting">`,
            focusConfirm: false,
            preConfirm: () => {
                const login = (
                    document.getElementById('swal-login') as HTMLInputElement
                ).value;
                const password = (
                    document.getElementById('swal-password') as HTMLInputElement
                ).value;

                if (!login) {
                    Swal.showValidationMessage('Login kiritish shart!');
                    return false;
                }
                if (!password) {
                    Swal.showValidationMessage('Parol kiritish shart!');
                    return false;
                }
                return { login, password };
            },
        });

        if (formValues) {
            Swal.fire({
                theme: 'auto',
                title: 'Ma`lumotlarni tekshiring',
                text: `Login: ${formValues.login}  Parol: ${formValues.password}`,
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: save,
                cancelButtonText: no,
                confirmButtonColor: confirmButtonColorOrange,
                cancelButtonColor: '#d33',
            }).then(async result => {
                if (result.isConfirmed) {
                    try {
                        const response = await axiosInstance.post('change', {
                            username: formValues.login,
                            password: formValues.password,
                        });
                        const data = await response.data;
                        if (response.status === 201) {
                            Swal.fire({
                                theme: 'auto',
                                title: data.message,
                                icon: 'success',
                                confirmButtonColor: confirmButtonColorOrange,
                            });
                            logout();
                        } else {
                            throw new Error(
                                `${response.status}: ${data.message}`
                            );
                        }
                    } catch (error) {
                        if (error instanceof Error) {
                            Swal.fire({
                                theme: 'auto',
                                title: error.name,
                                text: error.message,
                                icon: 'error',
                                confirmButtonColor: confirmButtonColorOrange,
                            });
                            return;
                        }
                        Swal.fire({
                            theme: 'auto',
                            title: String(error),
                            icon: 'error',
                            confirmButtonColor: confirmButtonColorOrange,
                        });
                    }
                }
            });
        }
    }

    return (
        <LoginContext value={{ handelAuth, refreshAuth, logout, change }}>
            {children}
        </LoginContext>
    );
};

export default LoginService;

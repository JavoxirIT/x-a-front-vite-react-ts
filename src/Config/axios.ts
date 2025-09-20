// api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // подхватит /api в dev и полный домен в prod
    withCredentials: true,
});

// Добавляем accessToken, если есть
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Функция обновления токена
async function refreshAuth() {
    const res = await axiosInstance.post(
        '/refresh',
        {},
        { withCredentials: true }
    );
    const { accessToken } = res.data;
    localStorage.setItem('token', JSON.stringify(accessToken));
    return accessToken;
}

// Перехват 401 → пробуем обновить токен
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAuth();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('❌ Refresh token expired', refreshError);
                localStorage.removeItem('token');
                // window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

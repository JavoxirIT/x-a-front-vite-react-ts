// import { useEffect, useRef } from 'react';
// import { axiosInstance } from '../Config/axios';
// import useLocalStorage from './useLocalStorage';

// const useAxiosPrivate = () => {
//     const [token] = useLocalStorage('', 'token');
//     const tokenRef = useRef(token);

//     useEffect(() => {
//         tokenRef.current = token;
//     }, [token]);

//     useEffect(() => {
//         // Request interceptor
//         const requestIntercept = axiosInstance.interceptors.request.use(
//             config => {
//                 config.headers.Authorization = `Bearer ${token}`;
//                 // Универсальная установка Content-Type
//                 if (config.data instanceof FormData) {
//                     // если FormData → пусть axios сам проставит boundary
//                     delete config.headers['Content-Type'];
//                 } else if (!config.headers['Content-Type']) {
//                     // если явно не указано → ставим JSON
//                     config.headers['Content-Type'] = 'application/json';
//                 }

//                 return config;
//             },
//             error => Promise.reject(error)
//         );

//         // Response interceptor
//         const responseIntercept = axiosInstance.interceptors.response.use(
//             response => response,
//             async error => {
//                 const prevRequest = error?.config;

//                 if (error?.response?.status === 401 && !prevRequest?.sent) {
//                     prevRequest.sent = true;
//                     try {
//                         const refreshToken =
//                             localStorage.getItem('refresh_token');
//                         const res = await axiosInstance.post('/refresh', {
//                             token: refreshToken,
//                         });

//                         const newAccessToken = res.data.accessToken;
//                         localStorage.setItem('access_token', newAccessToken);

//                         prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                         return axiosInstance(prevRequest);
//                     } catch (err) {
//                         console.error('Refresh failed:', err);
//                         localStorage.removeItem('token');
//                         localStorage.removeItem('refresh_token');
//                         window.location.href = '/login';
//                     }
//                 }

//                 return Promise.reject(error);
//             }
//         );

//         // cleanup при размонтировании
//         return () => {
//             axiosInstance.interceptors.request.eject(requestIntercept);
//             axiosInstance.interceptors.response.eject(responseIntercept);
//         };
//     }, [token]);

//     return axiosInstance;
// };

// export default useAxiosPrivate;

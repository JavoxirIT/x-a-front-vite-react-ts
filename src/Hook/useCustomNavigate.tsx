import { useNavigate } from 'react-router-dom';

const useCustomNavigate = (path: string | null) => {
    const navigator = useNavigate();
    if (path == null) {
        return function (param: number | string) {
            navigator(`${param}`);
        };
    }
    return function (param: number | string) {
        navigator(`/${path}/${param}`);
    };
};

export default useCustomNavigate;

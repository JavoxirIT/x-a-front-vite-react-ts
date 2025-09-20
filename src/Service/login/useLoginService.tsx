import { useContext } from 'react';
import { LoginContext } from '../../Context/context';

const useLoginService = () => {
    const ctx = useContext(LoginContext);
    if (!ctx) {
        throw new Error(
            'useLoginService должен использоваться в дочерних компонентах LoginService'
        );
    }
    return ctx;
};

export default useLoginService;

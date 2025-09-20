import { useContext } from 'react';
import { InProcessContract } from '../Context/context';

const useServiceContract = () => {
    const ctx = useContext(InProcessContract);
    if (!ctx) {
        throw new Error(
            'useInProcessContract должен использоваться внутри <ServiceContract>'
        );
    }
    return ctx;
};

export default useServiceContract;

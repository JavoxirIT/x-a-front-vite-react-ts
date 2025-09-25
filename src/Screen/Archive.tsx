import { useEffect } from 'react';
import useServiceContract from '../Service/useServiceContract';
import css from './Screen.module.css';
import Card from '../Components/Card/Card';
import useCustomNavigate from '../Hook/useCustomNavigate';
import Title from '../Components/Title';

const Archive = () => {
    const {
        getContract,
        inProcess,
        deleteContarct,
        stateText,
        restoryContarct,
    } = useServiceContract();
    const naigate = useCustomNavigate('archiv');
    useEffect(() => {
        getContract(3);
        // eslint-disable-next-line
    }, []);
    return (
        <div className={css.container}>
            <Title title='Archive' type='h1' />

            {inProcess.length ? (
                <div className={css.client_in_process_box}>
                    {inProcess.map(x => (
                        <Card
                            key={x.id}
                            rows={x}
                            goToRoute={naigate}
                            deleteContarct={deleteContarct}
                            isRestore={true}
                            restoryContarct={restoryContarct}
                        />
                    ))}
                </div>
            ) : (
                <h1 style={{ textAlign: 'center', padding: 20 }}>
                    {stateText}
                </h1>
            )}
        </div>
    );
};

export default Archive;

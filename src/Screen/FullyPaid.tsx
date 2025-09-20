import Table from '../Components/Table/Table';
import Title from '../Components/Title';
import { fullPaidTitle } from '../Constant/textConstant';
import { tableHeaderFullPaid } from '../Data/tableData';
import css from './Screen.module.css';
import useCustomNavigate from '../Hook/useCustomNavigate';
import useServiceContract from '../Service/useServiceContract';
import { useEffect, useMemo } from 'react';
import numberLocalFormat from '../Config/numberLocalFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

const FullyPaid = () => {
    const naigate = useCustomNavigate('full-paid');
    const {
        getContract,
        fullPaid,
        filterFullPaidWithDate,
        isDateSearchFullPaid,
        startDateFullPaid,
        setStatrDateFullPaid,
        endDateFullPaid,
        setEndDateFullPaid,
    } = useServiceContract();

    useEffect(() => {
        getContract(1);
    }, []);

    const clientFlPdDt = useMemo(() => {
        return fullPaid.reduce(
            (acc, x) => ({
                id: 1,
                added_anmount: (acc.added_anmount += x.added_anmount),
                price: (acc.price += x.price),
                totalAnmount: (acc.totalAnmount += x.totalAnmount),
            }),
            {
                id: 0,
                added_anmount: 0,
                price: 0,
                totalAnmount: 0,
            }
        );
    }, [fullPaid]);
    return (
        <div className={css.container}>
            <Title type='h1' title={fullPaidTitle} />
            <section className={css.full_paid_info_box}>
                <ul className={css.full_paid_info_list}>
                    <li>
                        {' '}
                        Jami tan narxi:{' '}
                        <span>{numberLocalFormat(clientFlPdDt.price)}</span>
                    </li>
                    <li>
                        {' '}
                        Jami qo`shilgan summa:{' '}
                        <span>
                            {numberLocalFormat(clientFlPdDt.added_anmount)}
                        </span>
                    </li>
                    <li>
                        {' '}
                        Jami:{' '}
                        <span>
                            {numberLocalFormat(clientFlPdDt.totalAnmount)}
                        </span>
                    </li>
                </ul>
                <section className={css.full_paid_sort_box}>
                    <input
                        className={css.client_sort_date}
                        type='month'
                        key='1'
                        value={startDateFullPaid}
                        onChange={e => setStatrDateFullPaid(e.target.value)}
                        disabled={!isDateSearchFullPaid}
                    />
                    <input
                        className={css.client_sort_date}
                        type='month'
                        key='2'
                        value={endDateFullPaid}
                        onChange={e => setEndDateFullPaid(e.target.value)}
                        disabled={!isDateSearchFullPaid}
                    />

                    <button onClick={filterFullPaidWithDate}>
                        {isDateSearchFullPaid ? (
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        ) : (
                            <FontAwesomeIcon icon={faXmark} />
                        )}
                    </button>
                </section>
            </section>
            <div className={css.client_table_box}>
                <Table
                    header={tableHeaderFullPaid}
                    rows={fullPaid}
                    footerData={clientFlPdDt}
                    goToRoute={naigate}
                    isDeleteButton={false}
                />
            </div>
        </div>
    );
};

export default FullyPaid;

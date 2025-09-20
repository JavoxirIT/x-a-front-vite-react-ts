import React, { useEffect } from 'react';
import css from './Screen.module.css';
import Title from '../Components/Title';
import { addedTitle, inProcessTitle } from '../Constant/textConstant';
import useCustomNavigate from '../Hook/useCustomNavigate';
import useServiceContract from '../Service/useServiceContract';
import Card from '../Components/Card/Card';
import SearchSelect from '../Components/Form/SearchSelect';
import SearchByDate from '../Components/Form/SearchByDate';
import numberLocalFormat from '../Config/numberLocalFormat';

const InProcess: React.FC = () => {
    const naigate = useCustomNavigate('in-process');
    const naigate2 = useCustomNavigate(null);

    const {
        getContract,
        inProcess,
        inProcessTotalAnmoutfooterData,
        deleteContarct,
        selectedContract,
        inProcessWithSelect,
        setEndDate,
        setStatrDate,
        endDate,
        startDate,
        filterContractWithDate,
        isDateSearch,
        stateText,
        restoryContarct,
    } = useServiceContract();

    useEffect(() => {
        getContract(0);
        // eslint-disable-next-line
    }, []);

    return (
        <main className={css.client_main}>
            <div className={css.container}>
                <div className={css.client_main_title_box}>
                    <Title type='h1' title={inProcessTitle} />
                    <button onClick={() => naigate2('/new-contract')}>
                        {addedTitle}
                    </button>
                </div>
                <div className={css.client_sort_box}>
                    <SearchSelect
                        inProcessWithSelect={inProcessWithSelect}
                        selectedContract={selectedContract}
                    />
                    <SearchByDate
                        endDate={endDate}
                        filterContractWithDate={filterContractWithDate}
                        isDateSearch={isDateSearch}
                        setEndDate={setEndDate}
                        setStatrDate={setStatrDate}
                        startDate={startDate}
                    />
                </div>
                <div className={css.full_paid_sort_box}>
                    <ul className={css.full_paid_info_list}>
                        <li>
                            {' '}
                            Jami tan narxi:{' '}
                            <span>
                                {numberLocalFormat(
                                    inProcessTotalAnmoutfooterData.price
                                )}
                            </span>
                        </li>
                        <li>
                            {' '}
                            Jami qo`shilgan summa:{' '}
                            <span>
                                {numberLocalFormat(
                                    inProcessTotalAnmoutfooterData.added_anmount
                                )}
                            </span>
                        </li>
                        <li>
                            {' '}
                            Jami summa:{' '}
                            <span>
                                {numberLocalFormat(
                                    inProcessTotalAnmoutfooterData.totalAnmount
                                )}
                            </span>
                        </li>
                        <li>
                            {' '}
                            Jami to`langan:
                            <span>
                                {numberLocalFormat(
                                    inProcessTotalAnmoutfooterData.totalAnmount -
                                        inProcessTotalAnmoutfooterData.remainingAmount
                                )}
                            </span>
                        </li>

                        <li>
                            {' '}
                            Jami qolgan to`lov:{' '}
                            <span>
                                {numberLocalFormat(
                                    inProcessTotalAnmoutfooterData.remainingAmount
                                )}
                            </span>
                        </li>
                    </ul>
                </div>

                {inProcess.length ? (
                    <div className={css.client_in_process_box}>
                        {inProcess.map(x => (
                            <Card
                                key={x.id}
                                rows={x}
                                goToRoute={naigate}
                                deleteContarct={deleteContarct}
                                isRestore={false}
                                restoryContarct={restoryContarct}
                            />
                        ))}
                    </div>
                ) : (
                    <h1 style={{ textAlign: 'center', padding: 20 }}>
                        {stateText}
                    </h1>
                )}
                {/* <div className={css.client_table_box}> */}
                {/* <Table
                        rows={inProcess}
                        header={tableHeader}
                        footerData={inProcessTotalAnmoutfooterData}
                        goToRoute={naigate}
                        isDeleteButton={true}
                        deleteContarct={deleteContarct}
                    /> */}
                {/* </div> */}
            </div>
        </main>
    );
};

export default InProcess;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dateLocalFormat from '../Config/dateLocalFormat';
import numberLocalFormat from '../Config/numberLocalFormat';
import type { IPaymets } from '../Interface/inteface';
import css from './Component.module.css';
import { faPen } from '@fortawesome/free-solid-svg-icons';

type PropsType = {
    paymentsData: IPaymets[];
    fn: ({ pay, contract_id, id, date }: IPaymets) => Promise<void>;
    paymentText: string;
    isShowAddPay: boolean;
};

const PaymentsList = ({
    paymentsData,
    fn,
    paymentText,
    isShowAddPay,
}: PropsType) => {
    return paymentsData.length ? (
        <ol className={css.list_ol}>
            {paymentsData.map(x => (
                <li className={css.list_item} key={x.id}>
                    <div className={css.list_item_date}>
                        <big>Sana:</big> <big>{dateLocalFormat(x.date)}</big>
                    </div>
                    <div className={css.list_item_summ}>
                        <big>Summa:</big> <big>{numberLocalFormat(x.pay)}</big>
                    </div>
                    {isShowAddPay && (
                        <button onClick={() => fn(x)} style={{ width: 120 }}>
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                    )}
                </li>
            ))}
        </ol>
    ) : (
        <h1>{paymentText}</h1>
    );
};

export default PaymentsList;

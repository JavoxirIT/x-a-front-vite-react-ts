import dateLocalFormat from '../../Config/dateLocalFormat';
import numberLocalFormat from '../../Config/numberLocalFormat';
import TR from './Tr';
import css from '../Component.module.css';
import type { IClientData } from '../../Interface/inteface';
const InProcessTable = ({ inProcessOne }: { inProcessOne: IClientData }) => {
    const {
        id,
        name,
        avto_info,
        start_date,
        end_date,
        price,
        added_anmount,
        totalAnmount,
        first_payment,
        remainingAmount,
    } = inProcessOne;
    return (
        <table id={`${id}`} className={css.one_client_header_table}>
            <tbody>
                <TR title='F.I.Sh' value={name} />
                <TR title='Avtomashina' value={avto_info} />
                <TR title='Berilgan sana' value={dateLocalFormat(start_date)} />
                <TR title='Muddat' value={dateLocalFormat(end_date)} />
                <TR title='Tan narxi' value={numberLocalFormat(price)} />
                <TR
                    title='Qo`shilgan summa'
                    value={numberLocalFormat(added_anmount)}
                />
                <TR
                    title='Jami summa'
                    value={numberLocalFormat(totalAnmount)}
                />
                <TR
                    title='Birinchi to`lov'
                    value={numberLocalFormat(first_payment)}
                />
                <TR
                    title='Qolgan summa'
                    value={numberLocalFormat(remainingAmount)}
                />
            </tbody>
        </table>
    );
};

export default InProcessTable;

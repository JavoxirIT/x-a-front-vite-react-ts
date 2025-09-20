import numberLocalFormat from '../../Config/numberLocalFormat';
import { allIformation } from '../../Constant/textConstant';
import type { IClientBase, IClientDataPay } from '../../Interface/inteface';
import css from '../Component.module.css';

type Props = {
    footerData: IClientDataPay | IClientBase;
    colSpan: number;
};

const TableFootRow = ({ footerData, colSpan }: Props) => {
    return (
        <tr id={`${footerData.id}`} className={css.table_foot_row}>
            <th className={css.table_row_th} colSpan={colSpan}>
                {allIformation}
            </th>
            <th className={css.table_row_th}>
                {numberLocalFormat(footerData.price)}
            </th>
            <th className={css.table_row_th}>
                {numberLocalFormat(footerData.added_anmount)}
            </th>
            <th className={css.table_row_th}>
                {numberLocalFormat(footerData.totalAnmount)}
            </th>
            {'first_payment' in footerData && (
                <th className={css.table_row_th}>
                    {numberLocalFormat(footerData.first_payment)}
                </th>
            )}
            {'remainingAmount' in footerData && (
                <th className={css.table_row_th} colSpan={2}>
                    {numberLocalFormat(footerData.remainingAmount)}
                </th>
            )}
        </tr>
    );
};

export default TableFootRow;

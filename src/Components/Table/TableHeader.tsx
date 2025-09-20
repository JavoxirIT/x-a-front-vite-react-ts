import css from '../Component.module.css';
import type { ITableHeaderIClientBase } from '../../Interface/inteface';

type Props = {
    header: ITableHeaderIClientBase[];
};

const TableHeader = ({ header }: Props) => {
    return (
        <tr className={css.table_head_row}>
            {header.map((x, index) => (
                <th key={`${index + 1}`} className={css.table_row_th}>
                    {x}
                </th>
            ))}
        </tr>
    );
};

export default TableHeader;

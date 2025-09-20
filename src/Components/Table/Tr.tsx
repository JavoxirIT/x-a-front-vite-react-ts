import css from '../Component.module.css';

const TR = ({
    title,
    value,
}: {
    title: string;
    value: number | string | React.ReactNode;
}) => {
    return (
        <tr>
            <th className={css.table_row_th}>{title}</th>
            <td
                style={{
                    fontSize: '1.6rem',
                    padding: '0.2rem',
                }}>
                {value}
            </td>
        </tr>
    );
};

export default TR;

import TableHeader from './TableHeader';
import TableBodyRow from './TableBodyRow';
// import TableFootRow from './TableFootRow';
import css from '../Component.module.css';
import type {
    IClientBase,
    IClientData,
    IClientDataPay,
    IClientFullPaid,
    ITableHeaderIClientBase,
} from '../../Interface/inteface';

type TableProps = {
    rows: (IClientData | IClientFullPaid | IClientDataPay)[];
    header: ITableHeaderIClientBase[];
    footerData: IClientDataPay | IClientBase;
    goToRoute: (param: number) => void;
    isDeleteButton: boolean;
    // deleteContarct: (param: number) => void;
};

const Table = ({
    rows,
    header,
    // footerData,
    goToRoute,
    isDeleteButton,
}: // deleteContarct,
TableProps) => {
    return (
        <table className={css.client_table}>
            <thead>
                <TableHeader header={header} />
            </thead>
            <tbody>
                {rows.map(x => (
                    <TableBodyRow
                        key={x.id}
                        {...x}
                        goToRoute={goToRoute}
                        isDeleteButton={isDeleteButton}
                        deleteContarct={() => {}}
                    />
                ))}
            </tbody>
            <tfoot>
                {/* <TableFootRow colSpan={3} footerData={footerData} /> */}
            </tfoot>
        </table>
    );
};

export default Table;

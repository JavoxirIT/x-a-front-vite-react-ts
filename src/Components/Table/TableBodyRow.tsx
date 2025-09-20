import { memo } from 'react';
import { textDelete } from '../../Constant/textConstant';
import type {
    IClientData,
    IClientDataPay,
    IClientFullPaid,
} from '../../Interface/inteface';
import css from '../Component.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

type TableBodyRowProps =
    | (IClientData | IClientFullPaid | IClientDataPay) & {
          goToRoute: (param: number) => void;
          isDeleteButton: boolean;
          deleteContarct: (param: number) => void;
      };

const TableBodyRow = memo((props: TableBodyRowProps) => {
    return (
        <tr className={css.table_tbody_row} id={`${props.id}`}>
            {'name' in props && <td>{props.name}</td>}
            {'avto_info' in props && <td>{props.avto_info}</td>}
            {'start_date' in props && <td>{props.start_date}</td>}
            {/* {'end_date' in props && <td>{props.end_date}</td>} */}

            <td>{props.price}</td>
            <td>{props.added_anmount}</td>
            <td>{props.totalAnmount}</td>

            {/* {'first_payment' in props && <td>{props.first_payment}</td>} */}
            {/* {'remainingAmount' in props && <td>{props.remainingAmount}</td>} */}

            <td>
                <button data-view onClick={() => props.goToRoute(props.id)}>
                    <FontAwesomeIcon icon={faEye} />
                </button>
                {props.isDeleteButton && (
                    <button
                        data-delete
                        onClick={() => props.deleteContarct(props.id)}>
                        {textDelete}
                    </button>
                )}
            </td>
        </tr>
    );
});

export default TableBodyRow;

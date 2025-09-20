import { moreDetails, textDelete } from '../../Constant/textConstant';
import type { IClientData } from '../../Interface/inteface';
import css from '../Component.module.css';

type TableProps = {
    rows: IClientData;
    goToRoute: (param: number) => void;
    deleteContarct: (param: number) => void;
    isRestore?: boolean;
    restoryContarct: (id: number, f: number) => void;
};

const Card = ({
    rows,
    goToRoute,
    deleteContarct,
    isRestore = false,
    restoryContarct,
}: TableProps) => {
    return (
        <div className={css.card}>
            <div className={css.card__content}>
                <h6 className={css.card_number}>№: {rows.id}</h6>
                <table id={`${rows.id}`} className={css.card__content_table}>
                    <tbody>
                        <tr>
                            <td>F.I.Sh</td>
                            <td>{rows.name}</td>
                        </tr>
                        <tr>
                            <td>Ma'lumot</td>
                            <td>
                                <div>{rows.avto_info}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={css.card_footer_box}>
                    <button data-view onClick={() => goToRoute(rows.id)}>
                        {moreDetails}
                    </button>
                    {isRestore && (
                        <button
                            data-update
                            onClick={() => restoryContarct!(rows.id, 0)}>
                            Tiklash
                        </button>
                    )}
                    <button
                        data-delete
                        onClick={() =>
                            isRestore
                                ? deleteContarct(rows.id)
                                : restoryContarct!(rows.id, 3)
                        }>
                        {textDelete}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;

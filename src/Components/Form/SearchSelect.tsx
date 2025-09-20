import { memo } from 'react';
import { all } from '../../Constant/textConstant';
import type { ISelectedData } from '../../Interface/inteface';
import css from '../Component.module.css';

type Props = {
    selectedContract: (param: number) => void;
    inProcessWithSelect: ISelectedData[];
};

const SearchSelect = memo(
    ({ selectedContract, inProcessWithSelect }: Props) => {
        return (
            <section className={css.client_sort_box_select}>
                <select
                    onChange={e => selectedContract(+e.target.value)}
                    className={css.client_sort_select}>
                    <option value={0}>{all}</option>
                    {inProcessWithSelect.map(x => (
                        <option value={x.id} key={x.id}>
                            {x.name}
                        </option>
                    ))}
                </select>
            </section>
        );
    }
);

export default SearchSelect;

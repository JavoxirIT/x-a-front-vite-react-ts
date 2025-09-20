import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import css from '../Component.module.css';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

type PropsType = {
    startDate: string;
    setStatrDate: (param: string) => void;
    endDate: string;
    setEndDate: (param: string) => void;
    isDateSearch: boolean;
    filterContractWithDate: () => void;
};

const SearchByDate = ({
    startDate,
    endDate,
    filterContractWithDate,
    isDateSearch,
    setEndDate,
    setStatrDate,
}: PropsType) => {
    return (
        <section className={css.client_sort_box_date}>
            <input
                className={css.client_sort_date}
                type='month'
                id='1'
                value={startDate}
                onChange={e => setStatrDate(e.target.value)}
                disabled={!isDateSearch}
            />
            <input
                className={css.client_sort_date}
                type='month'
                id='2'
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                disabled={!isDateSearch}
            />
            <button onClick={filterContractWithDate}>
                {isDateSearch ? (
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                ) : (
                    <FontAwesomeIcon icon={faXmark} />
                )}
            </button>
        </section>
    );
};

export default SearchByDate;

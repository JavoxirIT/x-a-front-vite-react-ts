import { useEffect, useState } from 'react';
import useNotes from '../Service/Notes/useNotes';
import css from './Screen.module.css';
import css2 from '../Components/Component.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { notes, save } from '../Constant/textConstant';
import dateLocalFormat from '../Config/dateLocalFormat';
import Title from '../Components/Title';

const Notes = () => {
    const { getNotes, loading, dataNotes, addNotes, deleteNotes } = useNotes();
    const [note, setNote] = useState<string>('');

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={css.container}>
            <Title title={notes} type='h1' />

            <section className={css.add_note_box}>
                <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    rows={5}
                    cols={30}></textarea>
                <button
                    data-edit
                    onClick={() => {
                        addNotes(note);
                        setNote('');
                    }}>
                    {save}
                </button>
            </section>

            <div className={css.notes_box}>
                {loading ? (
                    <h2>Yuklanmoqda</h2>
                ) : (
                    <ul className={css2.notes_list}>
                        {dataNotes.map(x => (
                            <li
                                data-date={dateLocalFormat(x.created_at)}
                                key={x.id}
                                className={css2.list_item}>
                                <div>
                                    <span>{dateLocalFormat(x.created_at)}</span>
                                    {x.data}
                                </div>{' '}
                                <button
                                    onClick={() => deleteNotes(x.id)}
                                    data-delete
                                    style={{ width: 'max-content' }}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Notes;

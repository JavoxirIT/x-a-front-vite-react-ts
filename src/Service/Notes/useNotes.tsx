import { useContext } from 'react';
import { NotesContext } from '../../Context/context';

const useNotes = () => {
    const ctx = useContext(NotesContext);
    if (!ctx) {
        throw new Error(
            'NotesContext должен использоваться внутри <ServiceContract>'
        );
    }
    return ctx;
};

export default useNotes;

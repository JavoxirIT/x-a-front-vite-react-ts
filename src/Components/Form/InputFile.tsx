import { addImage } from '../../Constant/textConstant';
import css from '../Component.module.css';

interface InputFileProps {
    name: string;
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const InputFile = ({ name, setFiles }: InputFileProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    return (
        <label className={css.file_label} htmlFor='file'>
            <span className={css.file_title}>{addImage}</span>
            <input
                multiple
                className={css.file_inp}
                type='file'
                id='file'
                accept='image/*'
                onChange={handleChange}
                name={name}
            />
        </label>
    );
};

export default InputFile;

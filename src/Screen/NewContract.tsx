import AddANewContract from '../Components/Form/AddANewContract';
import Title from '../Components/Title';
import css from './Screen.module.css';
const NewContract = () => {
    return (
        <div className={css.container}>
            <Title title='Yangi Mijoz ' type='h1' />
            <AddANewContract />
        </div>
    );
};

export default NewContract;

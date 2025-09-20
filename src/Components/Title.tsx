import css from './Component.module.css';

interface IPropType {
    title: string;
    type: string;
}

const Title = ({ title, type }: IPropType) => {
    switch (type) {
        case 'h1':
            return <h1 className={css.title}>{title}</h1>;
        case 'h2':
            return <h2 className={css.title}>{title}</h2>;
        default:
            <p>{title}</p>;
    }
};

export default Title;

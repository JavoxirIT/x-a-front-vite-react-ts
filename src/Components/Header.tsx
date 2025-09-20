import css from './Component.module.css';
import useCustomNavigate from '../Hook/useCustomNavigate';
import {
    doneTitle,
    inProgressTitle,
    exitTitle,
} from '../Constant/textConstant';
import useLoginService from '../Service/login/useLoginService';

const Header = () => {
    const navigate = useCustomNavigate(null);
    const { logout } = useLoginService();

    return (
        <header className={css.header}>
            <div className={css.container}>
                <nav className={css.header__nav}>
                    <div className={css.nav__link__box}>
                        <button onClick={() => navigate('/in-process')}>
                            {inProgressTitle}
                        </button>
                        <button onClick={() => navigate('/full-paid')}>
                            {doneTitle}
                        </button>
                        <button onClick={() => navigate('/archiv')}>
                            Arxiv
                        </button>
                        <button onClick={() => navigate('/notes')}>
                            Eslatmalar
                        </button>
                    </div>
                    <div className={css.nav__button__box}>
                        <button onClick={logout} data-delete>
                            {exitTitle}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;

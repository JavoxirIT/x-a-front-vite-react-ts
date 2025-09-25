import css from './Component.module.css';
import useCustomNavigate from '../Hook/useCustomNavigate';
import {
    doneTitle,
    inProgressTitle,
    exitTitle,
    passwordAndToken,
} from '../Constant/textConstant';
import useLoginService from '../Service/login/useLoginService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
    const navigate = useCustomNavigate(null);
    const { logout, change } = useLoginService();
    const [open, setOpen] = useState<boolean>(true);

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    function clickPopupButton() {
        if (popupRef.current !== null) {
            popupRef.current.setAttribute('popup-open', 'true');
        }
        setOpen(false);
    }
    function outPopupButton() {
        if (popupRef.current !== null) {
            popupRef.current.removeAttribute('popup-open');
        }
        setOpen(true);
    }

    useEffect(() => {
        const buttonEl = buttonRef.current;
        const popupEl = popupRef.current;

        if (popupEl && buttonEl) {
            const { offsetLeft, offsetTop, offsetHeight, offsetWidth } =
                buttonEl;

            const { offsetWidth: popupWidth } = popupEl;
            const fn = () => {
                popupEl.style.left = `${
                    offsetLeft + offsetWidth - popupWidth
                }px`;
                popupEl.style.top = `${offsetTop + offsetHeight + 10}px`;
            };

            buttonEl.addEventListener('mouseenter', fn);
            return () => buttonEl.removeEventListener('mouseenter', fn);
        }
    }, []);

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
                        <button
                            ref={buttonRef}
                            onClick={() =>
                                open ? clickPopupButton() : outPopupButton()
                            }
                            // onMouseEnter={clickPopupButton}
                            data-delete
                            className={css.popup_button}>
                            <FontAwesomeIcon icon={faGear} />
                        </button>
                    </div>
                </nav>
            </div>

            <div
                ref={popupRef}
                // onMouseLeave={outPopupButton}
                className={css.popup}>
                <div className={css.popup_content}>
                    <button onClick={logout} data-delete>
                        {exitTitle}
                    </button>
                    <button onClick={change} data-update>
                        {passwordAndToken}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

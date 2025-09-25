import {
    faAddressBook,
    faBoxArchive,
    faGear,
    faNoteSticky,
    faTableList,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import css from './Component.module.css';
import useCustomNavigate from '../Hook/useCustomNavigate';
import useLoginService from '../Service/login/useLoginService';
import { useEffect, useRef, useState } from 'react';
import { exitTitle, passwordAndToken } from '../Constant/textConstant';

const BottomBar = () => {
    const navigate = useCustomNavigate(null);
    const { logout, change } = useLoginService();
    const [open, setOpen] = useState<boolean>(true);

    const buttonBarRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    function clickPopupButton() {
        if (popupRef.current !== null) {
            console.log(buttonBarRef.current);
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
        const buttonEl = buttonBarRef.current;
        const popupEl = popupRef.current;

        if (popupEl && buttonEl) {
            const { offsetLeft, offsetTop, offsetHeight, offsetWidth } =
                buttonEl;

            const { offsetWidth: popupWidth } = popupEl;
            const fn = () => {
                popupEl.style.left = `${
                    offsetLeft + offsetWidth - popupWidth
                }px`;
                popupEl.style.bottom = `${offsetTop + offsetHeight + 20}px`;
            };

            buttonEl.addEventListener('mouseenter', fn);
            return () => buttonEl.removeEventListener('mouseenter', fn);
        }
    }, []);

    return (
        <>
            <div className={css.bottom_bar}>
                <section
                    onClick={() => navigate('/in-process')}
                    className={css.bottom_bar_item}>
                    <FontAwesomeIcon icon={faAddressBook} />
                    <span>Jarayondagi</span>
                </section>
                <section
                    onClick={() => navigate('/full-paid')}
                    className={css.bottom_bar_item}>
                    <FontAwesomeIcon icon={faTableList} />
                    <span>Bajarilganlar</span>
                </section>
                <section
                    onClick={() => navigate('/archiv')}
                    className={css.bottom_bar_item}>
                    <FontAwesomeIcon icon={faBoxArchive} />
                    <span>Arxiv</span>
                </section>
                <section
                    onClick={() => navigate('/notes')}
                    className={css.bottom_bar_item}>
                    <FontAwesomeIcon icon={faNoteSticky} />
                    <span>Eslatmalar</span>
                </section>
                <section
                    ref={buttonBarRef}
                    onClick={() =>
                        open ? clickPopupButton() : outPopupButton()
                    }
                    className={css.bottom_bar_item}>
                    <FontAwesomeIcon icon={faGear} />
                    <span>Sozlamalar</span>
                </section>
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
        </>
    );
};

export default BottomBar;

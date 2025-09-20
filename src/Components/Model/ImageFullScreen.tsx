import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import css from './Model.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ImageFullScreen = ({
    url,
    open,
    fn,
}: {
    url: string;
    open: boolean;
    fn: () => void;
}) => {
    return (
        <div
            className={open ? `${css.modal} ${css.modal_active}` : css.modal}
            onClick={fn}>
            <div
                className={css.modal_content}
                onClick={e => e.stopPropagation()}>
                <div className={css.modal_close_btn} onClick={fn}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={css.modal_close_icon}
                    />
                </div>
                <img src={url} />
            </div>
        </div>
    );
};

export default ImageFullScreen;

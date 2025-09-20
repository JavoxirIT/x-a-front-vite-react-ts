import { memo, useEffect, useState } from 'react';
import css from '../Component.module.css';

type ImageProps = {
    url: string;
    fnc: () => void;
};

const Img = memo(({ url, fnc }: ImageProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const image = new Image();
        image.onload = () => {
            setLoading(false);
        };
        image.onerror = () => {
            setLoading(false);
            setError(true);
        };
        image.src = url;
        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, [url]);
    return (
        <figure className={css.one_client_header_img}>
            {loading ? (
                <h6 className={css.one_client_loading_text}>Yuklanmoqda...</h6>
            ) : error ? (
                <h6 className={css.one_client_loading_text}>
                    Xatolik yuz berdi...
                </h6>
            ) : (
                <img onClick={fnc} src={url} alt='image' />
            )}
        </figure>
    );
});

export default Img;

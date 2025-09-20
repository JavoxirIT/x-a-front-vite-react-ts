import { forwardRef } from 'react';
import css from '../Component.module.css';

type inpModeType =
    | 'search'
    | 'email'
    | 'tel'
    | 'text'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
    | undefined;

type PropsType = {
    id: number;
    label: string;
    name?: string;
    type: string;
    readOnly?: boolean;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    fnc?: (arg: number) => void;
    inpMode?: inpModeType;
    isDisabled?: boolean;
};

// forwardRef нужен для react-hook-form
const Input = forwardRef<HTMLInputElement, PropsType>(
    (
        {
            id,
            label,
            name,
            type,
            readOnly,
            value,
            fnc,
            inpMode,
            isDisabled,
            onChange,
            onBlur,
        },
        ref
    ) => {
        return (
            <label className={css.label} htmlFor={`${id}`}>
                <span className={css.label_span}>{label}</span>
                <input
                    className={css.label_inp}
                    type={type}
                    name={name}
                    id={`${id}`}
                    readOnly={readOnly}
                    value={value}
                    onChange={e => {
                        if (fnc) fnc(Number(e.target.value));
                        if (onChange) onChange(e); // важно для react-hook-form
                    }}
                    onBlur={onBlur}
                    ref={ref}
                    inputMode={inpMode}
                    disabled={isDisabled}
                />
            </label>
        );
    }
);

export default Input;

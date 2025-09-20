import type { FormEvent } from 'react';
import { login, password } from '../Constant/textConstant';
import css from './Layout.module.css';
import useLoginService from '../Service/login/useLoginService';

const AppLogin: React.FC = () => {
    const { handelAuth } = useLoginService();

    function handleSubmit(evant: FormEvent<HTMLFormElement>) {
        evant.preventDefault();
        const formList = evant.currentTarget;
        const formData = new FormData(formList);
        const username =
            (formData.get('username') as string | null)?.trim() ?? '';
        const password =
            (formData.get('password') as string | null)?.trim() ?? '';

        if (username && password) {
            handelAuth({ username, password });
        }
    }

    return (
        <div className={css.auth__container}>
            <div className={css.auth__box}>
                <form
                    onSubmit={handleSubmit}
                    className={css.auth__form}
                    action='#'
                    name='auth'
                    autoComplete='off'>
                    <label htmlFor='1'>
                        <span>{login}</span>
                        <input
                            className={css.form__inp}
                            type='text'
                            name='username'
                            id='1'
                        />
                    </label>
                    <label htmlFor='2'>
                        <span>{password}</span>
                        <input
                            className={css.form__inp}
                            type='password'
                            name='password'
                            id='2'
                        />
                    </label>

                    <button className={css.form__button} type='submit'>
                        Kirish
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppLogin;

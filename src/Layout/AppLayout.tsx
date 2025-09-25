import BottomBar from '../Components/BottomBar';
import Header from '../Components/Header';
import LoginService from '../Service/login/LoginService';
import NotesService from '../Service/Notes/NotesService';
import ServiceContract from '../Service/ServiceContract';
import css from './Layout.module.css';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <ServiceContract>
            <NotesService>
                <LoginService>
                    <div className={css.app_layout}>
                        <div className={css.container}>
                            <Header />
                            <Outlet />
                        </div>
                        <BottomBar />
                    </div>
                </LoginService>
            </NotesService>
        </ServiceContract>
    );
};

export default AppLayout;

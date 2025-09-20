import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './Layout/AppLayout';
import AppLogin from './Layout/AppLogin';
import FullyPaid from './Screen/FullyPaid';
import InProcess from './Screen/InProcess';
import ContractOneScreen from './Screen/ContractOneScreen';
// import FullPaidOneClien from './Screen/FullPaidOneClien';
import NewContract from './Screen/NewContract';
import LoginService from './Service/login/LoginService';
import Redirect from './Layout/Redirect';
import Notes from './Screen/Notes';
import Archive from './Screen/Archive';

function App() {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Redirect>
                        <AppLayout />
                    </Redirect>
                }>
                <Route index element={<InProcess />} />
                <Route path='new-contract' element={<NewContract />} />
                <Route path='in-process' element={<InProcess />} />
                <Route path='archiv' element={<Archive />} />
                <Route
                    path='archiv/:id'
                    element={<ContractOneScreen isShowAddPay={false} />}
                />
                <Route path='notes' element={<Notes />} />
                <Route
                    path='in-process/:id'
                    element={<ContractOneScreen isShowAddPay={true} />}
                />
                <Route path='full-paid' element={<FullyPaid />} />
                <Route
                    path='full-paid/:id'
                    element={<ContractOneScreen isShowAddPay={false} />}
                />
            </Route>
            <Route
                path='/login'
                element={
                    <LoginService>
                        <AppLogin />
                    </LoginService>
                }
            />
        </Routes>
    );
}

export default App;

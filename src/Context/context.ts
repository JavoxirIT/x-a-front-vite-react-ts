import { createContext } from 'react';
import type {
    IClientData,
    IClientDataPay,
    ILAuthData,
    IPaymets,
    ISelectedData,
    Notes,
} from '../Interface/inteface';

interface InProcessContractValue {
    getContract: (param: number) => Promise<void>;
    inProcess: IClientData[];
    inProcessTotalAnmoutfooterData: IClientDataPay;
    deleteContarct: (id: number) => void;
    addContract: (param: FormData, contractId: number | null) => Promise<void>;
    getOneContract: (param: number) => Promise<void>;
    inProcessOne: IClientData | null;
    selectedContract: (param: number) => void;
    inProcessWithSelect: ISelectedData[];
    startDate: string;
    setStatrDate: (param: string) => void;
    endDate: string;
    setEndDate: (param: string) => void;
    filterContractWithDate: () => void;
    isDateSearch: boolean;
    setIsDateSearch: (param: boolean) => void;
    stateText: string;
    addPayments: (id: string) => void;
    getContaractPayments: (id: number) => void;
    paymentsData: IPaymets[];
    editPayment: ({ pay, contract_id, id }: IPaymets) => Promise<void>;
    paymentText: string;
    fullPaid: IClientData[];
    startDateFullPaid: string;
    setStatrDateFullPaid: (param: string) => void;
    endDateFullPaid: string;
    setEndDateFullPaid: (param: string) => void;
    filterFullPaidWithDate: () => void;
    isDateSearchFullPaid: boolean;
    restoryContarct: (id: number, f: number) => void;
}

interface ILoginService {
    handelAuth: ({ username, password }: ILAuthData) => void;
    refreshAuth: () => void;
    logout: () => void;
    change: () => void;
}

interface INotes {
    getNotes: () => void;
    addNotes: (text: string) => void;
    deleteNotes: (id: number) => void;
    dataNotes: Notes[];
    loading: boolean;
}

export const InProcessContract = createContext<InProcessContractValue | null>(
    null
);

export const LoginContext = createContext<ILoginService | null>(null);

export const NotesContext = createContext<INotes | null>(null);

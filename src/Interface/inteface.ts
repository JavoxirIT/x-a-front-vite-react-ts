import type { ReactNode } from 'react';

export interface IClientBase {
    id: number;
    price: number;
    added_anmount: number;
    totalAnmount: number;
}

export interface IClientInfo {
    name: string;
    avto_info: string;
    start_date: string;
    end_date: string;
    images: string[];
}

export interface IClientPayment {
    first_payment: number;
    remainingAmount: number;
}

// Полные данные клиента
export type IClientData = IClientBase & IClientInfo & IClientPayment;

// Клиент полностью оплатил (нет payment полей)
export type IClientFullPaid = IClientBase & IClientInfo;

// Только данные об оплате (нет инфо полей)
export type IClientDataPay = IClientBase & IClientPayment;

export type ITableHeaderIClientBase = string;

export type ServiceProps = {
    children: ReactNode;
};

export interface ILAuthData {
    username: string;
    password: string;
}

export interface ISelectedData {
    id: number;
    name: string;
}

export interface IPaymets {
    id: number;
    contract_id: number;
    pay: number;
    date: string;
}

export interface Notes {
    id: number;
    data: string;
    created_at: string;
}

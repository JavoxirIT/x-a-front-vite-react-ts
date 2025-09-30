import { useCallback, useState } from 'react';
import { InProcessContract } from '../Context/context';
import type {
    IClientData,
    IClientDataPay,
    IPaymets,
    ISelectedData,
    ServiceProps,
} from '../Interface/inteface';
import Swal from 'sweetalert2';
import {
    addedPayments,
    areYouSure,
    confirmButtonColorOrange,
    dataHasBeenSaved,
    deleted,
    hasBeenDeleted,
    informationNotFound,
    loading,
    no,
    restoredAfterDeletion,
    save,
    yesDeleyteIt,
} from '../Constant/textConstant';
import numberLocalFormat from '../Config/numberLocalFormat';
import dateLocalFormat from '../Config/dateLocalFormat';
import axiosInstance from '../Config/axios';
import { AxiosError } from 'axios';

// interface IDeleteResponse {
//     message: string;
// }

const ServiceContract = ({ children }: ServiceProps) => {
    const [inProcess, setInProcess] = useState<IClientData[]>([]);

    const [inProcessReserve, setInProcessReserve] = useState<IClientData[]>([]);
    const [inProcessWithSelect, setInProcessWithSelect] = useState<
        ISelectedData[]
    >([]);
    const [inProcessOne, setInProcessOne] = useState<IClientData | null>(null);

    const [startDate, setStatrDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [isDateSearch, setIsDateSearch] = useState<boolean>(true);
    const [stateText, setStateText] = useState<string>('');
    const [paymentsData, setPaymentsData] = useState<IPaymets[]>([]);
    const [paymentText, setPaymentText] = useState<string>('');
    //
    const [fullPaid, setFullPaid] = useState<IClientData[]>([]);
    const [startDateFullPaid, setStatrDateFullPaid] = useState<string>('');
    const [endDateFullPaid, setEndDateFullPaid] = useState<string>('');
    const [isDateSearchFullPaid, setIsDateSearchFullPaid] =
        useState<boolean>(true);

    async function addContract(formData: FormData, contractId: number | null) {
        try {
            const response = await axiosInstance.post(
                `contracts?id=${contractId}`,
                formData
            );
            if (response.status === 201) {
                getContract(0);
                Swal.fire({
                    theme: 'auto',
                    title: dataHasBeenSaved,
                    icon: 'success',
                    confirmButtonColor: confirmButtonColorOrange,
                });
            } else {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                Swal.fire({
                    theme: 'auto',
                    title: error.response?.data.message,
                    icon: 'error',
                    confirmButtonColor: confirmButtonColorOrange,
                });
            }
        }
    }

    async function getContract(finaly: number) {
        setInProcess([]);
        setInProcessReserve([]);
        setFullPaid([]);
        setStateText(loading);
        try {
            const response = await axiosInstance.get(
                `/contracts?finaly=${finaly}`
            );
            const data = await response.data;
            if (response.status === 200) {
                setInProcess(data);
                setInProcessReserve(data);
                setFullPaid(data);
                setInProcessWithSelect(
                    data.map((x: ISelectedData) => ({
                        id: x.id,
                        name: x.name,
                    }))
                );
            } else {
                setStateText(data.message);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setStateText(error.response?.data.message);
            }
            if (error instanceof Error) {
                // setStateText(error.message);
            } else {
                setStateText(String(error));
            }
        }
    }

    function deleteContarct(id: number) {
        Swal.fire({
            title: areYouSure,
            text: restoredAfterDeletion,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: confirmButtonColorOrange,
            cancelButtonColor: '#d33',
            confirmButtonText: yesDeleyteIt,
            cancelButtonText: no,
            theme: 'auto',
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosInstance.delete(
                        `contracts/${id}`
                    );
                    const data = await response.data;
                    if (response.status === 200) {
                        const filtereData = inProcess.filter(x => x.id !== id);
                        setInProcess(filtereData);
                        Swal.fire({
                            theme: 'auto',
                            title: deleted,
                            text: hasBeenDeleted,
                            icon: 'success',
                            confirmButtonColor: confirmButtonColorOrange,
                        });
                    } else {
                        throw new Error(`${response.status}: ${data.message}`);
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        Swal.fire({
                            theme: 'auto',
                            title: error.name,
                            text: error.message,
                            icon: 'error',
                            confirmButtonColor: confirmButtonColorOrange,
                        });
                        return;
                    }
                    Swal.fire({
                        theme: 'auto',
                        title: String(error),
                        icon: 'error',
                        confirmButtonColor: confirmButtonColorOrange,
                    });
                }
            }
        });
    }

    async function restoryContarct(id: number, param: number) {
        Swal.fire({
            title: areYouSure,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: confirmButtonColorOrange,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ha',
            cancelButtonText: no,
            theme: 'auto',
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosInstance.patch(
                        `contracts/move/${id}?param=${param}`
                    );
                    const data = await response.data;
                    if (response.status === 200) {
                        switch (param) {
                            case 0:
                                getContract(3);
                                break;
                            case 3:
                                getContract(0);
                                break;
                            default:
                                console.log('');
                        }

                        Swal.fire({
                            theme: 'auto',
                            title: param == 0 ? 'Tiklandi' : 'Arxivda',
                            icon: 'success',
                            confirmButtonColor: confirmButtonColorOrange,
                        });
                    } else {
                        throw new Error(`${response.status}: ${data.message}`);
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        Swal.fire({
                            theme: 'auto',
                            title: error.name,
                            text: error.message,
                            icon: 'error',
                            confirmButtonColor: confirmButtonColorOrange,
                        });
                        return;
                    }
                    Swal.fire({
                        theme: 'auto',
                        title: String(error),
                        icon: 'error',
                        confirmButtonColor: confirmButtonColorOrange,
                    });
                }
            }
        });
    }

    const selectedContract = useCallback(
        (id: number) => {
            if (id == 0) {
                setInProcess(inProcessReserve);
                return;
            }
            const data = inProcessReserve.filter(x => x.id === id);

            if (data.length) {
                setInProcess(data);
            } else {
                setInProcess([]);
                setStateText(informationNotFound);
            }
        },
        [inProcessReserve]
    );

    const inProcessTotalAnmoutfooterData =
        inProcess.length > 0
            ? inProcess?.reduce<IClientDataPay>(
                  (acc, x) => ({
                      id: 1,
                      added_anmount: (acc.added_anmount += x.added_anmount),
                      first_payment: (acc.first_payment += x.first_payment),
                      price: (acc.price += x.price),
                      remainingAmount: (acc.remainingAmount +=
                          x.remainingAmount),
                      totalAnmount: (acc.totalAnmount += x.totalAnmount),
                  }),
                  {
                      id: 0,
                      added_anmount: 0,
                      first_payment: 0,
                      price: 0,
                      remainingAmount: 0,
                      totalAnmount: 0,
                  }
              )
            : ({} as IClientDataPay);

    const filterContractWithDate = () => {
        if (startDate !== '' && endDate !== '' && isDateSearch) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            const data = inProcessReserve.filter(x => {
                const contractStart = new Date(x.start_date);
                const contractEnd = new Date(x.end_date);
                return contractStart >= start && contractEnd <= end;
            });

            if (data.length) {
                setInProcess(data);
            } else {
                setInProcess([]);
                setStateText(informationNotFound);
            }
            setIsDateSearch(false);
        } else if (startDate !== '' && endDate !== '') {
            setIsDateSearch(true);
            setInProcess(inProcessReserve);
        }
    };
    async function getOneContract(params: number) {
        try {
            const response = await axiosInstance.get(`contracts/${params}`);
            const data = await response.data;
            if (response.status === 200) {
                setInProcessOne(data);
            } else {
                throw new Error(`${response.status}: ${data.message}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                Swal.fire({
                    theme: 'auto',
                    title: error.name,
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: confirmButtonColorOrange,
                });
                return;
            }
            Swal.fire({
                theme: 'auto',
                title: String(error),
                icon: 'error',
                confirmButtonColor: confirmButtonColorOrange,
            });
        }
    }

    async function addPayments(id: string) {
        const { value: formValues } = await Swal.fire({
            theme: 'auto',
            title: addedPayments,
            confirmButtonColor: confirmButtonColorOrange,
            html: `
			<label>Summani kiriting</label>
			<br/>
            <input id="swal-summa" inputmode="numeric" type="number" class="swal2-input" placeholder="Summani kiriting">
			<br/>
			<label>Sanani kiriting</label>
			<br/>
            <input id="swal-desc" type="date" class="swal2-input" placeholder="Izoh kiriting">`,
            focusConfirm: false,
            preConfirm: () => {
                const summa = (
                    document.getElementById('swal-summa') as HTMLInputElement
                ).value;
                const date = (
                    document.getElementById('swal-desc') as HTMLInputElement
                ).value;

                if (!summa) {
                    Swal.showValidationMessage('Summani kiritish shart!');
                    return false;
                }
                if (!date) {
                    Swal.showValidationMessage('Sanani kiritish shart!');
                    return false;
                }
                return { summa, date };
            },
        });
        if (formValues) {
            Swal.fire({
                theme: 'auto',
                title: 'Ma`lumotlarni tekshiring',
                html: `<p> Summa: ${numberLocalFormat(
                    formValues.summa
                )}</p><p>Sana: ${dateLocalFormat(formValues.date)}</p>`,
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: save,
                cancelButtonText: no,
                confirmButtonColor: confirmButtonColorOrange,
                cancelButtonColor: '#d33',
            }).then(async result => {
                if (result.isConfirmed) {
                    const link = `contracts/update?id=${Number(id)}&date=${
                        formValues.date
                    }&pay=${formValues.summa}`;
                    try {
                        const response = await axiosInstance.patch(link);
                        const data = await response.data;
                        if (response.status === 201) {
                            getContaractPayments(Number(id));
                            getOneContract(Number(id));
                        } else {
                            throw new Error(
                                `${response.status}: ${data.message}`
                            );
                        }
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            Swal.fire({
                                theme: 'auto',
                                title: error.response?.data.message,
                                text: '',
                                icon: 'error',
                                confirmButtonColor: confirmButtonColorOrange,
                            });
                            return;
                        }
                        Swal.fire({
                            theme: 'auto',
                            title: String(error),
                            icon: 'error',
                            confirmButtonColor: confirmButtonColorOrange,
                        });
                    }
                }
            });
        }
    }

    async function getContaractPayments(id: number) {
        setPaymentText(loading);
        try {
            const response = await axiosInstance.get(
                `contracts/payments/${id}`
            );
            const data = await response.data;
            if (response.status === 200) {
                setPaymentsData(data);
            } else {
                setPaymentText(data.message);
                throw new Error(`${response.status}: ${data.message}`);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setPaymentText(error.response?.data.message + '...');
            }
            setPaymentsData([]);
        }
    }

    async function editPayment({ pay, contract_id, id, date }: IPaymets) {
        const {
            value: { date: d, summa: s },
        } = await Swal.fire({
            theme: 'auto',
            title: 'Toʻlovni taxrirlash',
            confirmButtonColor: confirmButtonColorOrange,
            html: `
			<label>Summani kiriting</label>
			<br/>
            <input id="swal-summa" inputmode="numeric" value=${pay} type="number" class="swal2-input" placeholder="Summani kiriting">
			<br/>
			<label>Sanani kiriting</label>
			<br/>
            <input id="swal-desc" type="date" value=${date} class="swal2-input" placeholder="Izoh kiriting">`,
            focusConfirm: false,
            preConfirm: () => {
                const summa = (
                    document.getElementById('swal-summa') as HTMLInputElement
                ).value;
                const date = (
                    document.getElementById('swal-desc') as HTMLInputElement
                ).value;

                if (!summa) {
                    Swal.showValidationMessage('Summani kiritish shart!');
                    return false;
                }
                if (!date) {
                    Swal.showValidationMessage('Sanani kiritish shart!');
                    return false;
                }
                return { summa, date };
            },
        });

        if (d && s) {
            Swal.fire({
                theme: 'auto',
                title: 'Ma`lumotlarni tekshiring',
                html: `<p> Summa: ${numberLocalFormat(
                    s
                )}</p><p>Sana: ${dateLocalFormat(d)}</p>`,
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: save,
                cancelButtonText: no,
                confirmButtonColor: confirmButtonColorOrange,
                cancelButtonColor: '#d33',
            }).then(async result => {
                if (result.isConfirmed) {
                    const json = {
                        date: d,
                        prev_pay: pay,
                        next_pay: s,
                        pay_id: id,
                        contract_id,
                    };
                    try {
                        const response = await axiosInstance.patch(
                            `contracts/up-payment`,
                            json
                        );
                        const data = await response.data;
                        if (response.status === 200) {
                            const updateData = paymentsData.map(
                                (x): IPaymets =>
                                    x.id === id
                                        ? { id, pay: s, contract_id, date: d }
                                        : x
                            );
                            Swal.fire({
                                theme: 'auto',
                                // position: 'top-end',
                                icon: 'success',
                                title: data.message,
                                showConfirmButton: false,
                                // timer: 1500,
                            });
                            setPaymentsData(updateData);
                            getOneContract(contract_id);
                        } else {
                            throw new Error(
                                `${response.status}: ${data.message}`
                            );
                        }
                    } catch (error) {
                        if (error instanceof Error) {
                            Swal.fire({
                                theme: 'auto',
                                title: error.name,
                                text: error.message,
                                icon: 'error',
                                confirmButtonColor: confirmButtonColorOrange,
                            });
                            return;
                        }
                        Swal.fire({
                            theme: 'auto',
                            title: String(error),
                            icon: 'error',
                            confirmButtonColor: confirmButtonColorOrange,
                        });
                    }
                }
            });
        }
    }

    const filterFullPaidWithDate = useCallback(() => {
        if (
            startDateFullPaid !== '' &&
            endDateFullPaid !== '' &&
            isDateSearchFullPaid
        ) {
            const start = new Date(startDateFullPaid);
            const end = new Date(endDateFullPaid);

            const data = fullPaid.filter(x => {
                const contractStart = new Date(x.start_date);
                const contractEnd = new Date(x.end_date);
                return contractStart >= start && contractEnd <= end;
            });

            if (data.length) {
                setFullPaid(data);
            } else {
                setFullPaid([]);
                setStateText(informationNotFound);
            }
            setIsDateSearchFullPaid(false);
        } else if (startDateFullPaid !== '' && endDateFullPaid !== '') {
            setIsDateSearchFullPaid(true);
            setFullPaid(inProcessReserve);
        }
    }, [
        endDateFullPaid,
        fullPaid,
        inProcessReserve,
        isDateSearchFullPaid,
        startDateFullPaid,
    ]);

    return (
        <InProcessContract
            value={{
                getContract,
                inProcess,
                inProcessTotalAnmoutfooterData,
                deleteContarct,
                addContract,
                getOneContract,
                inProcessOne,
                selectedContract,
                inProcessWithSelect,
                startDate,
                setStatrDate,
                endDate,
                setEndDate,
                filterContractWithDate,
                isDateSearch,
                setIsDateSearch,
                stateText,
                addPayments,
                getContaractPayments,
                paymentsData,
                editPayment,
                paymentText,
                fullPaid,
                startDateFullPaid,
                setStatrDateFullPaid,
                endDateFullPaid,
                setEndDateFullPaid,
                filterFullPaidWithDate,
                isDateSearchFullPaid,
                restoryContarct,
            }}>
            {children}
        </InProcessContract>
    );
};

export default ServiceContract;

// const [startDateFullPaid, setStatrDateFullPaid] = useState<string>('');
// const [endDateFullPaid, setEndDateFullPaid] = useState<string>('');

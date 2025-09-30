import { useNavigate, useParams } from 'react-router-dom';
import css from './Screen.module.css';
import useServiceContract from '../Service/useServiceContract';
import { useEffect, useState } from 'react';
import Img from '../Components/Image/Img';
import InProcessTable from '../Components/Table/InProcessTable';
import { configs } from '../Config/config';
import PaymentsList from '../Components/PaymentsList';
import { addPayment, editDelete, notFound } from '../Constant/textConstant';
import ImageFullScreen from '../Components/Model/ImageFullScreen';
import Title from '../Components/Title';

type PropsType = {
    isShowAddPay: boolean;
};

const ContractOneScreen = ({ isShowAddPay = true }: PropsType) => {
    const [imageUrl, setImageUrl] = useState<string | null>();
    const [open, setOpen] = useState<boolean>(false);
    const {
        getOneContract,
        inProcessOne,
        addPayments,
        getContaractPayments,
        paymentsData,
        editPayment,
        paymentText,
    } = useServiceContract();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getOneContract(Number(id));
        getContaractPayments(Number(id));
        // eslint-disable-next-line
    }, [id]);

    return (
        <div className={css.one_client_screen}>
            <div className={css.container}>
                <div className={css.one_client_title_box}>
                    <Title title={inProcessOne?.name as string} type='h1' />
                    {isShowAddPay && (
                        <button onClick={() => addPayments(id!)}>
                            {addPayment}
                        </button>
                    )}
                    {isShowAddPay && (
                        <button
                            onClick={() =>
                                navigate('/new-contract', {
                                    state: inProcessOne,
                                })
                            }>
                            {editDelete}
                        </button>
                    )}
                </div>
                <div className={css.one_client_header}>
                    {!inProcessOne ? (
                        <div>{notFound}</div>
                    ) : (
                        <InProcessTable inProcessOne={inProcessOne} />
                    )}
                    <div className={css.one_client_header_box_img}>
                        {inProcessOne?.images.map((x, i) => (
                            <Img
                                fnc={() => {
                                    setOpen(true);
                                    setImageUrl(
                                        `${configs.VITE_IMAGE_URL}${x}`
                                    );
                                }}
                                key={i + 1}
                                url={`${configs.VITE_IMAGE_URL}${x}`}
                            />
                        ))}
                    </div>
                </div>
                <ImageFullScreen
                    fn={() => setOpen(false)}
                    open={open}
                    url={imageUrl!}
                />
                <h1>To`lovlar</h1>
                <PaymentsList
                    paymentsData={paymentsData}
                    fn={editPayment}
                    paymentText={paymentText}
                    isShowAddPay={isShowAddPay}
                />
            </div>
        </div>
    );
};

export default ContractOneScreen;

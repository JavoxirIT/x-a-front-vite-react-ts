import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import css from '../Component.module.css';
import Input from './Input';
import InputFile from './InputFile';
import { addImage, save } from '../../Constant/textConstant';
import useServiceContract from '../../Service/useServiceContract';
import { useLocation } from 'react-router-dom';

type FormValues = {
    clientName: string;
    avto: string;
    startDate: string;
    endDate: string;
    price: number;
    addedAnmount: number;
    totalAnmount: number;
    firstPayment: number;
    remainingAmoint: number;
    images: File[];
};

const AddANewContract = () => {
    const { state } = useLocation();
    console.log('state', state);
    const { addContract } = useServiceContract();
    const [files, setFiles] = useState<File[]>([]);

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        resetField,
    } = useForm<FormValues>({
        defaultValues: {
            clientName: state?.name || '',
            startDate: state?.start_date || '',
            endDate: state?.end_date || '',
            price: state?.price || 0,
            addedAnmount: state?.added_anmount || 0,
            firstPayment: state?.first_payment || 0,
            avto: state?.avto_info || '',
        },
    });

    const price = watch('price') || 0;
    const addedAnmount = watch('addedAnmount') || 0;
    const firstPayment = watch('firstPayment') || 0;
    const totalPrice = price + addedAnmount;

    const onSubmit = (data: FormValues) => {
        const contarctId = state ? state.id : null;
        const formData = new FormData();
        // сначала обычные поля (кроме файлов)
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'images') {
                formData.append(key, String(value));
            }
        });

        // файлы только из state `files`
        files.forEach(file => {
            formData.append('images', file);
        });
        // formData.forEach((value, key) => {
        //     console.log(key, value);
        // });
        addContract(formData, contarctId);
        reset();
        resetField('images');
        setFiles([]);
    };

    const handleRemoveFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className={css.addA_new_contract_screen}>
            <div className={css.container}>
                <div className={css.form_container}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete='off'
                        className={css.added_new_form}>
                        {/* Client Name */}
                        <div className={css.input_container}>
                            <Input
                                id={1}
                                label='F.I.Sh'
                                type='text'
                                inpMode='text'
                                {...register('clientName', {
                                    required: 'F.I.Sh kiriting',
                                })}
                            />
                            {errors.clientName && (
                                <span className={css.error}>
                                    {errors.clientName.message}
                                </span>
                            )}
                        </div>

                        {/* Dates */}
                        <div className={css.input_container}>
                            <Input
                                id={3}
                                label='Berilgan sana'
                                type='date'
                                inpMode='decimal'
                                {...register('startDate', {
                                    required: 'Berilgan sana-yil-oyni kiriting',
                                })}
                            />
                            {errors.startDate && (
                                <span className={css.error}>
                                    {errors.startDate.message}
                                </span>
                            )}
                        </div>

                        <div className={css.input_container}>
                            <Input
                                id={4}
                                label='Muddat'
                                type='date'
                                inpMode='decimal'
                                {...register('endDate', {
                                    required: 'Tugash sana-yil-oyni kiriting',
                                })}
                            />
                            {errors.endDate && (
                                <span className={css.error}>
                                    {errors.endDate.message}
                                </span>
                            )}
                        </div>

                        {/* Prices */}
                        <div className={css.input_container}>
                            <Input
                                id={5}
                                label='Tan Narxi'
                                type='number'
                                inpMode='numeric'
                                {...register('price', {
                                    required: 'Tan narxini kiriting',
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message:
                                            'Tan narxi 0 dan katta bo`lishi kerak',
                                    },
                                })}
                            />
                            {errors.price && (
                                <span className={css.error}>
                                    {errors.price.message}
                                </span>
                            )}
                        </div>
                        <div className={css.input_container}>
                            <Input
                                id={6}
                                label='Qo`shilgan summa'
                                type='number'
                                inpMode='numeric'
                                disabled={price <= 0}
                                {...register('addedAnmount', {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>

                        <div className={css.input_container}>
                            <Input
                                id={7}
                                label='Jami Narxi'
                                type='number'
                                readOnly
                                inpMode='numeric'
                                value={totalPrice.toString()}
                                name={''}
                            />
                        </div>

                        <div className={css.input_container}>
                            <Input
                                id={8}
                                label='Birinchi to`lov'
                                type='number'
                                inpMode='numeric'
                                disabled={!addedAnmount}
                                {...register('firstPayment', {
                                    valueAsNumber: true,
                                    validate: v =>
                                        v <= totalPrice ||
                                        'Birinchi to`lov umumiy summadan oshmasligi kerak.',
                                })}
                            />
                            {errors.firstPayment && (
                                <span className={css.error}>
                                    {errors.firstPayment.message}
                                </span>
                            )}
                        </div>

                        <div className={css.input_container}>
                            <Input
                                id={9}
                                label='Qolgan to`lov'
                                type='number'
                                readOnly
                                inpMode='numeric'
                                value={(totalPrice < firstPayment
                                    ? 0
                                    : totalPrice -
                                      firstPayment -
                                      Number(state?.next_payment ?? 0)
                                ).toString()}
                                name={''}
                            />
                        </div>
                        {/* Car Info */}
                        <div style={{ width: '100%' }}>
                            <label className={css.label} htmlFor='2'>
                                <span className={css.label_span}>
                                    Qo`shimcha ma`lumotlar
                                </span>
                            </label>
                            <br />
                            <textarea
                                style={{ width: '100%' }}
                                id='2'
                                placeholder='Masalan moshin nomeri'
                                maxLength={1000}
                                rows={10}
                                {...register('avto')}></textarea>
                        </div>
                        {/* Files */}
                        <div className={css.input_container}>
                            <span className={css.label_span}>{addImage}</span>
                            <Controller
                                control={control}
                                name='images'
                                rules={{
                                    validate: () => {
                                        if (files.length > 10)
                                            return '10 tadan ziyod mumkin emas';
                                        if (
                                            files.some(
                                                f => f.size > 5 * 1024 * 1024
                                            )
                                        )
                                            return 'Файл kattaligi 5MB dan ziyod bo`lmasin';
                                        return true;
                                    },
                                }}
                                render={() => (
                                    <InputFile
                                        name='images'
                                        setFiles={setFiles}
                                    />
                                )}
                            />
                            {errors.images && (
                                <span className={css.error}>
                                    {errors.images.message}
                                </span>
                            )}
                        </div>

                        {/* Submit */}
                        <button data-edit className={css.add_new_form_btn}>
                            {save}
                        </button>
                    </form>
                    {/* Preview */}
                    <div className={css.preview_container}>
                        {files.map((file, index) => (
                            <div key={index} className={css.preview_box}>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`preview-${index}`}
                                    className={css.preview_img}
                                />
                                <button
                                    data-delete
                                    type='button'
                                    onClick={() => handleRemoveFile(index)}>
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddANewContract;

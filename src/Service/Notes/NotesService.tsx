import { useState, type ReactNode } from 'react';
import { NotesContext } from '../../Context/context';
import type { Notes } from '../../Interface/inteface';
import axiosInstance from '../../Config/axios';
import Swal from 'sweetalert2';
import {
    areYouSure,
    confirmButtonColorOrange,
    no,
} from '../../Constant/textConstant';

const NotesService = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataNotes, setNotes] = useState<Notes[]>([]);

    async function getNotes() {
        setLoading(true);
        try {
            const response = await axiosInstance.get('notes');
            const data = await response.data;
            if (response.status === 200) {
                setNotes(data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function addNotes(params: string) {
        if (params.length === 0) {
            Swal.fire({
                icon: 'warning',
                theme: 'auto',
                title: 'Eslatmani kiriting',
            });
            return;
        }
        try {
            const response = await axiosInstance.post('notes', {
                data: params,
            });

            const json = await response.data;
            if (response.status === 200) {
                const result = [...dataNotes, json.data].sort(
                    (a, b) => b.id - a.id
                );
                setNotes(result);
                Swal.fire({
                    icon: 'success',
                    theme: 'auto',
                    title: json.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteNotes(params: number) {
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
                    const response = await axiosInstance.delete(
                        `notes/${params}`
                    );
                    const data = await response.data;
                    if (response.status === 200) {
                        const result = dataNotes.filter(x => x.id !== params);
                        setNotes(result);
                        Swal.fire({
                            icon: 'success',
                            theme: 'auto',
                            title: data.message,
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    return (
        <NotesContext
            value={{ getNotes, addNotes, deleteNotes, dataNotes, loading }}>
            {children}
        </NotesContext>
    );
};

export default NotesService;

'use client'
import { useState, useEffect } from "react";
import ModalDeletePass from "../Modals/ModalDeletePass/ModalDeletePass";
import ToastSucess from "../Toast/Toast";
import Image from "next/image";
import {  useFetchPasswords } from "@/services/useFetchPasswords";
import Loading from "../Loading";

export default function TableBody({ setToastSuccess }) {
    const [viewPass, setViewPass] = useState({});
    //const [dataFromServer, setDataFromServer] = useState([]);
    const [copiedStatus, setCopiedStatus] = useState({});
    //modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [deletingIndex, setDeletingIndex] = useState(null);
    const { dataFromServer, loading, setDataFromServer } = useFetchPasswords()
    console.log(dataFromServer)
    const handleTogglePass = (index) => {
        setViewPass((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleCopyClipboard = (password, index) => {
        navigator.clipboard.writeText(password);
        setCopiedStatus((prevState) => ({
            ...prevState,
            [index]: true,
        }));
        setTimeout(() => {
            setCopiedStatus((prevState) => ({
                ...prevState,
                [index]: false,
            }));
        }, 3 * 1000);
    };

    if (loading) {
        return <Loading />;
    }

    if (dataFromServer.length === 0) {
        //elaborar uma tela melhor
        return (
            <ToastSucess
                isToastOpen={true}
                fail="Nenhuma senha salva, no momento."
                text="Você deve salvar uma senha para que ela possa ser exibida aqui."
            />
        )
    }

    return (
        <>
            <tbody>
                {dataFromServer.map((item, index) => (
                    <>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.labelPassword}</td>
                            <td>
                                {item.password.length > 12 ? <>{viewPass[index] ? item.password.slice(0, 12) + '...' : "••••••••"}</> : (
                                    <>{viewPass[index] ? item.password : "••••••••"}</>
                                )}
                            </td>
                            <td>
                                <Image
                                    width={100}
                                    height={100}
                                    src={viewPass[index] ? "/hide.svg" : "/view.svg"}
                                    alt="view password"
                                    title={viewPass[index] ? "Ocultar senha" : "Visualizar senha"}
                                    className="w-8 cursor-pointer"
                                    onClick={() => handleTogglePass(index)}
                                />
                            </td>
                            <td>
                                <Image
                                    width={100}
                                    height={100}
                                    src={
                                        copiedStatus[index] ? "/success.svg" : "/copy2.svg"
                                    }
                                    className="w-7 cursor-pointer"
                                    alt="Copiar"
                                    title="Copiar"
                                    onClick={() => handleCopyClipboard(item.password, index)}
                                />
                            </td>
                            <td>
                                <Image
                                    width={100}
                                    height={100}
                                    src="/trash.svg" alt="Excluir a senha" title="Excluir"
                                    className="w-7 cursor-pointer"
                                    onClick={() => {
                                        setDeletingIndex(index);
                                        toggle()
                                        setModal(true)
                                    }}
                                />
                            </td>
                        </tr>
                        <ModalDeletePass
                            passwordView={item.password}
                            isOpen={modal}
                            toggle={toggle}
                            index={deletingIndex}
                            setToastSuccess={setToastSuccess}
                            setDataFromServer={setDataFromServer}
                        />
                    </>
                )) || Array.isArray(dataFromServer)}
            </tbody>

        </>
    );
}

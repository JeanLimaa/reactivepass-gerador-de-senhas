'use client';
import { useTableFunctions } from "@/hooks/useTableFunctions";
import ModalDeletePass from "../Modals/ModalDeletePass/ModalDeletePass";
import Image from "next/image";
import React from "react";

export default function TableBodyViewPass({ setToastSuccess }) {
    const {
        dataFromServer, setDataFromServer, deletingIndex, setDeletingIndex, toggle,
        modal, setModal, copiedStatus, viewPass, handleTogglePass, handleCopyClipboard
    } = useTableFunctions();

    return (
        <tbody>
            {dataFromServer.map((item, index) => (
                <React.Fragment key={index}>
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
                </React.Fragment>
            ))}
        </tbody>
    );
}
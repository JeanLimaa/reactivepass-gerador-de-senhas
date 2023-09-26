import { useState, useEffect } from "react";
import axios from "axios";
import ModalDeletePass from "../Modals/ModalDeletePass/ModalDeletePass";

export default function TableBody({ setToastSuccess }) {
    const [viewPass, setViewPass] = useState({});
    const [dataFromServer, setDataFromServer] = useState([]);
    const [copiedStatus, setCopiedStatus] = useState({});
    //modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/profile')
            .then((res) => {
                setDataFromServer(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

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

    if (dataFromServer.length === 0) {
        //elaborar uma tela melhor
        return (
            <>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Exemplo</td>
                        <td>123</td>
                        <td>Vazio</td>
                        <td>Vazio</td>
                    </tr>
                </tbody>
            </>
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
                                <img
                                    src={viewPass[index] ? "/hide.svg" : "/view.svg"}
                                    alt="view password"
                                    title={viewPass[index] ? "Ocultar senha" : "Visualizar senha"}
                                    className="w-8 cursor-pointer"
                                    onClick={() => handleTogglePass(index)}
                                />
                            </td>
                            <td>
                                <img
                                    src={
                                        copiedStatus[index] ? "./success.svg" : "./copy2.svg"
                                    }
                                    className="cursor-pointer"
                                    alt="Copiar"
                                    title="Copiar"
                                    onClick={() => handleCopyClipboard(item.password, index)}
                                />
                            </td>
                            <td>
                                <img src="/trash.svg" alt="Excluir a senha" title="Excluir"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        toggle()
                                        setModal(true)
                                    }}//onClick={() => handleDeletePassword(index)}
                                />
                            </td>
                        </tr>
                        <ModalDeletePass
                            passwordView={item.password}
                            isOpen={modal}
                            toggle={toggle}
                            index={index}
                            labelPassword={item.labelPassword}
                            setDataFromServer={setDataFromServer}
                            setToastSuccess={setToastSuccess}
                        />
                    </>
                ))}
            </tbody>

        </>
    );
}

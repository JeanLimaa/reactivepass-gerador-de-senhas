import { useState, } from "react";
import { useFetchPasswords } from "@/hooks/useFetchPasswords";

export function useTableFunctions(){
    const [viewPass, setViewPass] = useState({});
    const [copiedStatus, setCopiedStatus] = useState({});
    //modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [deletingIndex, setDeletingIndex] = useState(null);
    const { dataFromServer, loading, setDataFromServer, error } = useFetchPasswords()

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

    return {
        dataFromServer, loading, setDataFromServer, error, deletingIndex, setDeletingIndex, toggle,
        modal, setModal, copiedStatus, viewPass, handleTogglePass, handleCopyClipboard
    }
}
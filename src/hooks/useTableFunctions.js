import { useState, } from "react";
import { useFetchPasswords } from "@/hooks/useFetchPasswords";

export function useTableFunctions(){
    const [viewPass, setViewPass] = useState({});
    const [copiedStatus, setCopiedStatus] = useState({});
    //modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [deletingIndex, setDeletingIndex] = useState(null);
    const { passwordList, loading, setPasswordList, error } = useFetchPasswords()

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
        passwordList, loading, setPasswordList, error, deletingIndex, setDeletingIndex, toggle,
        modal, setModal, copiedStatus, viewPass, handleTogglePass, handleCopyClipboard
    }
}
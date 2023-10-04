import { useState } from "react";
import generatePass from "@/app/api/generatepass/generatePass";

export function useGenerationFunctions() {
    //const [copiedStatus, setCopiedStatus] = useState(false)
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [passLength, setPassLength] = useState(12) //tamanho padrão da senha
    const [checkboxState, setCheckboxState] = useState({ //definindo os estados iniciais das checkbox
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    
    //essa função é feita apenas para evitar repetição; 
    function generatePassword(length) {
        return generatePass(
            length,
            checkboxState.uppercase,
            checkboxState.lowercase,
            checkboxState.numbers,
            checkboxState.symbols
        )
    }

    const [valuePass, setValuePass] = useState('');

    //observar novo valor da senha
    function handleValuePass(ev) {
        const newValue = ev.target.value;

        if (newValue.length >= 5) {
            setValuePass(newValue);
            const newLength = newValue.length;
            setPassLength(newLength);
        } else {
            const newLength = 5;
            setValuePass(generatePassword(newLength));
            setPassLength(newLength);
        }
    }

    // Função para lidar com a mudança no estado do checkbox
    function handleCheckboxChange(name, isChecked) {
        const updatedCheckboxState = { ...checkboxState, [name]: isChecked };

        // Verificar se todas as opções estão desativadas e a opção que está sendo desativada
        const allOptionsDisabled = Object.values(updatedCheckboxState).every(value => value === false);

        // Se todas as opções estiverem desativadas e a opção atual estiver sendo desativada, não permitir
        if (allOptionsDisabled && !isChecked) {
            return;
        }
        setCheckboxState(updatedCheckboxState);
    }
    return {
        checkboxState,
        generatePassword,
        handleCheckboxChange,
        handleValuePass,
        isToastOpen,
        passLength,
        setIsToastOpen,
        setValuePass,
        valuePass,
        setPassLength
    }
}
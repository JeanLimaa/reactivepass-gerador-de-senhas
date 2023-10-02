'use client'
import { useEffect, useState } from "react"
import Button from "../Buttons/Button"
import generatePass from "@/app/api/password/generatePass"
import CheckboxPersonalize from "./CheckboxPersonalize"
import { useSession } from "next-auth/react"
import ModalSavePass from "@/components/Modals/ModalSavePass/ModalSavePass";
import ToastSucessSavePass from '../Toast/Toast';
import Image from "next/image"

export default function SectionGenerate() {
    const { status } = useSession();
    const [copiedStatus, setCopiedStatus] = useState(false)
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
    //alterações no comprimento da senha
    function handleLengthChange(ev) {
        let newValue = parseInt(ev.target.value);
        if (newValue > 500) newValue = 500;
        else if (newValue < 5) newValue = 5;
        else if (isNaN(newValue) || typeof newValue === 'undefined' || newValue === null || newValue < 0) newValue = 12;
        setPassLength(newValue);
        setValuePass(generatePassword(newValue));
    }
    //copiar a senha
    function handleCopyCliboard() {
        navigator.clipboard.writeText(valuePass)
        setCopiedStatus(true);
        setTimeout(() => {
            setCopiedStatus(false);
        }, 3 * 1000)
    }
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

    //gerar uma nova senha sempre que der reload
    useEffect(() => {
        setValuePass(generatePassword(passLength))
    }, [])

    return (
        <>
            <section id="section-generate">
                <form method="post" className="text-center min-h-screen flex justify-center items-center flex-col gap-12 p-24 max-sm:p-3">
                    <h1 className="text-5xl ">Gerador de senhas</h1>
                    <h3 className="text-2xl font-light">Personalize a sua senha facilmente, antes de gerá-lá. Aqui você pode gerar a sua senha forte, de modo gratuito, online e instantâneamente.</h3>
                    <div className="bg-white w-3/5 max-sm:w-full flex flex-col p-3 pb-6 rounded-lg shadow-xl border-b-4 border-orange-500">
                        <h2 className="border-b mb-6 font-medium text-lg p-1">Personalize a sua senha</h2>
                        <CheckboxPersonalize label="Letras maiúsculas" name='uppercase' isChecked={checkboxState.uppercase} onCheckBoxChange={handleCheckboxChange} />
                        <CheckboxPersonalize label="Letras minúsculas" name="lowercase" isChecked={checkboxState.lowercase} onCheckBoxChange={handleCheckboxChange} />
                        <CheckboxPersonalize label="Números" name="numbers" isChecked={checkboxState.numbers} onCheckBoxChange={handleCheckboxChange} />
                        <CheckboxPersonalize label="Símbolos" name="symbols" isChecked={checkboxState.symbols} onCheckBoxChange={handleCheckboxChange} />
                        <div className="text-start p-3 bg-gray-50 rounded-lg w-2/3">
                            <h2>Número de caracteres</h2>
                            <div className="flex gap-10 pt-3 items-center">
                                <input
                                    type="number"
                                    name="Comprimento da senha"
                                    min={5}
                                    max={500}
                                    value={passLength}
                                    onChange={ev => handleLengthChange(ev)}
                                    className="w-2/6 border-2 text-center p-2 rounded-lg border-orange-500"
                                />
                                <label className="w-full relative">
                                    <input
                                        type="range"
                                        name="Comprimento da senha"
                                        id="length-pass"
                                        min={5}
                                        max={500}
                                        value={passLength}
                                        onChange={ev => handleLengthChange(ev)}
                                        className="w-full bg-gray-300 cursor-pointer"
                                    />
                                    <span className="absolute left-0 top-6 text-xs text-gray-600">Mínimo: 5</span>
                                    <span className="absolute right-0 top-6 text-xs text-gray-600">Máximo: 500</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/5 max-sm:w-full relative flex items-center">
                        <input
                            value={valuePass}
                            required
                            name="passwordGenerated"
                            id="passwordGenerated"
                            className="w-full h-14 rounded-md bg-white border-gray-200 p-4"
                            onChange={ev => handleValuePass(ev)}
                        />
                        <div className="absolute right-0 pr-12">
                            <Image src="/refresh.svg"
                                alt="Gerar nova senha"
                                title="Gerar nova senha"
                                width={43}
                                height={43}
                                className=" cursor-pointer"
                                onClick={() => setValuePass(generatePassword(passLength))} />
                        </div>
                        <div className="absolute right-0 pr-2">
                            <Image src={copiedStatus ? "/success.svg" : "./copy2.svg"}
                                alt="copy"
                                className="cursor-pointer"
                                title="Copiar senha"
                                onClick={() => handleCopyCliboard()}
                                width={28}
                                height={28}
                            />
                        </div>
                    </div>
                    <div className="flex w-3/5 gap-16 max-sm:w-full max-sm:gap-10">
                        <Button text="Gerar" type="button" onClick={() =>
                            setValuePass(generatePassword(passLength))
                        } />
                        <ModalSavePass
                            disabled={status === 'authenticated' ? false : true}
                            valuePass={valuePass}
                            isToastOpen={isToastOpen}
                            setIsToastOpen={setIsToastOpen}
                        />
                    </div>
                </form>
            </section>
            <ToastSucessSavePass isToastOpen={isToastOpen} text="Senha salva com sucesso!" />
        </>
    )
}
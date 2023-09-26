'use client'
import { Toast, ToastHeader, ToastBody } from "reactstrap"

export default function ToastSucess( { isToastOpen, text } ){

    return (
        <div className="fixed left-0 bottom-0 m-4">
            <Toast isOpen={isToastOpen} >
                <ToastHeader>
                    Sucesso!
                </ToastHeader>
                <ToastBody className="text-lg  flex gap-2 items-center">
                    <img src="/success.svg" alt={text} title="sucess" className="w-10"/>
                   {/*  Senha salva com sucesso! */}
                   {text}
                </ToastBody>
            </Toast>
        </div>
    )
}
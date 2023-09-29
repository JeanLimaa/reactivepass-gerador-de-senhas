'use client'
import { Table } from "reactstrap";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import ToastSucess from "../Toast/Toast";
import { useState } from "react";


export default function TableProfile() {
    const [isToastOpen, setIsToastOpen] = useState(false)
/*     return(
            <h1 className="text-4xl text-center font-serif">Oops... Você ainda não salvou nada aqui.</h1>
    ) */
    return (
        <>
            <Table
                striped
                dark
                hover
                responsive
                size=""
            >
                <TableHead />
                <TableBody setToastSuccess={setIsToastOpen} />
            </Table>
            <ToastSucess isToastOpen={isToastOpen} text="Sucesso ao apagar a senha!" />
        </>
    )
}
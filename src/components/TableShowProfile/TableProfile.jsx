'use client'
import { Table } from "reactstrap";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import ToastSucess from "../Toast/ToastSucess";
import { useState } from "react";

export default function TableProfile() {
    const [isToastOpen, setIsToastOpen] = useState(false)

    return (
        <>
            <Table
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
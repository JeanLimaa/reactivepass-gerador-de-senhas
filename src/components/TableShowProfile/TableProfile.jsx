'use client'
import { Table } from "reactstrap";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Toast from "../Toast/Toast";
import { useState } from "react";

export default function TableProfile() {
    const [isToastOpen, setIsToastOpen] = useState(false)

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
            <Toast isToastOpen={isToastOpen} text="Sucesso ao apagar a senha!" />
        </>
    )
}
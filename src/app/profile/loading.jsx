'use client'
import SpinnerProfile from "@/components/Spinner/SpinnerProfile";

export default function loading() {
    return (
        <main className="flex items-center justify-center gap-4 flex-col" style={{ minHeight: "80vh" }}>
            <h1 className="text-3xl font-medium">Carregando...</h1>
            <SpinnerProfile width="5.5rem" heigth="5.5rem" />
        </main>
    )
}
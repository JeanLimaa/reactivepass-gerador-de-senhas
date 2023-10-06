import Image from "next/image";

export default function LinkRepository() {
    return (
        <a 
            href="https://github.com/JeanLimaa/reactivepass-gerador-de-senhas" 
            target="_blank" 
            className="flex items-center gap-2 border-2 p-1 rounded duration-custom ease-custom hover:bg-gray-500 hover:text-white"
            >
                <div className="w-8">
                <Image src="/github.svg" width={100} height={100} alt="link para o repositorio" />
                </div>
            <h2>Repositório</h2>
        </a>
    )
}
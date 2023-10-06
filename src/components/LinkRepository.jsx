import Image from "next/image";

export default function LinkRepository() {
    return (
        <a 
            href="https://github.com/JeanLimaa/reactivepass-gerador-de-senhas" 
            target="_blank" 
            className="flex items-center gap-2 border-2 p-1 rounded duration-custom ease-custom hover:bg-gray-500 hover:text-white">
            <Image src="/github.svg" width={33} height={33} />
            <h2>Repositório</h2>
        </a>
    )
}
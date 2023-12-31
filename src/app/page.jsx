import Link from "next/link"
import SectionGenerate from "@/components/SectionGenerate/SectionGenerate"
import Button from "@/components/Buttons/Button";
import LinkRepository from "@/components/LinkRepository";

export default function Home() {
  return (
    <main className=" bg-gray-100 relative">
      <section className="flex items-center text-center flex-col gap-12 p-16 font-medium bg-white">
        <span className="text-orange-500 font-semibold">GERAÇÃO E ARMAZENAMENTO DE SENHAS SEGURAS</span>
        <h1 className="text-5xl">Crie senhas seguras, de maneira fácil e gratuita!</h1>
        <span className="text-xl">Você pode armazena-lás aqui, apenas fazendo seu cadastro e as consultando quando desejar!</span>
        <div className="flex items-center gap-6">
          <Link href="#section-generate">
            <Button text="Começar agora" className="hover:bg-orange-400" />
          </Link>
          <LinkRepository />
        </div>
      </section>
      <SectionGenerate />
    </main>
  );
}

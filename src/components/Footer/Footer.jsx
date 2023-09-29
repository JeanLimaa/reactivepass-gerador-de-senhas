import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className="flex items-center justify-evenly max-sm:justify-between p-4 border-t-2 max-[425px]:flex-col max-[425px]:gap-8">
            <article className="max-w-[35vw] max-sm:max-w-[45vw] max-[425px]:max-w-[100vw]">
                <strong><h1 className="text-xl mb-2">Sobre</h1></strong>
                <p>
                    ReactivePass é um gerador de senhas fortes e seguro, que permite que você crie e armazene senhas com facilidade.
                    Suas senhas são criptografadas para garantir a máxima segurança.
                </p>
            </article>
            <div className="flex flex-col gap-1">
                {/* midias sociais */}
                <h2 className="text-md mb-2 font-medium font-sans max-sm:text-base">Desenvolvido por Jean Lima.</h2>
                <nav className="flex gap-4 justify-center">
                    <Link target="_blank" href="mailto:jeansantoslima17@gmail.com" className="w-9">
                        <Image src="/email.svg" alt="Email de Jean" title="Email de Jean" layout="responsive" height={100} width={100} />
                    </Link>
                    <Link target="_blank" href="https://github.com/JeanLimaa" className="w-9">
                        <Image src="/github.svg" alt="Github de Jean" title="Github de Jean" layout="responsive" height={100} width={100} />
                    </Link>
                    <Link target="_blank" href="https://www.linkedin.com/in/jeanlimaa/" className="w-9">
                        <Image src="/linkedin.svg" alt="Linkedin de Jean" title="Linkedin de Jean" layout="responsive" height={100} width={100} />
                    </Link>
                </nav>
            </div>
        </footer>
    )
}
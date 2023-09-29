import Link from "next/link"

export default function Footer() {
    return (
        <footer className="flex  items-center justify-evenly p-4 border-t-2">
                <article className="max-w-[30vw]">
                    <strong><h1 className="text-xl mb-2">Sobre</h1></strong>
                    <p>
                        ReactivePass é um gerador de senhas fortes e seguro, que permite que você crie e armazene senhas com facilidade.
                        Suas senhas são criptografadas para garantir a máxima segurança.
                    </p>
                </article>
            <div className="flex flex-col gap-2">
                {/* midias sociais */}
                <h2 className="text-md mt-4 mb-2 font-medium font-sans max-sm:text-base">Desenvolvido por Jean Lima.</h2>
                <nav className="flex justify-center gap-4">
                    <img src="/contact.svg" alt="Contatos de Jean" title="Contatos de Jean" width="1" height="1"/>
                    <Link target="_blank" href="mailto:jeansantoslima17@gmail.com">
                        <img src="/email.svg" alt="Email de Jean" title="Email de Jean"/> 
                    </Link>
                    <Link target="_blank" href="https://github.com/JeanLimaa">
                        <img src="/github.svg" alt="Github de Jean" title="Github de Jean" />
                    </Link>
                    <Link target="_blank" href="https://www.linkedin.com/in/jeanlimaa/">
                        <img src="/linkedin.svg" alt="Linkedin de Jean" title="Linkedin de Jean"/>
                    </Link>
                </nav>
            </div>
        </footer>
    )
}
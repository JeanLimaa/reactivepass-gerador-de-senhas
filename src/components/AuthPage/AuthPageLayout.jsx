import Link from "next/link";

export default function AuthPageLayout({ children, typeOfForm }) {
    return (
        <main className="min-h-[75vh] flex items-center justify-evenly bg-gray-100 p-8 max-md:justify-center max-sm:p-0 max-md:flex-col-reverse">
            <div className="bg-gray-50 rounded-lg">
                <div className="p-3">
                    <h2 className="text-3xl font-medium">{typeOfForm === 'login' ? "Login" : 'Register'}</h2>
                    <span className="text-sm text-zinc-500 text-center">
                        {typeOfForm === 'login' ? "Novo aqui?" : 'Já possui cadastro?'}
                        <Link href={typeOfForm === 'login' ? "/register" : "/login"} className="text-blue-600 text-md">
                            {typeOfForm === 'login' ? " Cadastre-se" : ' Faça login'}
                        </Link>
                    </span>
                </div>
                {children}
            </div>
            <aside className="text-center">
                <div className="flex items-center ">
                    <h1 className="text-6xl max-xl:text-5xl">ReactivePass</h1>
                    <img src="/lock.svg" alt="cadeado logo" className="w-14" />
                </div>
                <h4 className="text-lg max-xl:text-md border-b-2 pb-4">Seja bem vindo! realize seu {typeOfForm === 'login' ? "login" : 'cadastro'}.</h4>
            </aside>
        </main>
    )
}
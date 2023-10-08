'use client'
import React from "react";
import HeaderComponent from "./HeaderComponent";
import LinkComponent from "./LinkComponent";
import { useSession } from "next-auth/react";

export default function Header() {
  const { status, data: session } = useSession();

  if (status !== 'authenticated') {
    return (
      <HeaderComponent>
        <nav className='flex gap-6 max-[425px]:gap-3'>
          <LinkComponent href="/login"
            color="bg-slate-300 hover:bg-slate-400"
            imgSrc="/login.svg"
            titleImg="Logar"
          >
            Login
          </LinkComponent>
          <LinkComponent href="/register"
            color="border-1 border-orange-400 bg-orange-300 hover:bg-orange-400"
            imgSrc="/register.svg"
            titleImg="Registrar"
          >
            Registrar
          </LinkComponent>
        </nav>
      </HeaderComponent>
    )
  }

  return (
    <HeaderComponent>
      <nav className='flex gap-6 max-[425px]:gap-3'>
        <LinkComponent href="/profile"
          capitalize={true}
          color="bg-slate-300 hover:bg-slate-400"
          imgSrc="/user.svg"
          titleImg="Perfil">
          {`${session?.user?.name.split(" ")[0]}`}
        </LinkComponent>
        <LinkComponent href=""
          color="hover:bg-red-600"
          imgSrc="/logout.svg"
          titleImg="Sair"
          logoff={true}
        >
        </LinkComponent>
      </nav>
    </HeaderComponent>
  );
}

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
            color="hover:bg-blue-500 bg-blue-400"
            imgSrc="/login.svg"
            titleImg="Logar"
          >
            Sign In
          </LinkComponent>
          <LinkComponent href="/register"
            color="bg-orange-400 hover:bg-orange-500"
            imgSrc="/register.svg"
            titleImg="Registrar"
          >
            Sign Up
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
          color="bg-orange-400 hover:bg-orange-500"
          imgSrc="/user.svg"
          titleImg="Perfil">
          {`${session?.user?.name.split(" ")[0]}`}
        </LinkComponent>
        <LinkComponent href=""
          color="bg-red-500 hover:bg-red-600"
          imgSrc="/logout.svg"
          titleImg="Sair"
          logoff={true}
        >
          Logout
        </LinkComponent>
      </nav>
    </HeaderComponent>
  );
}

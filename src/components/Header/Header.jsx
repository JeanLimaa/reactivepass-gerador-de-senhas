"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Button from "../Buttons/DefaultButton";
import HeaderComponent from "./HeaderComponent";

export default function Header() {
  const { status, data: session } = useSession();

  if (status !== "authenticated") {
    return (
      <HeaderComponent>
        <Link href="/">
          <h2 className="text-xl">ReactivePass</h2>
        </Link>
        <nav className='flex gap-6 items-center'>
          <Link href="/login" className="bg-blue-400 p-2 rounded-md hover:bg-blue-500 hover:text-white duration-custom delay-custom">
            Sign in
          </Link>
          <Link href="/register"
            className="bg-orange-400 p-2 rounded-md hover:bg-orange-500 hover:text-white duration-custom delay-custom">
            Sign Up
          </Link>
        </nav>
      </HeaderComponent>
    )
  }

  return (
    <HeaderComponent>
      <Link href="/">
        <h2 className="text-xl">ReactivePass</h2>
      </Link>
      <nav className='flex gap-6'>
        <Link href="/profile">
          <span className="bg-orange-400 hover:bg-orange-500 items-center px-3 rounded-md p-2 flex gap-2 cursor-pointer">
            <img src="/user.svg" alt="perfil" title="Perfil" />
            <h3 className="capitalize">
              {`${session?.user?.name.split(" ")[0]}`}
            </h3>
          </span>
        </Link>
        <Button
          text="Sign out"
          className="bg-red-600 hover:bg-red-700 text-white rounded px-4 cursor-pointer"
          onClick={() => signOut()}
        />
      </nav>
    </HeaderComponent>
  );
}

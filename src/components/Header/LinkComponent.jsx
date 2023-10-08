'use client'
import { signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

export default function LinkComponent({href, color, imgSrc, titleImg, onClick, capitalize, logoff, children}) {
    
    return (
        <Link href={href} onClick={logoff ? () => signOut() : onClick}>
            <span className={`${color} duration-custom ease-custom hover:text-white items-center rounded-md p-2 flex gap-2 cursor-pointer shadow-md hover:shadow-lg`}>
                <Image src={imgSrc} alt={titleImg} title={titleImg} width={28} height={28} />
                <h3 className={capitalize && "capitalize"}>
                    {children}
                </h3>
            </span>
        </Link>
    )
}
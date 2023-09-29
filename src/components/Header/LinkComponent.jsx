'use client'
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function LinkComponent({href, color, imgSrc, titleImg, onClick, capitalize, logoff, children}) {
    
    return (
        <Link href={href} onClick={logoff ? () => signOut() : onClick}>
            <span className={`${color} duration-custom ease-custom hover:text-white items-center rounded-md p-2 flex gap-2 cursor-pointer>`}>
                <img src={imgSrc} alt={titleImg} title={titleImg} />
                <h3 className={capitalize && "capitalize"}>
                    {children}
                </h3>
            </span>
        </Link>
    )
}
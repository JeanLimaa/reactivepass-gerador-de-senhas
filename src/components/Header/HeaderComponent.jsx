import Link from "next/link"
import Image from "next/image"

export default function HeaderComponent({ children }) {
    return (
        <header className='flex justify-between p-6 max-[425px]:p-3 border-b border-gray-400 bg-gray-100 items-center'>
            <Link href="/" className="flex items-center">
                <h2 className="text-xl">ReactivePass</h2>
                <div className="w-6">
                    <Image src="lock.svg" alt="logo" width={100} height={100}/>
                </div>
            </Link>
            {children}
        </header>
    )
}
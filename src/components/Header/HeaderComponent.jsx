export default function HeaderComponent({children}){
    return(
        <header className='flex justify-between p-6 border-b border-gray-400 bg-slate-200 items-center'>
            {children}
        </header>
    )
}
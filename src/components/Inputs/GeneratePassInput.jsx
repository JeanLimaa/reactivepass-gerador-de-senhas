import Image from "next/image";

export default function Input({ inputType, placeholder, scr, altIcon, name, onChange, value }) {
    return (
        <>
            <div className="flex relative items-center">
                <input
                    name={name}
                    id={name}
                    type={inputType}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    className="h-10 w-full p-2 pl-10 rounded-sm"
                />
                <div className="absolute p-2">
                    <Image src={scr} alt={altIcon} width="24" height="24" />
                </div>
            </div>
        </>
    )
}
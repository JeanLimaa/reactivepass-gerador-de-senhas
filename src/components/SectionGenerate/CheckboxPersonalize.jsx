'use client'
import Image from "next/image";

export default function CheckboxPersonalize({ name, label, onCheckBoxChange, isChecked }) {
    function handleCheckbox() {
        onCheckBoxChange(name, !isChecked)
    }

    return (
        <div className="flex gap-2 m-3 items-center transition-colors duration-500 ease-in-out">
            <Image
                width={100}
                height={100}
                src={isChecked ? "/toggle-right.svg" : "/toggle-left.svg"}
                name={name}
                alt={name}
                id={name}
                checked={isChecked || false}
                onClick={handleCheckbox}
                className={`w-12 cursor-pointer`}
            />
            <span> {label}</span>
        </div>
    )
}
'use client'

/* import { useState } from "react" */
import Image from "next/image";

export default function CheckboxPersonalize({ name, label, onCheckBoxChange, isChecked }) {

    /* const [checkbox, setCheckbox] = useState(true); */
    function handleCheckbox() {
        /* setCheckbox(!checkbox) */
        onCheckBoxChange(name, !isChecked)
    }

    return (
        <div className="flex gap-2 m-3 items-center transition-colors duration-500 ease-in-out">
            <Image
                width={100}
                height={100}
                src={isChecked ? "/toggle-right.svg" : "/toggle-left.svg"}
                name={name}
                id={name}
                checked={isChecked || false}
                onClick={handleCheckbox}
                className={`w-12 cursor-pointer`}
            />
            <span> {label}</span>
        </div>
    )
}
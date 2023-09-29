'use client'

import { useState } from "react"

export default function CheckboxPersonalize({ name, label, onCheckBoxChange }) {

    const [checkbox, setCheckbox] = useState(true);
    function handleCheckbox() {
        setCheckbox(!checkbox)
        onCheckBoxChange(name, !checkbox)
    }

    return (
        <div className="flex gap-2 m-3">
            <input type="checkbox"
                name={name}
                id={name}
                checked={checkbox || false}
                onChange={handleCheckbox}
                className="w-5 hover:bg-orange-400 bg-orange-500 cursor-pointer  "
            />
            <span> {label}</span>
        </div>
    )
}
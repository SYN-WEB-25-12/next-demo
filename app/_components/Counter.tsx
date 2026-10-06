"use client"

import { useState } from "react";

export default function Counter() {
    const [value, setValue] = useState(0)

    return (
        <>
            <p>Count: {value}</p>
            <button onClick={() => setValue(value + 1)}>Inc</button>
        </>
    )
}
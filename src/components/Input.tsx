import React from 'react'
import { InputHTMLAttributes } from "react"

export interface InputProp {
    inputType?: string
    placeholder?: string
    className?: string
    onChange?: React.ChangeEventHandler<HTMLInputEvent>
}
export const Input: React.FC<InputProp> = ({inputType, placeholder, className, onChange}) => {
    return(
        <input 
        type={inputType}
        placeholder={placeholder}
        className={className + " block rounded-full border-0 py-2.5 pl-7 my-1.5 pr-5 md:pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:outline-none focus:ring-inset  sm:text-sm sm:leading-6"}
        onChange={onChange}
        />
    ) 
}
export default Input
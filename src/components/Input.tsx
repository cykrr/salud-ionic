import React from 'react'
import { InputHTMLAttributes } from "react"

export interface InputProp {
    id?: string
    inputType?: string
    placeholder?: string
    className?: string
    onChange?: React.ChangeEventHandler<HTMLInputEvent>
}
export const Input: React.FC<InputProp> = ({id, inputType, placeholder, className, onChange}) => {
    return(
        <input 
        id={id}
        type={inputType}
        placeholder={placeholder}
        className={className + " block rounded-full border-0 py-2.5 pl-7 my-1.5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:outline-none focus:ring-inset"}
        onChange={onChange}
        />
    ) 
}
export default Input
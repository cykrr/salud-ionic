import { JSX, IonInput } from '@ionic/react'
import React from 'react'
import { InputHTMLAttributes } from "react"

export default function Input(args: InputProp) {
    return(
        <input 
        id={args.id}
        type={args.inputType}
        placeholder={args.placeholder}
        className={
            args.className ? args.className : "" + 
                ((args.inputType != "submit") ? 
                " block rounded-full border-0 py-2.5 pl-7 my-1.5 pr-5 \
                 text-gray-900 ring-1 ring-inset ring-gray-300 \
                  focus:ring-2 focus:outline-none focus:ring-inset"
                : " ")
        }
        onChange={args.onChange}
        value={args.value}
        ></input>
    ) 
}

export interface InputProp {
    id?: string
    inputType?: "submit" | "text" | "password" | undefined
    placeholder?: string
    className?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    value?: string
    children?: React.ReactNode
}
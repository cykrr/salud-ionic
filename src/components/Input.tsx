import React from 'react'

export default function Input(args: InputProp) {
    return(
        <input 
            id={args.id}
            type={args.inputType}
            placeholder={args.placeholder}
            className={ args.className + " block rounded-full border-0 py-2.5 pl-7 my-1.5 pr-5 \
                    text-gray-900 dark:bg-grey-200 ring-1 ring-inset ring-gray-300 \
                    focus:ring-2 focus:outline-none focus:ring-inset"
            }
            onChange={args.onChange}
            value={args.value}
            defaultValue={args.defaultValue}
            maxLength={args.maxLength}
        />
    ) 
}

export interface InputProp {
    id?: string
    inputType?: "submit" | "text" | "password" | "number" | undefined
    placeholder?: string
    className?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    value?: string
    defaultValue?: string
    children?: React.ReactNode
    maxLength?: number
}
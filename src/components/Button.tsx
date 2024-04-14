import React from 'react';
import { IonButton } from '@ionic/react'; // Import the necessary package

type ButtonArgs = {
    children?: React.ReactNode
    btnType?: "submit" | "reset" | "button" | undefined 
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button(args: ButtonArgs) {
    return (
        <button 
            className={args.className + " bg-purple-500 hover:bg-purple-400 ease-in duration-100 rounded-2xl p-3 px-5 text-white font-light"}
            type={args.btnType ? args.btnType : "button"}
            onClick={args.onClick}
        >{args.children}</button>)
}
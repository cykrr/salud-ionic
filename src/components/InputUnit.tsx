import React from 'react'
import { InputProp } from "./Input";

type InputUnitProps = InputProp & { unit: string };

export const InputUnit: React.FC<InputUnitProps> = ({inputType, placeholder, className, onChange, unit}) => {
    return (
        <div className={className + "flex flex-row gap-4 rounded-full border-0 py-2.5 px-7 my-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus:ring-inset sm:text-sm sm:leading-6"}>
            <input 
                type={inputType}
                placeholder={placeholder}
                className="focus:outline-none inline w-full"
                onChange={onChange}
            />
            <div className="inline">{unit}</div>
        </div>
    );
}

export default InputUnit;
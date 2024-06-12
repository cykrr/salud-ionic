import { useLayoutEffect, useState } from 'react'

export interface InputProp {
    id?: string
    inputType?: "submit" | "text" | "password" | "number" | undefined
    label: string
    className?: string
    defaultValue?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    children?: React.ReactNode
    maxLength?: number
}

export default function Input(args: InputProp) {
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleFocus = () => {
      setFocused(true);
    };
  
    const handleBlur = () => {
      setFocused(false);
    };

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };

    useLayoutEffect(() => {
        if (args.defaultValue) {
            setInputValue(args.defaultValue);
        }
        console.log(args.defaultValue)
    }, [args.defaultValue]);

    return (
        <>
            <div className={`floating-input ${focused ? 'focused' : ''} ${inputValue ? 'filled' : ''}`}>
                <input  
                    onFocus={handleFocus} 
                    onBlur={handleBlur} 
                    onChange={(e) => {
                        handleChange(e);
                        args.onChange && args.onChange(e);
                    }}
                    id={args.id}
                    type={args.inputType}
                    defaultValue={args.defaultValue}
                    maxLength={args.maxLength}
                />
                <label>{args.label}</label>
            </div>

            <style>{`
                .floating-input {
                    position: relative;
                    width: 100%;
                    height: 52px;
                }

                .floating-input label {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    pointer-events: none;
                    transition: 0.2s ease all;
                    color: #999;
                    transform: translate(0%, -50%);
                    margin-left: 1.6rem;
                    padding-left: 0.15rem;
                    padding-right: 0.15rem;
                }

                .floating-input input {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #ccc;
                    border-radius: 9999px;
                    padding-left: 1.75rem;
                    padding-right: 1.25rem;
                    padding-top: 1.05rem;
                    outline: none;
                }

                .floating-input.focused label {
                    top: 15%;
                    transform: translate(0, 0);
                    font-size: 13px;
                    color: #5833FF;
                }

                .floating-input.focused input {
                    border-color: #5833FF;
                    transition: 0.2s ease all;
                }

                .floating-input.filled label {
                    top: 15%;
                    transform: translate(0, 0);
                    font-size: 13px;
                }
            `}</style>
        </>
    );
}
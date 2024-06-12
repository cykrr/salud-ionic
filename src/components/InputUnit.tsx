import { useLayoutEffect, useState } from 'react'
import { InputProp } from "./Input";

type InputUnitProps = InputProp & { unit: string };

export default function InputUnit(args: InputUnitProps) {
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
                <div className="inline">{args.unit}</div>
                <label>{args.label}</label>
            </div>

            <style>{`
                .floating-input {
                    display: flex;
                    width: 100%;
                    flex-direction: row;
                    align-items: center;
                    gap: 1rem;
                    position: relative;
                    height: 52px;
                    border: 1px solid #ccc;
                    border-radius: 9999px;
                    padding-right: 1.25rem;
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
                    padding-left: 1.75rem;
                    padding-right: 1.25rem;
                    padding-top: 1.05rem;
                    outline: none;
                    background: transparent;
                }

                .floating-input.focused label {
                    top: 15%;
                    transform: translate(0, 0);
                    font-size: 13px;
                    color: #5833FF;
                }

                .floating-input.focused {
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